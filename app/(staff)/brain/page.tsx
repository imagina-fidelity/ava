import type { Metadata } from "next";
import { BrainView } from "@/components/BrainView";

export const metadata: Metadata = { title: "AVA's brain" };

export default function Brain() {
  return <BrainView />;
}
