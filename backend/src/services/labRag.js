import { pool } from "../db/pool.js";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const COHERE_CHAT_URL = "https://api.cohere.com/v2/chat";

const DEFAULT_GROQ_MODELS = [
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "llama-3.1-8b-instant",
  "groq/compound-mini",
];

const DEFAULT_GEMINI_CHAT_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-2.5-flash-lite",
  "gemini-flash-latest",
  "gemini-pro-latest",
];

const DEFAULT_COHERE_MODELS = [
  "command-a-plus-05-2026",
  "command-a-03-2025",
  "command-a-reasoning-08-2025",
  "command-r7b-12-2024",
  "command-r-plus",
];

const RETRIEVAL_TOP_K = 6;
const RETRIEVAL_MIN_SCORE = 0.5;
const RETRIEVAL_SCORE_RATIO = 0.6;
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 150;

let chunkCache = [];

function envList(name, fallback) {
  const value = process.env[name];
  if (!value) return fallback;
  return value.split(",").map((entry) => entry.trim()).filter(Boolean);
}

function embeddingModel() {
  return process.env.GEMINI_EMBEDDING_MODEL || "text-embedding-004";
}

function groqModels() {
  return envList("GROQ_CHAT_MODELS", DEFAULT_GROQ_MODELS);
}

function geminiChatModels() {
  return envList("GEMINI_CHAT_MODELS", DEFAULT_GEMINI_CHAT_MODELS);
}

function cohereModels() {
  return envList("COHERE_CHAT_MODELS", DEFAULT_COHERE_MODELS);
}

// Embeddings always run on Gemini (retrieval needs one consistent vector space),
// so this key gates retrieval regardless of which chat provider answers below.
export function isLabRagConfigured() {
  const apiKey = process.env.GEMINI_API_KEY;
  return Boolean(apiKey && !apiKey.includes("your_gemini_api_key_here"));
}

function isKeyPresent(name) {
  const value = process.env[name];
  return Boolean(value && !value.includes("your_") && !value.includes("_here"));
}

export function isAnswerProviderConfigured() {
  return isKeyPresent("GROQ_API_KEY") || isKeyPresent("GEMINI_API_KEY") || isKeyPresent("COHERE_API_KEY");
}

function geminiApiKey() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.includes("your_gemini_api_key_here")) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return apiKey;
}

async function geminiFetch(path, body) {
  const response = await fetch(`${GEMINI_BASE_URL}${path}?key=${geminiApiKey()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Gemini API request failed (${response.status}): ${text || response.statusText}`);
  }

  return response.json();
}

export async function embedText(text) {
  const data = await geminiFetch(`/${embeddingModel()}:embedContent`, {
    content: { parts: [{ text }] },
  });
  return data.embedding.values;
}

export async function embedBatch(texts) {
  if (texts.length === 0) return [];

  const data = await geminiFetch(`/${embeddingModel()}:batchEmbedContents`, {
    requests: texts.map((text) => ({
      model: `models/${embeddingModel()}`,
      content: { parts: [{ text }] },
    })),
  });

  return data.embeddings.map((embedding) => embedding.values);
}

function splitIntoParagraphs(text) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function splitIntoSentences(text) {
  return text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) || [text];
}

export function chunkText(text, { chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP } = {}) {
  const paragraphs = splitIntoParagraphs(text);
  const chunks = [];
  let current = "";

  const pushCurrent = () => {
    if (current.trim()) {
      chunks.push(current.trim());
    }
    current = "";
  };

  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;

    if (candidate.length <= chunkSize) {
      current = candidate;
      continue;
    }

    pushCurrent();

    if (paragraph.length <= chunkSize) {
      current = paragraph;
      continue;
    }

    // Paragraph itself is too big — break at sentence boundaries, hard-cut as a last resort.
    const sentences = splitIntoSentences(paragraph);
    let sentenceBuffer = "";

    for (const sentence of sentences) {
      const sentenceCandidate = sentenceBuffer ? `${sentenceBuffer} ${sentence}` : sentence;

      if (sentenceCandidate.length <= chunkSize) {
        sentenceBuffer = sentenceCandidate;
        continue;
      }

      if (sentenceBuffer.trim()) {
        chunks.push(sentenceBuffer.trim());
      }

      if (sentence.length <= chunkSize) {
        sentenceBuffer = sentence;
      } else {
        for (let i = 0; i < sentence.length; i += chunkSize - overlap) {
          chunks.push(sentence.slice(i, i + chunkSize).trim());
        }
        sentenceBuffer = "";
      }
    }

    if (sentenceBuffer.trim()) {
      chunks.push(sentenceBuffer.trim());
    }
  }

  pushCurrent();

  return chunks.filter(Boolean);
}

