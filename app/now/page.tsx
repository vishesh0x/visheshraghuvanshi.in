import type { Metadata } from "next";
import NowClient from "./NowClient";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Vishesh is focused on right now — current projects, books, learning goals, and things occupying the mind.",
};

export default function NowPage() {
  return <NowClient />;
}
