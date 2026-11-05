"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { MathUtils } from "three";
import { site } from "@/content/site";
import { SCRUB_QUERY, useMedia, useScrollProgress } from "./ScrollStory";

const CoreScene = dynamic(() => import("./CoreScene"), { ssr: false });

const { orchestration: o } = site;
const { smoothstep, damp, lerp } = MathUtils;

// Diagram space: 600 × 500 units; the box is aspect 6/5 so SVG and HTML % line up.
const W = 600;
const H = 500;
const CORE = { x: 250, y: 250 };
const OUT_X = 525;
const OUT_Y = [95, 250, 405];
// Systems start scattered like asteroids (the reference site's "business core" scene),
// drift while scattered, then get pulled into the core and absorbed as you scroll.
const SCATTER = [[60, 40], [230, 30], [430, 60], [40, 200], [520, 170], [110, 330], [470, 330], [60, 460], [280, 470], [520, 450]];
const tags = o.tags.map((name, i) => ({
  name,
  sx: SCATTER[i][0],
  sy: SCATTER[i][1],
  // Static layout (mobile / reduced motion): an arc on the core's left, clear of the outputs.
  // Rounded so server and browser render identical numbers (no hydration mismatch).
  mx: Math.round(CORE.x + Math.cos((120 + (i / (o.tags.length - 1)) * 120) * (Math.PI / 180)) * 185),
  my: Math.round(CORE.y + Math.sin((120 + (i / (o.tags.length - 1)) * 120) * (Math.PI / 180)) * 175),
  spin: ((i * 37) % 21) - 10, // degrees of tumble while drifting
  phase: i * 1.7,
}));
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * Scroll story (beats: intro, Discover, Redesign, Build, Run; beat k sits at p = k / 4.25):
 *   s  Discover: a scan sweeps the scattered, drifting systems
 *   f  Discover: the bottlenecks light up red
 *   t  Redesign: the systems stop drifting and line up on a tidy arc; planned links appear
 *   c  Build: the systems are pulled into the core (one layer) and absorbed
 *   l  Build: signals flow along the links; the core powers up
 *   o  Run: Grow / Serve / Save ("What you get") draw out of the core
 * Mobile / reduced motion / no JS: a static, finished diagram.
 */
