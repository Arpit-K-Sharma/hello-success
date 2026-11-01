"use client";

import dynamic from "next/dynamic";
import { site } from "@/content/site";

// WebGL / canvas only exist in the browser.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
const FrameSequence = dynamic(() => import("./FrameSequence"), { ssr: false });

export function HeroVisual() {
  const frames = site.hero.frames;
  return frames ? <FrameSequence {...frames} /> : <HeroScene />;
}
