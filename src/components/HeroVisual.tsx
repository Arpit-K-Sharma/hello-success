"use client";

import dynamic from "next/dynamic";
import { site } from "@/content/site";
import { SCRUB_QUERY, useMedia } from "./ScrollStory";

// WebGL / canvas only exist in the browser.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
const FrameSequence = dynamic(() => import("./FrameSequence"), { ssr: false });

/** Mounts only for the design on screen (desk or phone), so one canvas boots, not two. */
export function HeroVisual({ desk }: { desk: boolean }) {
  const isDesk = useMedia(SCRUB_QUERY);
  if (isDesk !== desk) return null;
  const frames = site.hero.frames;
  return frames ? <FrameSequence {...frames} /> : <HeroScene spin={!desk} />;
}
