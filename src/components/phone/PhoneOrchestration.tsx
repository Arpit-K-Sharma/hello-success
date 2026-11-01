"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { MathUtils } from "three";
import { site } from "@/content/site";
import { PHONE_QUERY, SCRUB_QUERY, ScrollStory, useMedia, useScrollProgress } from "../ScrollStory";
import { Eyebrow } from "../ui";

const { orchestration: o } = site;
const { smoothstep, damp } = MathUtils;
// Systems sit on a ring around the core, then get pulled in as you scroll.
// x / y are offsets from the core in % of the box width (rounded: no hydration mismatch).
const ring = o.tags.map((name, i) => {
  const a = (i / o.tags.length) * Math.PI * 2 - Math.PI / 2;
  // The chip straight below the core drops a little further so the bottom row isn't cramped.
  const drop = Math.sin(a) > 0.99 ? 7 : 0;
  return { name, x: Math.round(Math.cos(a) * 400) / 10, y: Math.round(Math.sin(a) * 480) / 10 + drop };
});
const OUT_X = [16, 50, 84];
const CoreScene = dynamic(() => import("../CoreScene"), { ssr: false });

/** Phone design: diagram on top, the beats (Connect, Orchestrate, Perform) swap underneath. */
export function PhoneOrchestration() {
  return (
    <ScrollStory mode="phone" screens={3.5} className="overflow-x-clip border-y border-line bg-void">
      <div className="tech-grid absolute inset-0" aria-hidden />
      <div className="shell relative flex h-full flex-col justify-center gap-5 pt-22 pb-24">
        <Diagram />
        <div data-beats className="mx-auto w-full max-w-xl space-y-8">
          {o.beats.map((b, i) => (
            <div key={b.kicker} data-beat={i} className="space-y-3">
              <Eyebrow>{b.kicker}</Eyebrow>
              {i === 0 ? (
                <h2 className="font-display text-3xl leading-[1.05] font-semibold tracking-tight sm:text-4xl">{b.heading}</h2>
              ) : (
                <h3 className="font-display text-2xl leading-[1.1] font-semibold tracking-tight sm:text-3xl">{b.heading}</h3>
              )}
              <p className="text-white/75">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollStory>
  );
}

function Diagram() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress();
  const show3d = !useMedia(SCRUB_QUERY);
  // Live, so resizing into the phone layout (e.g. devtools responsive mode) starts the animation.
  const live = useMedia(PHONE_QUERY);

  useEffect(() => {
    const box = root.current!.style;
    if (!live) {
      // Static (reduced motion): systems partly drawn in, results shown.
      box.setProperty("--c", "0.3");
      box.setProperty("--o", "1");
      return;
    }
    let p = progress.current;
    let raf = 0;
    let prev = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      p = damp(p, progress.current, 6, Math.min((now - prev) / 1000, 0.1));
      prev = now;
      box.setProperty("--c", String(smoothstep(p, 0.3, 0.68)));
      box.setProperty("--o", String(smoothstep(p, 0.7, 0.9)));
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [progress, live]);

  return (
    <div
      ref={root}
      className="relative mx-auto aspect-[4/5] w-full max-w-[min(20rem,34svh)] [--c:0] [--o:0]"
      role="img"
      aria-label="Your systems connect into one orchestration layer that drives Grow, Serve and Run"
    >
      {/* 3D core and stars behind, as on desktop. Core centre: 50% across, 40% down. */}
      {show3d && <CoreScene x={0.5} y={0.4} size={0.62} rings={false} className="[mask-image:radial-gradient(circle_at_50%_40%,#000_40%,transparent_72%)]" />}

      {/* Links in a 100 × 125 space (same ratio as the box). */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 125" aria-hidden>
        {ring.map((t) => (
          <line
            key={t.name}
            x1={50}
            y1={50}
            x2={50 + t.x}
            y2={50 + t.y}
            pathLength={1}
            className="stroke-glow/40"
            strokeWidth={0.4}
            style={{ strokeDasharray: 1, strokeDashoffset: "var(--c)" }}
          />
        ))}
        {OUT_X.map((x, i) => {
          const d = `M50 72 C50 86 ${x} 84 ${x} 98`;
          const color = `var(--color-${o.outputs[i].id})`;
          return (
            <g key={x} style={{ opacity: "var(--o)" }}>
              <path d={d} pathLength={1} fill="none" strokeWidth={0.7} style={{ stroke: color, strokeDasharray: 1, strokeDashoffset: "calc(1 - var(--o))" }} />
              <path d={d} pathLength={1} strokeWidth={1.2} className="orch-flow" style={{ stroke: "white", animationDelay: `${i * -0.5}s` }} />
            </g>
          );
        })}
      </svg>

      {ring.map((t) => (
        <span
          key={t.name}
          aria-hidden
          className="font-display absolute z-10 -translate-1/2 rounded-full border border-glow/40 bg-navy-2/95 px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap text-white/90 shadow-[0_0_14px_-4px] shadow-glow"
          style={{
            left: `calc(50% + ${t.x}% * (1 - var(--c)))`,
            top: `calc(40% + ${t.y * 0.8}% * (1 - var(--c)))`,
            scale: "calc(1 - var(--c) * 0.6)",
            opacity: "calc(1.4 - var(--c) * 1.4)",
          }}
        >
          {t.name}
        </span>
      ))}

      {/* The core, like the desktop one: glass centre and three turning rings. */}
      <div
        aria-hidden
        className="absolute top-[40%] left-1/2 z-20 grid aspect-square w-[44%] -translate-1/2 place-items-center rounded-full border border-glow/50 bg-[radial-gradient(circle,rgb(10_132_255/0.2),rgb(5_7_11/0.55)_70%)] text-center"
        style={{ boxShadow: "0 0 0 calc(8px + var(--c) * 10px) rgb(10 132 255 / 0.05), 0 0 calc(30px + var(--c) * 60px) rgb(10 132 255 / 0.4)", scale: "calc(0.85 + var(--c) * 0.15)" }}
      >
        <i className="core-ring -inset-[30%] border-dashed" />
        <i className="core-ring -inset-[16%] [animation-direction:reverse] [animation-duration:26s]" style={{ borderColor: "rgb(139 232 255 / 0.4)" }} />
        <i className="core-ring -inset-[4%] [animation-duration:18s]" style={{ borderColor: "rgb(185 241 255 / 0.3)" }} />
        <span className="relative [text-shadow:0_0_12px_#05070b,0_0_3px_#05070b]">
          <span className="label block !text-[0.6rem] text-glow">Connected</span>
          <span className="font-display mt-0.5 block text-sm leading-tight font-semibold">Orchestration<br />layer</span>
        </span>
      </div>

      {/* Grow / Serve / Run, wired to the core. */}
      {o.outputs.map((r, i) => (
        <div
          key={r.id}
          aria-hidden
          className="absolute top-[79%] z-10 w-[31%] rounded-xl border bg-navy/90 px-1.5 py-2 text-center"
          style={{
            left: `${OUT_X[i]}%`,
            borderColor: `var(--color-${r.id})`,
            boxShadow: `0 0 24px -8px var(--color-${r.id})`,
            opacity: "var(--o)",
            translate: `-50% calc((1 - var(--o)) * 14px)`,
          }}
        >
          <p className="font-display font-semibold" style={{ color: `var(--color-${r.id})` }}>{r.verb}</p>
          <p className="text-[0.7rem] leading-tight text-white/85">{r.label}</p>
        </div>
      ))}
    </div>
  );
}
