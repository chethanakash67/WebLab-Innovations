import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://weblab.agency"),
  title: "WebLab | Premium Web Design & Development Agency",
  description:
    "WebLab builds high-performance websites, SaaS platforms, dashboards, and AI-powered digital products. We craft award-winning digital experiences.",
  keywords: [
    "web design",
    "web development",
    "SaaS development",
    "AI solutions",
    "digital agency",
    "UI/UX design",
    "branding",
    "automation",
    "Next.js",
    "React",
  ],
  authors: [{ name: "WebLab" }],
  creator: "WebLab",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weblab.agency",
    siteName: "WebLab",
    title: "WebLab | Premium Web Design & Development Agency",
    description:
      "WebLab builds high-performance websites, SaaS platforms, dashboards, and AI-powered digital products.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebLab - Premium Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebLab | Premium Web Design & Development Agency",
    description:
      "WebLab builds high-performance websites, SaaS platforms, dashboards, and AI-powered digital products.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
