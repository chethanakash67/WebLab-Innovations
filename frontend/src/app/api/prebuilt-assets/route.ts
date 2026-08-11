import { NextResponse } from "next/server";

export interface PrebuiltAsset {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  price: string;
  mainPrice?: string;
  maintenanceNote?: string;
  originalPrice?: string;
  badge?: string;
  features: string[];
  revisionNote?: string;
  demoUrl?: string | null;
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
    mainPrice: "₹3,999/-",
    maintenanceNote: "* ₹2,500/- annually for maintenance",
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
    revisionNote: "* Multiple rounds of revisions add extra cost.",
    demoUrl: "https://narayanaschoolctr.vercel.app/"
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
