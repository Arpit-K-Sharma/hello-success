"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MathUtils } from "three";
import { outcomes, services } from "@/content/services";
import { SCRUB_QUERY, useMedia, useScrollProgress } from "./ScrollStory";
import { Icon } from "./ui";
import { Stories } from "./phone/Stories";

const CoreScene = dynamic(() => import("./CoreScene"), { ssr: false });

const outcomeVerb = Object.fromEntries(outcomes.map((o) => [o.id, o.verb]));
const N = services.length;
const { smoothstep, damp, clamp } = MathUtils;

function OutcomeChips({ ids }: { ids: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => (
        <span key={id} className="label rounded-full border border-current/40 px-3 py-1" style={{ color: `var(--color-${id})` }}>
          {outcomeVerb[id]}
        </span>
      ))}
    </div>
  );
}

/**
 * Services as an orbit around a glowing core. Scroll turns the ring; each
 * service pauses at the front and opens a detail panel above everything.
 * Below 1200px / reduced motion: a plain grid. Both open the focus dialog.
 */
export function ServiceCatalogue() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const s = services[index];

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i + d + N) % N);

  return (
    <>
      <Orbit onOpen={open} />

      {/* Phone design: one service per story card; "Full details" opens the same dialog. */}
      <div className="shell relative z-10 pb-16 story:hidden">
        <Stories label="Services">
          {services.map((svc, i) => (
            <article key={svc.slug} className="flex w-full flex-col gap-4 rounded-3xl border border-line bg-navy p-6">
              <div className="flex items-center gap-4">
                <span className="bg-brand grid size-12 shrink-0 place-items-center rounded-2xl text-white">
                  <Icon name={svc.icon} className="size-6" />
                </span>
                <h3 className="font-display text-2xl leading-tight font-semibold">{svc.name}</h3>
              </div>
              <p className="text-white/80">{svc.short}</p>
              <ul className="grid gap-2">
                {svc.whatWeDo.map((w) => (
                  <li key={w} className="flex gap-2.5 text-white/85"><Icon name="check" className="text-glow mt-1 size-4 shrink-0" />{w}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <OutcomeChips ids={svc.outcomes} />
                <button type="button" onClick={() => open(i)} className="bg-brand inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium">
                  Full details <Icon name="arrow" className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </Stories>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="service-title"
        className="m-auto max-h-[92svh] w-[min(1150px,94vw)] overflow-y-auto rounded-3xl border border-line bg-navy p-0 text-white backdrop:bg-transparent"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-navy/90 px-6 py-4 backdrop-blur sm:px-10">
          <p className="label text-white/60">
            Service {index + 1} / {N}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} className="rounded-full border border-line px-4 py-2 hover:bg-white/5" aria-label="Previous service">←</button>
            <button type="button" onClick={() => step(1)} className="rounded-full border border-line px-4 py-2 hover:bg-white/5" aria-label="Next service">→</button>
            <button type="button" onClick={() => dialog.current?.close()} className="rounded-full bg-white px-5 py-2 font-medium text-ink">Close</button>
          </div>
        </div>

        <div key={s.slug} className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <span className="bg-brand/20 text-brand-2 grid size-16 place-items-center rounded-2xl">
                <Icon name={s.icon} className="size-8" />
              </span>
              <h3 id="service-title" className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{s.name}</h3>
              <p className="text-xl text-white/80">{s.short}</p>
              <OutcomeChips ids={s.outcomes} />
            </div>
            <Block title="Who it's for"><p className="text-lg text-white/85">{s.forWho}</p></Block>
            <Block title="Sound familiar?">
              <ul className="space-y-2 text-lg">
                {s.problems.map((p) => (
                  <li key={p} className="flex gap-3 text-white/85"><span className="mt-2.5 size-2 shrink-0 rounded-full bg-red-400" />{p}</li>
                ))}
              </ul>
            </Block>
          </div>

          <div className="space-y-8">
            <Block title="What we do">
              <ul className="space-y-3 text-lg">
                {s.whatWeDo.map((w) => (
                  <li key={w} className="flex gap-3"><Icon name="check" className="text-glow mt-1 size-5 shrink-0" />{w}</li>
                ))}
              </ul>
            </Block>
            <Block title="You get">
              <div className="flex flex-wrap gap-2">
                {s.deliverables.map((d) => <span key={d} className="rounded-full border border-line bg-white/5 px-4 py-2">{d}</span>)}
              </div>
            </Block>
            <Block title="How an engagement runs">
              <ol className="grid grid-cols-3 gap-2">
                {s.engagement.map((e, i) => (
                  <li key={e.phase} className="rounded-2xl border border-line p-4">
                    <span className="label text-glow">0{i + 1}</span>
                    <p className="mt-1 font-medium">{e.phase}</p>
                    <p className="text-white/60">{e.length}</p>
                  </li>
                ))}
              </ol>
            </Block>
            <div className="rounded-2xl border border-brand/40 bg-brand/10 p-5">
              <p className="label mb-2 text-white/60">What changes</p>
              <p className="font-display text-2xl font-semibold">{s.change}</p>
            </div>
            <a href="#contact" onClick={() => dialog.current?.close()} className="bg-brand hover:bg-brand-2 block rounded-full py-4 text-center text-lg font-medium transition">
              Talk to us about {s.name}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}

// Orbit sits left; the service in front is read in a fixed panel on the right.
const CX = 0.29;
const CY = 0.62;

function Orbit({ onOpen }: { onOpen: (i: number) => void }) {
  const progress = useScrollProgress();
  const stage = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const isDesk = useMedia(SCRUB_QUERY);

  useEffect(() => {
    const chips = [...stage.current!.querySelectorAll<HTMLElement>("[data-chip]")];
    const panels = [...stage.current!.querySelectorAll<HTMLElement>("[data-panel]")];
    let pos = 0;
    let last = -1;
    let raf = 0;
    let prev = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      // Each service owns 1/(N-1) of the scroll: dwell at the front, then turn.
      const sPos = clamp(progress.current, 0, 1) * (N - 1);
      const k = Math.min(Math.floor(sPos), N - 2);
      const target = k + smoothstep(sPos - k, 0.35, 0.65);
      pos = damp(pos, target, 6, dt);
      if (Math.abs(pos - last) < 0.0005) return;
      last = pos;

      const { width } = stage.current!.getBoundingClientRect();
      const rx = Math.min(width * 0.2, 300);
      const ry = Math.min(window.innerHeight * 0.14, 140);
      // The nearest service is always the one being read: no empty, half-faded panel.
      const active = Math.round(pos);
      track.current!.style.width = `${rx * 2}px`;
      track.current!.style.height = `${ry * 2}px`;
      chips.forEach((chip, i) => {
        const theta = ((i - pos) / N) * Math.PI * 2;
        const depth = (Math.cos(theta) + 1) / 2; // 0 back, 1 front
        const focus = clamp(1 - Math.abs(i - pos) * 2.2, 0, 1);
        chip.style.transform = `translate(-50%, -50%) translate(${Math.sin(theta) * rx}px, ${Math.cos(theta) * ry}px) scale(${0.7 + depth * 0.3 + focus * 0.12})`;
        chip.style.zIndex = String(Math.round(depth * 100));
        chip.style.opacity = String(0.55 + depth * 0.45);
        chip.toggleAttribute("data-front", i === active && focus > 0.3);
        panels[i].toggleAttribute("data-active", i === active);
        panels[i].inert = i !== active;
      });
      counter.current!.textContent = String(active + 1).padStart(2, "0");
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  const at = { left: `${CX * 100}%`, top: `${CY * 100}%` };
  return (
    <div ref={stage} className="absolute inset-0 hidden story:block">
      {/* The core: a space scene every service orbits; it spins faster while the ring turns. */}
      {isDesk && <CoreScene x={CX} y={CY} />}
      <div ref={track} style={at} className="absolute -translate-1/2 rounded-[50%] border border-glow/25 shadow-[0_0_40px_-10px] shadow-glow/40" aria-hidden />
      <p style={at} className="pointer-events-none absolute z-[50] flex -translate-1/2 flex-col items-center gap-1 text-center [text-shadow:0_0_16px_#05070b,0_0_4px_#05070b]">
        <Image src="/brand/hs-logo-short-white.svg" alt="Hello Success" width={48} height={48} unoptimized className="size-12 drop-shadow-[0_0_12px_rgb(5_7_11)]" />
        <span className="label text-glow">{N} services</span>
      </p>

      <div style={at} className="absolute size-0">
        {services.map((svc, i) => (
          <button
            key={svc.slug}
            type="button"
            data-chip
            tabIndex={-1}
            onClick={() => onOpen(i)}
            className="absolute top-0 left-0 flex w-max max-w-[15rem] items-center gap-2.5 rounded-2xl border border-line bg-navy-2 px-4 py-2.5 shadow-lg shadow-black/40 transition-colors will-change-transform data-front:border-glow data-front:bg-brand data-front:shadow-brand/50"
          >
            <Icon name={svc.icon} className="size-5 text-glow" />
            <span className="font-display text-[0.9rem] leading-tight font-semibold">{svc.name}</span>
          </button>
        ))}
      </div>

      {/* Reading panel: the service at the front, shown large and steady. */}
      <div className="absolute top-[max(6rem,calc(50%-12rem))] right-[max(1.25rem,calc((100%-1280px)/2))] grid w-[min(34rem,40vw)]">
        <p className="label mb-4 text-white/60">
          <span ref={counter} className="font-display text-glow text-3xl">01</span> / 0{N}
        </p>
        <div className="grid">
          {services.map((svc, i) => (
            <article
              key={svc.slug}
              data-panel
              className="hud invisible col-start-1 row-start-1 translate-y-4 space-y-5 self-start rounded-3xl border border-brand-2/40 bg-navy/90 p-7 opacity-0 shadow-[0_30px_120px_-20px_rgb(24_104_219/0.6)] backdrop-blur-xl transition duration-300 data-active:visible data-active:translate-y-0 data-active:opacity-100"
            >
              <div className="flex items-center gap-4">
                <span className="bg-brand grid size-14 shrink-0 place-items-center rounded-2xl text-white">
                  <Icon name={svc.icon} className="size-7" />
                </span>
                <h3 className="font-display text-3xl leading-tight font-semibold tracking-tight">{svc.name}</h3>
              </div>
              <p className="text-xl text-white/85">{svc.short}</p>
              <ul className="grid gap-2 text-lg">
                {svc.whatWeDo.map((w) => (
                  <li key={w} className="flex gap-3"><Icon name="check" className="text-glow mt-1 size-5 shrink-0" />{w}</li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                <OutcomeChips ids={svc.outcomes} />
                <button type="button" onClick={() => onOpen(i)} className="bg-brand hover:bg-brand-2 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition">
                  Full details <Icon name="arrow" className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label mb-3 text-white/55">{title}</p>
      {children}
    </div>
  );
}
