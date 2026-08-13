import { NextResponse } from "next/server";

export interface PrebuiltAsset {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  price: string;
  priceInr?: string;
  priceUsd?: string;
  mainPrice?: string;
  maintenanceNote?: string;
  maintenanceNoteInr?: string;
  maintenanceNoteUsd?: string;
  originalPrice?: string;
  originalPriceInr?: string;
  originalPriceUsd?: string;
  badge?: string;
  features: string[];
  limitations?: string[];
  growthTierLink?: string;
  revisionNote?: string;
  demoUrl?: string | null;
  liveSoon?: boolean;
}

export const initialPrebuiltAssets: PrebuiltAsset[] = [
  {
    id: 1,
    slug: "blue-white-sleek-web-design",
    title: "Blue and white sleek web design and development",
    category: "Websites",
    tagline: "Ultra-sleek, mobile-first functional web design that psychologically invokes trust and calm.",
    description: "Originally developed as custom client work, this high-end web architecture can be fully custom-replicated for your business with your brand story, custom typography, color themes, and smooth micro-interactions.",
    price: "₹3,999/-",
    priceInr: "₹3,999/-",
    priceUsd: "$49/-",
    mainPrice: "₹3,999/-",
    maintenanceNote: "* ₹2,500/- annually for maintenance",
    maintenanceNoteInr: "* ₹2,500/- annually for maintenance",
    maintenanceNoteUsd: "* $35/- annually for maintenance",
    originalPrice: "₹8,000/-",
    originalPriceInr: "₹8,000/-",
    originalPriceUsd: "$100/-",
    badge: "Web Product",
    features: [
      "Mobile-First & Ultra-Fast Responsive Performance",
      "Sleek Functional Design & Smooth Micro-Interactions",
      "Psychological Color Palette Touching Calmness & Trust",
      "High-Converting Clear CTAs & Proof Establishment",
      "Custom Replicated Layout, Fonts & Design Assets for Your Brand",
      "WhatsApp Direct Lead & Inquiry Capture Ready"
    ],
    revisionNote: "* Multiple rounds of revisions add extra cost.",
    demoUrl: "https://narayanaschoolctr.vercel.app/"
  },
  {
    id: 2,
    slug: "whatsapp-bot-agent-bundle",
    title: "WhatsApp Bot & AI Agent System",
    category: "Bundles",
    tagline: "Standard template WhatsApp Business bot for your website & CRM with automated RAG support, review capture, and lead follow-ups.",
    description: `A WhatsApp Business bot for your website and CRM, built on our standard template so it ships fast and stays affordable. Three things running in the background:\n\nSupport: A FAQ and product-knowledge bot that answers customer questions instantly, day or night. If a question is too specific or the customer sounds upset, it hands off to you or your team instead of guessing.\n\nReviews: After someone buys, the bot sends one message asking for feedback. Simple, no long form, just a quick reply that becomes your testimonial or public review.\n\nFollow-ups: Contacts who've gone quiet get a re-engagement nudge with your current offers, so you're not manually chasing cold leads.\n\nIt connects to your website and CRM so replies and preferences sync automatically. No spreadsheet, no copy-pasting leads by hand.`,
    price: "₹9,999/-",
    priceInr: "₹9,999/-",
    priceUsd: "$199/-",
    mainPrice: "₹9,999/-",
    maintenanceNote: "* ₹2,999/- monthly charges",
    maintenanceNoteInr: "* ₹2,999/- monthly charges",
    maintenanceNoteUsd: "* $39/- monthly charges",
    originalPrice: "₹18,000/-",
    originalPriceInr: "₹18,000/-",
    originalPriceUsd: "$350/-",
    badge: "AI Bundle",
    features: [],
    limitations: [
      "Fixed Knowledge Scope: RAG knowledge base trained specifically on your FAQ and product catalog. Custom deep preference mining and tailored dynamic offer logic require our Growth Tier.",
      "Standard Platform Webhooks: Out-of-the-box webhook integration supported for Shopify, WooCommerce, and Wix.",
      "Standardized Review Flow: Pre-built review-request workflow utilizing a single template customized with your brand identity.",
      "Delivery & Support Window: Fast 5 to 7 day delivery timeframe; includes email support without strategy calls."
    ],
    growthTierLink: "/services#growth-tier",
    revisionNote: "* Custom CRM workflow connectors included.",
    demoUrl: null,
    liveSoon: true
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const query = (searchParams.get("q") || "").toLowerCase().trim();

  try {
    const backendUrl = process.env.BACKEND_INTERNAL_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000";
    const res = await fetch(`${backendUrl}/api/prebuilt-assets?category=${encodeURIComponent(category)}&q=${encodeURIComponent(query)}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.items) && data.items.length > 0) {
        return NextResponse.json({ success: true, items: data.items });
      }
    }
  } catch (_err) {
    // Fallback to internal static items
  }

  let filtered = [...initialPrebuiltAssets];

  if (category !== "all") {
    filtered = filtered.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({ success: true, items: filtered });
}