export function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function loadChunkCacheFromDb() {
  const result = await pool.query(
    `SELECT c.id, c.document_id, c.content, c.embedding, d.title AS document_title
     FROM lab_document_chunks c
     JOIN lab_documents d ON d.id = c.document_id
     WHERE d.status = 'ready'`,
  );

  chunkCache = result.rows.map((row) => ({
    id: row.id,
    documentId: row.document_id,
    documentTitle: row.document_title,
    content: row.content,
    embedding: row.embedding,
  }));

  return chunkCache.length;
}

export function chunkCacheSize() {
  return chunkCache.length;
}

export async function ingestDocument({ title, sourceType, sourceKey, contentHash, content, uploadedBy = null }) {
  const chunks = chunkText(content);

  if (chunks.length === 0) {
    throw new Error("Document has no extractable text content.");
  }

  const embeddings = await embedBatch(chunks);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existing = await client.query(
      `SELECT id FROM lab_documents WHERE source_type = $1 AND source_key = $2`,
      [sourceType, sourceKey],
    );

    let documentId;

    if (existing.rows.length > 0) {
      documentId = existing.rows[0].id;
      await client.query(
        `UPDATE lab_documents
         SET title = $1, content_hash = $2, uploaded_by = $3, status = 'ready', created_at = NOW()
         WHERE id = $4`,
        [title, contentHash, uploadedBy, documentId],
      );
      await client.query(`DELETE FROM lab_document_chunks WHERE document_id = $1`, [documentId]);
    } else {
      const inserted = await client.query(
        `INSERT INTO lab_documents (title, source_type, source_key, content_hash, uploaded_by, status)
         VALUES ($1, $2, $3, $4, $5, 'ready')
         RETURNING id`,
        [title, sourceType, sourceKey, contentHash, uploadedBy],
      );
      documentId = inserted.rows[0].id;
    }

    for (let i = 0; i < chunks.length; i += 1) {
      await client.query(
        `INSERT INTO lab_document_chunks (document_id, chunk_index, content, embedding)
         VALUES ($1, $2, $3, $4)`,
        [documentId, i, chunks[i], embeddings[i]],
      );
    }

    await client.query("COMMIT");
    return documentId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteDocument(documentId) {
  await pool.query(`DELETE FROM lab_documents WHERE id = $1`, [documentId]);
}

export async function listDocuments() {
  const result = await pool.query(
    `SELECT d.id, d.title, d.source_type, d.uploaded_by, d.status, d.created_at,
            COUNT(c.id) AS chunk_count
     FROM lab_documents d
     LEFT JOIN lab_document_chunks c ON c.document_id = d.id
     GROUP BY d.id
     ORDER BY d.created_at DESC`,
  );

  return result.rows.map((row) => ({
    id: row.id,
    title: row.title,
    sourceType: row.source_type,
    uploadedBy: row.uploaded_by,
    status: row.status,
    chunkCount: Number(row.chunk_count),
    createdAt: row.created_at,
  }));
}

export async function retrieve(question, topK = RETRIEVAL_TOP_K) {
  if (chunkCache.length === 0) {
    return [];
  }

  const queryEmbedding = await embedText(question);

  const scored = chunkCache
    .map((chunk) => ({ chunk, score: cosineSimilarity(queryEmbedding, chunk.embedding) }))
    .sort((a, b) => b.score - a.score);

  const topScore = scored[0]?.score || 0;
  const threshold = Math.max(RETRIEVAL_MIN_SCORE, topScore * RETRIEVAL_SCORE_RATIO);

  return scored.filter((entry) => entry.score >= threshold).slice(0, topK);
}

const SYSTEM_PROMPT = `You are the AigleOn Labs "Lab" assistant, embedded on the AigleOn Labs website.
Answer ONLY using the provided context passages about AigleOn Labs' services, pricing, process, story, and products.
If the question is unrelated to AigleOn Labs, the Lab, or its offerings, politely explain that you can only help with questions about AigleOn Labs and redirect the visitor to ask something in scope.
Never invent facts that are not in the context. Keep answers concise and conversational (2-5 sentences unless more detail is clearly requested).`;

function buildUserPrompt(question, context) {
  return `Context:\n${context}\n\nQuestion: ${question}`;
}

async function callGroq(model, userPrompt) {
  const response = await fetch(GROQ_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq (${model}) failed: ${response.status} ${await response.text().catch(() => "")}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function callGemini(model, userPrompt) {
  const data = await geminiFetch(`/${model}:generateContent`, {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: { temperature: 0.3, maxOutputTokens: 512 },
  });

  return data.candidates?.[0]?.content?.parts?.map((part) => part.text).join("") || "";
}

async function callCohere(model, userPrompt) {
  const response = await fetch(COHERE_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    throw new Error(`Cohere (${model}) failed: ${response.status} ${await response.text().catch(() => "")}`);
  }

  const data = await response.json();
  return data.message?.content?.map((part) => part.text).join("") || "";
}

// Tries Groq's 5 models, then Gemini's 5, then Cohere's 5 (15 total) — moves to the
// next model/provider on any failure so a single down provider or rate limit doesn't
// take the assistant offline. Providers without a configured API key are skipped entirely.
export async function generateAnswer(question, matches) {
  const context = matches
    .map((match, index) => `[${index + 1}] (${match.chunk.documentTitle})\n${match.chunk.content}`)
    .join("\n\n");
  const userPrompt = buildUserPrompt(question, context);

  const attempts = [
    ...(isKeyPresent("GROQ_API_KEY") ? groqModels().map((model) => () => callGroq(model, userPrompt)) : []),
    ...(isKeyPresent("GEMINI_API_KEY") ? geminiChatModels().map((model) => () => callGemini(model, userPrompt)) : []),
    ...(isKeyPresent("COHERE_API_KEY") ? cohereModels().map((model) => () => callCohere(model, userPrompt)) : []),
  ];

  if (attempts.length === 0) {
    throw new Error("No answer provider (Groq, Gemini, Cohere) is configured.");
  }

  let lastError;

  for (const attempt of attempts) {
    try {
      const answer = await attempt();
      if (answer && answer.trim()) return answer;
    } catch (error) {
      lastError = error;
      console.warn("Lab chat answer provider failed, trying next:", error.message);
    }
  }

  throw lastError || new Error("All answer providers returned an empty response.");
}

const SCOPED_REFUSAL =
  "I can only help with questions about AigleOn Labs — our services, pricing, process, or the Lab's AI systems. Try asking me something about what we build or offer.";

export async function answerQuestion(question) {
  if (!isLabRagConfigured()) {
    return {
      answer: "The Labs assistant isn't fully configured yet — please check back soon.",
      matched: false,
      sources: [],
    };
  }

  const matches = await retrieve(question);

  if (matches.length === 0) {
    return { answer: SCOPED_REFUSAL, matched: false, sources: [] };
  }

  const sources = [...new Set(matches.map((match) => match.chunk.documentTitle))].map((title) => ({ title }));

  try {
    const answer = await generateAnswer(question, matches);
    return { answer, matched: true, sources };
  } catch (error) {
    console.error("Lab chat generation failed across all providers:", error.message);
    return {
      answer: "I found relevant information but couldn't generate a response just now — please try again in a moment.",
      matched: true,
      sources,
    };
  }
}
