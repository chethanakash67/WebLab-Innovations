export type CatalogType =
  | "audit"
  | "report"
  | "benchmark_comparison"
  | "guide"
  | "case_study";

export type CatalogFilter = "all" | CatalogType;

export interface LibraryCatalogItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  type: CatalogType;
  filePath: string;
  tags: string[];
  createdAt: string;
}

export interface LibraryCatalogResponse {
  success: boolean;
  items: LibraryCatalogItem[];
}

export const CATALOG_FILTERS: { value: CatalogFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "audit", label: "Audits" },
  { value: "report", label: "Reports" },
  { value: "benchmark_comparison", label: "Benchmark Comparisons" },
  { value: "guide", label: "Guides" },
  { value: "case_study", label: "Case Studies" },
];

export const CATALOG_TYPE_LABELS: Record<CatalogType, string> = {
  audit: "Audit",
  report: "Report",
  benchmark_comparison: "Benchmark Comparison",
  guide: "Guide",
  case_study: "Case Study",
};
