"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Phone "stories": full-width cards that auto-swipe every few seconds while on screen.
 * People can swipe (touch) or drag (mouse) themselves; any touch pauses the auto-swipe
 * until it's released. Dots show position. Reduced motion: no auto-swipe.
 */
export function Stories({ label, ms = 2000, children }: { label: string; ms?: number; children: ReactNode }) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false);

  const go = (k: number) => {
    const t = track.current!;
    t.scrollTo({ left: ((k + n) % n) * t.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting && !matchMedia("(prefers-reduced-motion: reduce)").matches),
      { threshold: 0.4 },
    );
    io.observe(track.current!);
    // Resume once the finger/mouse lifts anywhere. (Not on pointercancel: a touch swipe fires
    // that as it starts, and resuming then would yank the card away mid-swipe.)
    const release = () => setHeld(false);
    addEventListener("pointerup", release);
    addEventListener("touchend", release);
    addEventListener("touchcancel", release);
    return () => {
      io.disconnect();
      removeEventListener("pointerup", release);
      removeEventListener("touchend", release);
      removeEventListener("touchcancel", release);
    };
  }, []);

  useEffect(() => {
    if (!visible || held) return;
    const t = setTimeout(() => {
      const el = track.current!;
      el.scrollTo({ left: ((index + 1) % n) * el.clientWidth, behavior: "smooth" });
    }, ms);
    return () => clearTimeout(t);
  }, [visible, held, index, n, ms]);

  // Mouse drag (touch swipes are native scrolling). Snap is off while dragging, then we settle on a card.
  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    setHeld(true);
    if (e.pointerType !== "mouse" || (e.target as HTMLElement).closest("a, button")) return;
    const t = e.currentTarget;
    drag.current = { x: e.clientX, left: t.scrollLeft, moved: false };
    t.style.scrollSnapType = "none";
    const move = (ev: PointerEvent) => {
      const d = drag.current!;
      if (Math.abs(ev.clientX - d.x) > 5) d.moved = true;
      t.scrollLeft = d.left - (ev.clientX - d.x);
    };
    const up = (ev: PointerEvent) => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", up);
      const d = drag.current!;
      const dx = ev.clientX - d.x;
      const from = Math.round(d.left / t.clientWidth);
      t.style.scrollSnapType = "";
      if (d.moved) go(Math.abs(dx) > t.clientWidth * 0.15 ? from - Math.sign(dx) : from);
      // Keep `moved` set until the click that follows this release has been ignored.
      setTimeout(() => (drag.current = null));
    };
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="mx-auto max-w-xl">
      <div
        ref={track}
        className="flex cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain select-none [scrollbar-width:none] active:cursor-grabbing"
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        onPointerDown={startDrag}
        onTouchStart={() => setHeld(true)}
        onClick={(e) => {
          if (drag.current?.moved || (e.target as HTMLElement).closest("a, button")) return;
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          if (x < 1 / 3) go(index - 1);
          else if (x > 2 / 3) go(index + 1);
        }}
      >
        {slides.map((s, k) => (
          <div key={k} className="flex w-full shrink-0 snap-start" aria-hidden={k !== index} inert={k !== index}>
            {s}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, k) => (
          <button key={k} type="button" onClick={() => go(k)} aria-label={`Show ${k + 1} of ${n}`} aria-current={k === index} className="grid h-6 place-items-center">
            <span className={`block h-1.5 rounded-full transition-all ${k === index ? "bg-glow w-6" : "w-1.5 bg-white/30"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
