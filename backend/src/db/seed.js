import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const catalogItems = [
  {
    slug: "tabun-chai-high-conversion-web-redesign",
    title: "Case Study 1: Tabun Chai",
    summary:
      "A fully functional sleek website designed and developed for them, within 4 days of time, with the theme, brand story architecture and ambience of a cafe keeping in mind, and recorded the projected conversion rate on using the updated site.",
    type: "case_study",
    filePath: "/Tabun-Chai-Case-Study.pdf",
    tags: [
      "tabun chai",
      "case study",
      "web design",
      "ux",
      "conversion",
      "local business",
      "mobile first",
      "glassmorphism",
    ],
  },
  {
    slug: "website-ux-case-study-audit",
    title: "An audit on website UX and AEO",
    summary:
      "This audit is done on a real coffee brand, we checked website UX alignment, pagespeed, search engine optimisation and how well it's getting listed in AI LLM.",
    type: "audit",
    filePath: "/case%20study%20audit.pdf",
    tags: [
      "audit",
      "website",
      "ux",
      "ui design",
      "conversion",
      "lead capture",
      "analysis",
    ],
  },
  {
    slug: "why-systemless-businesses-stall-before-they-scale",
    title: "Why systemless businesses stall before they scale?",
    summary:
      "An in-depth benchmark report analyzing why promising businesses stall after a successful launch. It breaks down why manual effort yields low returns without structured systems, identifies the critical operational gaps holding growth back, and outlines the immediate strategic steps required to build scalable, automated foundations.",
    type: "report",
    filePath: "/aigleon_labs_digital_readiness_report.pdf",
    tags: [
      "benchmark reports",
      "benchmark",
      "report",
      "digital readiness",
      "business systems",
      "scaling",
      "growth",
      "automation",
      "conversion",
      "lead acquisition",
      "retention",
      "roi",
    ],
  },
];

export async function seedLibraryCatalog() {
  for (const item of catalogItems) {
    await pool.query(
      `INSERT INTO library_catalog
        (title, slug, summary, type, file_path, tags)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (slug) DO NOTHING`,
      [item.title, item.slug, item.summary, item.type, item.filePath, item.tags],
    );
  }

  console.log("Library catalog seed applied.");
}

const pastClients = [
  {
    clientName: "Tabun Chai",
    slug: "tabun-chai",
    industry: "Cafe & Tea Lounge",
    websiteUrl: "https://tabun-chai.vercel.app/",
    logoUrl: null,
    projectSummary: "Designed and engineered a custom, ultra-sleek landing page & visual menu in 4 days.",
    resultsAchieved: "+40% increase in lead conversions within 10 days of launch.",
    testimonialQuote: "His dedication towards work is what inspires me, like the order was given and within 2 days, he delivered a cleanly designed Customer page for my cafe, and also gave constant support...",
    testimonialAuthor: "S. Ramesh & Team",
    testimonialRole: "Owner, Tabun Chai Cafe",
    clientStatus: "active",
  },
];

export async function seedPastClients() {
  for (const client of pastClients) {
    await pool.query(
      `INSERT INTO past_clients
        (client_name, slug, industry, website_url, logo_url, project_summary, results_achieved, testimonial_quote, testimonial_author, testimonial_role, client_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (slug) DO NOTHING`,
      [
        client.clientName,
        client.slug,
        client.industry,
        client.websiteUrl,
        client.logoUrl,
        client.projectSummary,
        client.resultsAchieved,
        client.testimonialQuote,
        client.testimonialAuthor,
        client.testimonialRole,
        client.clientStatus,
      ],
    );
  }

  console.log("Past clients seed applied.");
}

const currentFile = fileURLToPath(import.meta.url);

if (process.argv[1] === currentFile) {
  Promise.all([seedLibraryCatalog(), seedPastClients()])
    .then(async () => {
      await pool.end();
      console.log("Database seeds applied successfully.");
    })
    .catch(async (error) => {
      console.error("Database seed failed:", error);
      await pool.end();
      process.exit(1);
    });
}
