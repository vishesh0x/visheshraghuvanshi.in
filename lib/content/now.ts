export interface NowItem {
  text: string;
  note?: string;
}

export interface NowSection {
  id: string;
  iconName: string;
  heading: string;
  colorClass: string;
  items: NowItem[];
}

export const nowLastUpdated = "June 3, 2026";

export const nowSections: NowSection[] = [
  {
    id: "building",
    iconName: "code",
    heading: "Building",
    colorClass: "text-amber-400 border-amber-400/30 bg-amber-400/8",
    items: [
      {
        text: "Nexus Ledger",
        note: "high-throughput distributed payment gateway — distributed locks, idempotency keys, Kafka",
      },
      {
        text: "This personal site",
        note: "the desk, the 3D table, all the little details",
      },
    ],
  },
  {
    id: "learning",
    iconName: "compass",
    heading: "Learning",
    colorClass: "text-emerald-300 border-emerald-400/30 bg-emerald-400/8",
    items: [
      {
        text: "Coding Shuttle Cohort 5.0",
        note: "Spring Boot, Kafka, Kubernetes, Redis — going deep on the whole backend stack",
      },
      {
        text: "DSA daily",
        note: "one problem every day, no excuses — graphs and DP are humbling",
      },
    ],
  },
  {
    id: "reading",
    iconName: "book",
    heading: "Reading",
    colorClass: "text-blue-300 border-blue-400/30 bg-blue-400/8",
    items: [
      {
        text: "Meditations — Marcus Aurelius",
        note: "slow read, one journal entry per sitting",
      },
      {
        text: "1984 — George Orwell",
        note: "feels less like fiction every day",
      },
      {
        text: "Animal Farm — George Orwell",
        note: "short but cuts deep",
      },
    ],
  },
  {
    id: "creating",
    iconName: "pencil",
    heading: "Creating",
    colorClass: "text-rose-300 border-rose-400/30 bg-rose-400/8",
    items: [
      {
        text: "Drawing every day",
        note: "pen on paper — no screens, no undo button",
      },
    ],
  },
];
