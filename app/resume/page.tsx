import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Vishesh Kumar's résumé — backend engineer specialising in Java, Spring Boot, and distributed systems. Education, projects, and technical skills.",
  openGraph: {
    title: "Résumé — Vishesh Kumar",
    description:
      "Backend engineer specialising in Java, Spring Boot, and distributed systems. Education, projects, and full technical skills list.",
    url: "https://visheshraghuvanshi.in/resume",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Résumé — Vishesh Kumar",
    description: "Backend engineer · Java · Spring Boot · Distributed Systems",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://visheshraghuvanshi.in/resume" },
};

export default function ResumePage() {
  return <ResumeClient />;
}
