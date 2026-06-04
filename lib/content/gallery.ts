export interface GalleryItem {
  id: number;
  title: string;
  medium: string;
  year: string;
  imageUrl?: string;
  gradient: string;
}

const gallery: GalleryItem[] = [
  {
    id: 1,
    title: "Ink Study #12",
    medium: "Ink on paper",
    year: "2024",
    imageUrl: "",
    gradient: "from-amber-700/30 to-stone-800/30",
  },
  {
    id: 2,
    title: "Portrait – Warm Light",
    medium: "Graphite",
    year: "2024",
    imageUrl: "",
    gradient: "from-orange-900/30 to-neutral-800/30",
  },
  {
    id: 3,
    title: "City Sketch – Bangalore",
    medium: "Pen & wash",
    year: "2023",
    imageUrl: "",
    gradient: "from-yellow-800/30 to-stone-900/30",
  },
  {
    id: 4,
    title: "Still Life – The Mug",
    medium: "Pencil",
    year: "2023",
    imageUrl: "",
    gradient: "from-amber-800/30 to-zinc-800/30",
  },
  {
    id: 5,
    title: "Abstract #3",
    medium: "Ink + digital",
    year: "2022",
    imageUrl: "",
    gradient: "from-rose-900/30 to-stone-800/30",
  },
  {
    id: 6,
    title: "Figure Study",
    medium: "Charcoal",
    year: "2022",
    imageUrl: "",
    gradient: "from-stone-700/30 to-neutral-900/30",
  },
];

export default gallery;
