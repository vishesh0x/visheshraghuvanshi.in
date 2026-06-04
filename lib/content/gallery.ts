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
    title: "A Human Eye",
    medium: "Pencil",
    year: "2025",
    imageUrl: "https://i.ibb.co/84BRcb3R/IMG-1076.jpg",
    gradient: "from-amber-700/30 to-stone-800/30",
  },
  {
    id: 2,
    title: "Lazy Me",
    medium: "Graphite",
    year: "2025",
    imageUrl: "https://i.ibb.co/CpXQyj2s/IMG-1074.jpg",
    gradient: "from-orange-900/30 to-neutral-800/30",
  },
];

export default gallery;
