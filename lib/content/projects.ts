export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    id: "nexus-ledger",
    title: "Nexus Ledger",
    description:
      "A high-throughput distributed payment gateway. Engineered for strict transactional consistency, utilizing distributed locks and idempotency keys to process concurrent API calls without race conditions or double-charging.",
    tags: ["Java", "Spring Boot", "Redis", "Kafka", "PostgreSQL"],
    imageUrl: "/gallery/project-nexus-ledger.jpg",
    liveUrl: "https://nexusledger.in",
    githubUrl: "https://github.com/vishesh0x/nexus-ledger",
    featured: true,
    year: 2026,
  },
  {
    id: "graphnet-backend",
    title: "GraphNet Backend",
    description:
      "A distributed professional network architecture. Trades relational bottlenecks for a graph database model, enabling lightning-fast n-degree connection traversals and low-latency feed generation via fan-out caching.",
    tags: ["Java", "Spring Boot", "Neo4j", "Redis"],
    imageUrl: "/gallery/project-graphnet.jpg",
    liveUrl: "https://graphnet.in",
    githubUrl: "https://github.com/vishesh0x/graphnet-backend",
    featured: true,
    year: 2026,
  },
  {
    id: "omnidev-engine",
    title: "OmniDev Engine",
    description:
      "The infrastructure layer for a real-time collaborative coding platform. Handles live code synchronization via WebSockets and manages isolated, sandboxed execution environments for running untrusted code safely.",
    tags: ["Java", "Spring Boot", "Docker", "WebSockets"],
    imageUrl: "/gallery/project-omnidev.jpg",
    liveUrl: "https://omnidev.in",
    githubUrl: "https://github.com/vishesh0x/omnidev-engine",
    year: 2026,
  },
  {
    id: "stayhub-core",
    title: "StayHub Core",
    description:
      "Complete inventory and booking engine for a lodging marketplace. Implements complex state machines for booking lifecycles and pessimistic database locking to prevent simultaneous reservation conflicts.",
    tags: ["Java", "Spring Boot", "Hibernate", "MySQL"],
    imageUrl: "/gallery/project-stayhub.jpg",
    liveUrl: "https://stayhubcore.in",
    githubUrl: "https://github.com/vishesh0x/stayhub-core",
    year: 2026,
  },
];