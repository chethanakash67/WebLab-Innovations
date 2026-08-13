"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mic, MicOff, Sparkles } from "lucide-react";
import "./LabAssistantChat.css";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  matched?: boolean;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Ask me anything about AigleOn Labs — our services, pricing, process, or the systems we build in the Lab.",
};

export default function LabAssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [micSupported] = useState(() => Boolean(getSpeechRecognitionCtor()));

  const [sessionId] = useState(() => Math.random().toString(36).slice(2) + Date.now().toString(36));

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const submitQuestion = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { id: `${Date.now()}-user`, role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/lab-chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, sessionId }),
      });

      const data = await response.json();
      const answer = data?.answer || "Something went wrong — please try again.";

      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-assistant`, role: "assistant", text: answer, matched: Boolean(data?.matched) },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          text: "I couldn't reach the Lab assistant just now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitQuestion(input);
  };

  const toggleMic = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const RecognitionCtor = getSpeechRecognitionCtor();
    if (!RecognitionCtor) return;

    const recognition = new RecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const results = Array.from(event.results as ArrayLike<SpeechRecognitionResultLike>);
      const transcript = results.map((result) => result[0].transcript).join("");
      setInput(transcript);

      const last = results[results.length - 1];
      if (last?.isFinal) {
        submitQuestion(transcript);
      }
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  return (
    <div className="lab-chat">
      <div className="lab-chat-header">
        <Sparkles size={16} />
        <span>Ask the Lab</span>
      </div>

      <div className="lab-chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`lab-chat-bubble lab-chat-bubble-${message.role}`}>
            {message.text}
          </div>
        ))}
        {loading && (
          <div className="lab-chat-bubble lab-chat-bubble-assistant lab-chat-bubble-loading">
            <span className="lab-chat-dot" />
            <span className="lab-chat-dot" />
            <span className="lab-chat-dot" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="lab-chat-composer" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={listening ? "Listening…" : "Ask about our services, pricing, or process…"}
          aria-label="Ask the Lab assistant a question"
        />
        {micSupported && (
          <button
            type="button"
            className={`lab-chat-mic ${listening ? "is-listening" : ""}`}
            onClick={toggleMic}
            aria-label={listening ? "Stop voice input" : "Ask with your voice"}
          >
            {listening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
        )}
        <button type="submit" className="lab-chat-send" aria-label="Send question" disabled={loading || !input.trim()}>
          <ArrowUp size={16} />
        </button>
      </form>
    </div>
  );
}
