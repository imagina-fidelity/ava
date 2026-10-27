import type { Metadata } from "next";
import { IntroView } from "@/components/IntroView";

export const metadata: Metadata = { title: "Meet AVA" };

export default function Intro() {
  return <IntroView />;
}
