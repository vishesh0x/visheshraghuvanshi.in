import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of backend systems built by Vishesh Kumar — distributed payment gateways, graph-backed social networks, real-time collaborative editors, and booking engines.",
  openGraph: {
    title: "Projects — Vishesh Kumar",
    description:
      "Backend systems: distributed payment gateways, graph databases, real-time collaboration, and booking engines. Built with Java, Spring Boot, Kafka, and more.",
    url: "https://visheshraghuvanshi.in/projects",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Vishesh Kumar",
    description: "Distributed systems, backend engineering, open source.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://visheshraghuvanshi.in/projects" },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
