export interface TimelineEntry {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  type: "work" | "education" | "freelance";
  description: string;
  highlights: string[];
  skills: string[];
}

export interface Skill {
  name: string;
  level: number; // 1–5
  category: "language" | "framework" | "tool" | "design";
}

// Timeline

export const timeline: TimelineEntry[] = [
  {
    id: "tcs-2026",
    role: "Systems Engineer",
    company: "Tata Consultancy Services",
    companyUrl: "https://www.tcs.com",
    period: "2026 – Present",
    location: "India",
    type: "work",
    description:
      "Joined TCS as a Systems Engineer. Early days — ramping up on the codebase, internal tooling, and team workflows. More to add here as the work unfolds.",
    highlights: [
    ],
    skills: ["Java", "Spring Boot", "SQL"],
  },
  {
    id: "btech",

    role: "B.Tech., Computer Science & Engineering",
    company: "Sushila Devi Bansal College of Engineering",
    period: "2020 – 2024",
    location: "Indore, India",
    type: "education",
    description:
      "Studied computer science with a focus on software engineering, data structures, and system design. Graduated with a strong academic record while building backend projects end-to-end.",
    highlights: [
      "CGPA: 8.15",
      "Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP",
      "Built distributed backend systems in Java and Spring Boot independently",
    ],
    skills: ["Java", "SQL", "Data Structures", "Algorithms", "OOP"],
  },
  {
    id: "senior-secondary",
    role: "Senior Secondary (Class XII)",
    company: "Kendriya Vidyalaya, Mhow",
    period: "2020",
    location: "Mhow, India",
    type: "education",
    description: "PCM stream with Computer Science.",
    highlights: ["Percentage: 87.4%"],
    skills: ["Mathematics", "Physics"],
  },
  {
    id: "secondary",
    role: "Secondary (Class X)",
    company: "Kendriya Vidyalaya, Mhow",
    period: "2018",
    location: "Mhow, India",
    type: "education",
    description: "Foundation in science and mathematics.",
    highlights: ["Percentage: 81.8%"],
    skills: ["Mathematics", "Science"],
  },
];

// Skills

export const skills: Skill[] = [
  // Languages
  { name: "Java",              level: 5, category: "language" },
  { name: "SQL",               level: 4, category: "language" },
  { name: "DSA",               level: 4, category: "language" },
  { name: "System Design",     level: 3, category: "language" },

  // Frameworks & Backend
  { name: "Spring Boot",       level: 5, category: "framework" },
  { name: "Spring Security",   level: 4, category: "framework" },
  { name: "Hibernate / JPA",   level: 4, category: "framework" },
  { name: "REST APIs",         level: 5, category: "framework" },
  { name: "JWT Auth",          level: 4, category: "framework" },
  { name: "OAuth 2.0",         level: 3, category: "framework" },

  // Databases
  { name: "PostgreSQL",        level: 4, category: "tool" },
  { name: "MySQL",             level: 4, category: "tool" },
  { name: "SQLite",            level: 3, category: "tool" },
  { name: "Neo4j",             level: 3, category: "tool" },

  // Infra & Messaging (learning)
  { name: "Apache Kafka",      level: 3, category: "tool" },
  { name: "Redis",             level: 3, category: "tool" },
  { name: "Docker",            level: 3, category: "tool" },
  { name: "Kubernetes",        level: 2, category: "tool" },

  // Dev tools
  { name: "Git",               level: 5, category: "tool" },
  { name: "Linux / CLI",       level: 4, category: "tool" },
  { name: "Postman",           level: 4, category: "tool" },
];
