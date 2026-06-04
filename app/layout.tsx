import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import DrawingCanvas from "@/components/DrawingCanvas";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppStateProvider } from "@/lib/app-state";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

// ── Shared metadata values ─────────────────────────────────────────────────────

const SITE_URL   = "https://visheshraghuvanshi.in";
const FULL_NAME  = "Vishesh Kumar";
const TITLE      = "Vishesh Kumar — Backend Engineer";
const DESCRIPTION =
  "Backend engineer building high-throughput distributed systems with Java and Spring Boot. " +
  "Personal site, sketchbook, and corner of the internet.";
const KEYWORDS = [
  "Vishesh Kumar",
  "Vishesh Raghuvanshi",
  "Backend Engineer",
  "Java Developer",
  "Spring Boot",
  "Distributed Systems",
  "Software Engineer India",
  "Full Stack Developer",
  "Portfolio",
];

// ── Root metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: `%s — Vishesh Kumar`,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,

  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,

  // ── Favicons & icons ────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico",       sizes: "any" },
    ],
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",

  // ── Open Graph (Facebook, LinkedIn, WhatsApp, Slack…) ──────────────────────
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         SITE_URL,
    siteName:    "Vishesh Kumar",
    title:       TITLE,
    description: DESCRIPTION,
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "Vishesh Kumar — Backend Engineer",
        type:   "image/png",
      },
    ],
  },

  // ── Twitter / X card ───────────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    title:       TITLE,
    description: DESCRIPTION,
    images:      ["/og-image.png"],
  },

  // ── Crawling ───────────────────────────────────────────────────────────────
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview": "large",
      "max-snippet":     -1,
    },
  },

  // ── Canonical / alternate ──────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── App metadata ───────────────────────────────────────────────────────────
  applicationName: "Vishesh Kumar",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <AppStateProvider>
            {/* Easter egg drawing canvas — sits below everything */}
            <DrawingCanvas />

            {/* Fixed navigation */}
            <NavBar />

            {/*
              pt-20 = 80px — clears the fixed navbar:
              16px (mt-4) + ~52px nav height + 12px gap = ~80px
            */}
            <main className="relative z-10 pt-20">{children}</main>
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
