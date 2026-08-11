import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const catalogItems = [
  {
    slug: "aigleon-labs-funnel-leak-report",
    title: "Aigleon Labs Funnel Leak & Bottleneck Diagnostic Report",
    summary:
      "A comprehensive diagnostic report identifying critical conversion drop-off points, funnel leakages, and growth bottlenecks in digital acquisition pipelines.",
    type: "report",
    filePath: "/aigleon_labs_funnel_leak_report.pdf",
    tags: [
      "funnel leak",
      "growth bottleneck",
      "audit",
      "report",
      "conversion",
      "acquisition",
      "aigleon labs",
      "digital readiness",
      "systems",
    ],
  },
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

const prebuiltAssets = [
  {
    slug: "blue-white-sleek-web-design",
    title: "Blue and white sleek web design and development",
    category: "Websites",
    tagline: "Ultra-sleek, mobile-first functional web design that psychologically invokes trust and calm.",
    description: "Originally developed as custom client work, this high-end web architecture can be fully custom-replicated for your business with your brand story, custom typography, color themes, and smooth micro-interactions.",
    price: "₹3,999/-",
    originalPrice: "₹8,000/-",
    badge: "Web Product",
    features: [
      "Mobile-First & Ultra-Fast Responsive Performance",
      "Sleek Functional Design & Smooth Micro-Interactions",
      "Psychological Color Palette Touching Calmness & Trust",
      "High-Converting Clear CTAs & Proof Establishment",
      "Custom Replicated Layout, Fonts & Design Assets for Your Brand",
      "WhatsApp Direct Lead & Inquiry Capture Ready"
    ],
    demoUrl: "https://narayanaschoolctr.vercel.app/",
  },
];

export async function seedPrebuiltAssets() {
  // Clear any past placeholder assets so only real products remain
  await pool.query(`DELETE FROM prebuilt_assets WHERE slug != 'blue-white-sleek-web-design'`);

  for (const item of prebuiltAssets) {
    await pool.query(
      `INSERT INTO prebuilt_assets
        (title, slug, category, tagline, description, price, original_price, badge, features, demo_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (slug) DO UPDATE SET
         title = EXCLUDED.title,
         category = EXCLUDED.category,
         tagline = EXCLUDED.tagline,
         description = EXCLUDED.description,
         price = EXCLUDED.price,
         original_price = EXCLUDED.original_price,
         badge = EXCLUDED.badge,
         features = EXCLUDED.features,
         demo_url = EXCLUDED.demo_url`,
      [
        item.title,
        item.slug,
        item.category,
        item.tagline,
        item.description,
        item.price,
        item.originalPrice,
        item.badge,
        item.features,
        item.demoUrl,
      ],
    );
  }

  console.log("Prebuilt assets seed applied (Tabun Chai website asset).");
}

const currentFile = fileURLToPath(import.meta.url);

if (process.argv[1] === currentFile) {
  Promise.all([seedLibraryCatalog(), seedPastClients(), seedPrebuiltAssets()])
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

