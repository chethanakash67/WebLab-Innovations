import { proxyBackendRequest } from "@/lib/backendProxy";
import { type LibraryCatalogItem } from "@/lib/library";

export const dynamic = "force-dynamic";

const STATIC_CATALOG_ITEMS: LibraryCatalogItem[] = [
  {
    id: 1,
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
    createdAt: "2026-08-05T00:00:00.000Z",
  },
  {
    id: 2,
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
    createdAt: "2026-08-01T00:00:00.000Z",
  },
  {
    id: 3,
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
    createdAt: "2026-07-28T00:00:00.000Z",
  },
];

function filterStaticItems(type: string, q: string): LibraryCatalogItem[] {
  const searchTerm = q.toLowerCase().trim();
  const filterType = type.toLowerCase().trim();

  return STATIC_CATALOG_ITEMS.filter((item) => {
    const typeMatch =
      filterType === "all" ||
      item.type === filterType ||
      (filterType === "benchmark_comparison" && (item.type === "report" || item.tags.some((t) => t.includes("benchmark"))));

    if (!typeMatch) return false;
    if (!searchTerm) return true;

    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const summaryMatch = item.summary.toLowerCase().includes(searchTerm);
    const typeMatchSearch = item.type.toLowerCase().includes(searchTerm);
    const tagsMatch = item.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

    return titleMatch || summaryMatch || typeMatchSearch || tagsMatch;
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";
  const q = searchParams.get("q") || "";

  try {
    const query = new URLSearchParams({ type, q });
    const path = `/api/library?${query.toString()}`;
    const response = await proxyBackendRequest(path, { method: "GET" });

    if (response.ok) {
      const data = await response.json();
      if (data && data.success && Array.isArray(data.items) && data.items.length > 0) {
        return Response.json(data);
      }
    }
  } catch (error) {
    console.warn("Backend proxy unavailable, falling back to static catalog.");
  }

  const items = filterStaticItems(type, q);
  return Response.json({ success: true, items });
}
