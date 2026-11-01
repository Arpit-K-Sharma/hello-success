"use client";

import { useEffect, useRef } from "react";
import { useScrollProgress } from "./ScrollStory";

/**
 * Scroll-scrubbed image sequence ("Apple-style" video on scroll).
 * Frames live at /public{dir}/0001.{ext} … {count}.{ext}.
 * See docs/scroll-animation-guide.md for exporting frames.
 */
export default function FrameSequence({ dir, count, ext }: { dir: string; count: number; ext: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const progress = useScrollProgress();

  useEffect(() => {
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    const frames = Array.from({ length: count }, (_, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = `${dir}/${String(i + 1).padStart(4, "0")}.${ext}`;
      return img;
    });

    let raf = 0;
    let drawn = -1;
    let lastWidth = 0;
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      if (el.clientWidth !== lastWidth) {
        lastWidth = el.clientWidth;
        el.width = el.clientWidth * dpr;
        el.height = el.clientHeight * dpr;
        drawn = -1;
      }
      const i = Math.min(count - 1, Math.round(progress.current * (count - 1)));
      const img = frames[i];
      if (i !== drawn && img.complete && img.naturalWidth) {
        // object-fit: cover
        const s = Math.max(el.width / img.naturalWidth, el.height / img.naturalHeight);
        const w = img.naturalWidth * s;
        const h = img.naturalHeight * s;
        ctx.drawImage(img, (el.width - w) / 2, (el.height - h) / 2, w, h);
        drawn = i;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [dir, count, ext, progress]);

  return <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />;
}