export function OrchestrationDiagram() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress();
  const isDesk = useMedia(SCRUB_QUERY);

  useEffect(() => {
    if (!isDesk) return; // static layout from the markup
    const box = root.current!;
    const tagEls = [...box.querySelectorAll<HTMLElement>("[data-tag]")];
    const links = tags.map((_, i) => [...box.querySelectorAll<SVGLineElement>(`[data-link="${i}"]`)]);
    let p = progress.current;
    let raf = 0;
    let running = false;
    let prev = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      p = damp(p, progress.current, 6, dt);
      const tidy = smoothstep(p, 0.3, 0.46);
      const c = smoothstep(p, 0.54, 0.7);
      const t = now / 1000;
      tags.forEach((g, i) => {
        // Asteroid drift until Redesign lines them up on the arc; Build pulls them into the core.
        const drift = 1 - tidy;
        const x = lerp(lerp(g.sx, g.mx, tidy), CORE.x, c) + Math.sin(t * 0.5 + g.phase) * 14 * drift;
        const y = lerp(lerp(g.sy, g.my, tidy), CORE.y, c) + Math.cos(t * 0.4 + g.phase) * 10 * drift;
        const el = tagEls[i].style;
        el.left = pct(x, W);
        el.top = pct(y, H);
        el.rotate = `${g.spin * drift + Math.sin(t * 0.3 + g.phase) * 4 * drift}deg`;
        el.scale = String(1 - c * 0.55);
        el.opacity = String(1 - smoothstep(c, 0.75, 1));
        links[i].forEach((l) => {
          l.setAttribute("x1", String(x));
          l.setAttribute("y1", String(y));
        });
      });
      const set = (k: string, v: number) => box.style.setProperty(k, String(v));
      set("--s", smoothstep(p, 0.1, 0.2) * (1 - smoothstep(p, 0.3, 0.4)));
      set("--f", smoothstep(p, 0.15, 0.24) * (1 - smoothstep(p, 0.36, 0.46)));
      set("--t", tidy);
      set("--c", c);
      set("--l", smoothstep(p, 0.56, 0.68));
      set("--o", smoothstep(p, 0.78, 0.92));
    };
    // Only animate while the diagram is on screen.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(box);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [progress, isDesk]);

  return (
    <div
      ref={root}
      className="orch relative aspect-[6/5] w-full"
      role="img"
      aria-label="Our process: we discover the bottlenecks across your systems, redesign the process, build one connected layer, and run it to deliver Grow, Serve and Save"
    >
      {/* 3D core (desktop), the same space scene as the services orbit. */}
      {isDesk && <CoreScene x={CORE.x / W} y={CORE.y / H} size={0.95} rings={false} className="[mask-image:radial-gradient(circle,#000_45%,transparent_72%)]" />}

      <svg className="absolute inset-0 size-full" viewBox={`0 0 ${W} ${H}`} aria-hidden>
        {/* Every system is linked to the core; signals flow along the links as they are pulled in. */}
        {tags.map((t, i) => (
          <g key={t.name}>
            <line data-link={i} x1={t.mx} y1={t.my} x2={CORE.x} y2={CORE.y} className="stroke-brand-2/35" strokeWidth={1.2} strokeDasharray="4 5" style={{ opacity: "var(--t, 1)" }} />
            <line data-link={i} x1={t.mx} y1={t.my} x2={CORE.x} y2={CORE.y} pathLength={1} className="orch-flow stroke-glow" strokeWidth={2.2} style={{ opacity: "var(--l)", animationDelay: `${i * -0.17}s` }} />
          </g>
        ))}
        {/* Discover: a radar wedge sweeps around the core across the scattered systems. */}
        <g style={{ opacity: "var(--s, 0)" }}>
          <circle cx={CORE.x} cy={CORE.y} r={235} fill="none" className="stroke-glow/25" strokeWidth={1} />
          <g className="animate-[spin_3.5s_linear_infinite]" style={{ transformOrigin: `${CORE.x}px ${CORE.y}px`, transformBox: "view-box" }}>
            <path d={`M${CORE.x} ${CORE.y} L${CORE.x + 235} ${CORE.y} A235 235 0 0 0 ${CORE.x + 235 * Math.cos(0.6)} ${CORE.y - 235 * Math.sin(0.6)} Z`} className="fill-glow/15" />
            <line x1={CORE.x} y1={CORE.y} x2={CORE.x + 235} y2={CORE.y} className="stroke-glow" strokeWidth={2} />
          </g>
        </g>
        {/* Run: nothing shows until then, then each line draws out of the core. */}
        {OUT_Y.map((y, i) => {
          const d = `M${CORE.x + 70} ${CORE.y} C${CORE.x + 140} ${CORE.y} ${OUT_X - 140} ${y} ${OUT_X - 60} ${y}`;
          const color = `var(--color-${o.outputs[i].id})`;
          return (
            <g key={y} style={{ opacity: "var(--o)" }}>
              <path d={d} pathLength={1} fill="none" strokeWidth={2} style={{ stroke: color, strokeDasharray: 1, strokeDashoffset: "calc(1 - var(--o))" }} />
              <path d={d} pathLength={1} strokeWidth={3.5} className="orch-flow" style={{ stroke: "white", animationDelay: `${i * -0.5}s` }} />
            </g>
          );
        })}
      </svg>

      {/* Systems */}
      {tags.map((t) => (
        <span
          key={t.name}
          data-tag
          className="font-display absolute z-10 -translate-1/2 rounded-full border border-glow/40 bg-navy-2/95 px-2 py-0.5 text-[0.62rem] font-semibold whitespace-nowrap text-white/90 shadow-[0_0_18px_-6px] shadow-glow backdrop-blur sm:px-3 sm:py-1 sm:text-sm"
          style={{ left: pct(t.mx, W), top: pct(t.my, H) }}
        >
          {/* Discover: bottlenecks flagged red. */}
          {o.bottlenecks.includes(t.name) && (
            <span className="absolute -inset-1 rounded-full border-2 border-red-500 shadow-[0_0_18px_2px] shadow-red-500/70" style={{ opacity: "var(--f, 0)" }} aria-hidden />
          )}
          {t.name}
        </span>
      ))}

      {/* The core, after the reference site's business core: glass centre, three orbiting rings with satellites. */}
      <div
        className="absolute z-20 grid aspect-square w-[27%] -translate-1/2 place-items-center rounded-full border border-glow/50 bg-[radial-gradient(circle,rgb(10_132_255/0.35),rgb(5_7_11/0.92)_68%)] text-center transition-[box-shadow] story:bg-[radial-gradient(circle,rgb(10_132_255/0.2),rgb(5_7_11/0.55)_70%)]"
        style={{
          left: pct(CORE.x, W),
          top: pct(CORE.y, H),
          opacity: "calc(0.55 + var(--c) * 0.45)",
          scale: "calc(0.82 + var(--c) * 0.18)",
          boxShadow: "0 0 0 calc(12px + var(--l) * 16px) rgb(10 132 255 / 0.05), 0 0 calc(40px + var(--l) * 80px) rgb(10 132 255 / 0.35)",
        }}
      >
        <i className="core-ring -inset-[34%] border-dashed" aria-hidden />
        <i className="core-ring -inset-[18%] [animation-direction:reverse] [animation-duration:26s]" style={{ borderColor: "rgb(139 232 255 / 0.4)" }} aria-hidden />
        <i className="core-ring -inset-[4%] [animation-duration:18s]" style={{ borderColor: "rgb(185 241 255 / 0.3)" }} aria-hidden />
        <span className="relative rounded-full px-2 [text-shadow:0_0_12px_#05070b,0_0_3px_#05070b]">
          <span className="label block !text-[0.5rem] text-glow sm:!text-[0.68rem]">Connected</span>
          <span className="font-display my-1 block text-[0.8rem] leading-tight font-semibold sm:text-xl">Orchestration<br />layer</span>
        </span>
      </div>

      {/* Run: "What you get" (Grow / Serve / Save) slides in from the right. */}
      <p className="label absolute z-10 -translate-x-1/2 !text-[0.55rem] whitespace-nowrap text-white/70 sm:!text-[0.7rem]" style={{ left: pct(OUT_X, W), top: pct(OUT_Y[0] - 62, H), opacity: "var(--o)" }}>
        {o.resultsLabel}
      </p>
      {o.outputs.map((r, i) => (
        <div
          key={r.id}
          className="absolute z-10 w-[20%] rounded-xl border bg-navy/90 px-2 py-1.5 text-center backdrop-blur sm:px-3 sm:py-2.5"
          style={{
            left: pct(OUT_X, W),
            top: pct(OUT_Y[i], H),
            opacity: "var(--o)",
            translate: "calc(-50% + (1 - var(--o)) * 30px) -50%",
            borderColor: `var(--color-${r.id})`,
            boxShadow: `0 0 30px -8px var(--color-${r.id})`,
          }}
        >
          <p className="label !text-[0.5rem] text-white/55 sm:!text-[0.65rem]">0{i + 1}</p>
          <p className="font-display text-sm font-semibold sm:text-2xl" style={{ color: `var(--color-${r.id})` }}>{r.verb}</p>
          <p className="text-[0.6rem] leading-tight text-white/85 sm:text-sm">{r.label}</p>
        </div>
      ))}
    </div>
  );
}
