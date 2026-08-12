import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import Script from "next/script";
import BackToTop from "@/components/ui/BackToTop";
import LeadCapturePopup from "@/components/ui/LeadCapturePopup";
import ServerWarmup from "@/components/ui/ServerWarmup";
import DeviceNotice from "@/components/ui/DeviceNotice";
import LabChatLauncher from "@/components/lab/LabChatLauncher";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";

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
  metadataBase: new URL("https://theaigleonlabs.dev"),
  title: "Aigleon Labs | Digital Systems Agency & Venture Lab",
  description:
    "Aigleon Labs builds custom digital systems for niche craft pioneers and purpose driven brands. As a venture lab, we also build and launch proprietary tech.",
  keywords: [
    "Aigleon Labs",
    "digital systems agency",
    "venture lab",
    "niche craft pioneers",
    "custom web engineering",
    "product design studio",
    "purpose driven brands",
    "AI automation systems",
    "in-house tech products",
    "digital growth engine",
  ],
  authors: [{ name: "Aigleon Labs" }],
  creator: "Aigleon Labs",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theaigleonlabs.dev",
    siteName: "Aigleon Labs",
    title: "Aigleon Labs | Digital Systems & Venture Studio",
    description:
      "Aigleon Labs engineers custom digital systems for niche craft pioneers and purpose driven brands, while launching in-house tech products as a venture lab.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aigleon Labs Digital Systems Agency & Venture Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aigleon Labs | Digital Systems & Venture Studio",
    description:
      "Aigleon Labs engineers custom digital systems for niche craft pioneers and purpose driven brands, while launching in-house tech products as a venture lab.",
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
        <BackToTop />
        <LeadCapturePopup />
        <ServerWarmup />
        <DeviceNotice />
        <Script
          id="scroll-restoration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (window.location.hash) {
                  sessionStorage.setItem('scrollHash', window.location.hash);
                  history.replaceState(null, null, window.location.pathname + window.location.search);
                }
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
              } catch (e) {}
            `,
          }}
        />
        {children}
        <LabChatLauncher />
        <GrainOverlay />
      </body>
    </html>
  );
}
