"use client";

import { createContext, useContext, useRef, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Scroll progress (0 → 1) of the nearest ScrollStory. A ref, not state, so
// 3D scenes / frame sequences can read it every frame without re-rendering.
const ProgressContext = createContext<RefObject<number>>({ current: 1 });
export const useScrollProgress = () => useContext(ProgressContext);

export const SCRUB_QUERY = "(min-width: 1200px) and (prefers-reduced-motion: no-preference)";
// Phone design (everything that isn't the desktop design) pins its own scenes when motion is allowed.
export const PHONE_QUERY = "(max-width: 1199.98px) and (prefers-reduced-motion: no-preference)";

/** Live matchMedia; false on the server. Used to mount 3D only for the design on screen. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}

/**
 * Pinned "scroll = video" section. Markup inside opts in with data attributes:
 *   [data-beat="0..n"]   copy blocks that cross-fade in sequence
 *   [data-scrub-step]    items that light up one after another
 *   [data-scrub-bar]     element scaled 0 → 1 along the whole scroll
 *   [data-scrub-bar-x]   same, horizontally; [data-scrub-head] rides its leading edge
 *   [data-dot="i"]       indicator; gets data-active on the current beat
 *   [data-fit]           scaled down to fit its parent on short screens
 * mode "desk" pins at SCRUB_QUERY, mode "phone" at PHONE_QUERY. Otherwise it
 * renders as a normal, fully visible section (see [data-story] rules in
 * globals.css) and progress stays at 1.
 */
export function ScrollStory({
  id,
  screens,
  hold = 0.25,
  mode = "desk",
  className = "",
  children,
}: {
  id?: string;
  screens: number;
  /** Share of extra timeline to hold the final frame before unpinning. */
  hold?: number;
  mode?: "desk" | "phone";
  className?: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mode === "desk" ? SCRUB_QUERY : PHONE_QUERY, () => {
        const q = gsap.utils.selector(root);
        const beats = q("[data-beat]");
        const steps = q("[data-scrub-step]");
        const dots = q("[data-dot]");
        const span = Math.max(beats.length - 1, 1);

        progress.current = 0;
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => {
              progress.current = self.progress;
              const active = Math.round(self.progress * (beats.length - 1));
              dots.forEach((d, i) => d.toggleAttribute("data-active", i === active));
            },
          },
        });

        beats.slice(1).forEach((beat, i) => {
          tl.to(beats[i], { autoAlpha: 0, y: -40, duration: 0.35 }, i + 0.35).fromTo(
            beat,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.35 },
            i + 0.65,
          );
        });
        steps.forEach((step, i) => {
          tl.to(step, { opacity: 1, duration: 0.2 }, (i / steps.length) * span);
        });
        // Only tween what this scene actually has (GSAP warns on empty targets).
        const along = (sel: string, from: gsap.TweenVars, to: gsap.TweenVars) => {
          const t = q(sel);
          if (t.length) tl.fromTo(t, from, { ...to, ease: "none", duration: span }, 0);
        };
        along("[data-scrub-bar]", { scaleY: 0 }, { scaleY: 1 });
        along("[data-scrub-bar-x]", { scaleX: 0 }, { scaleX: 1 });
        along("[data-scrub-head]", { left: "0%" }, { left: "100%" });
        tl.to({}, { duration: hold }); // hold the final frame before unpinning

        // [data-fit] scales down to its parent's content box so short screens never clip the scene.
        const fits = q("[data-fit]");
        const fit = () =>
          fits.forEach((el) => {
            const p = el.parentElement!;
            const cs = getComputedStyle(p);
            const room = p.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
            el.style.scale = String(Math.min(1, room / el.offsetHeight));
          });
        const ro = new ResizeObserver(fit);
        fits.forEach((el) => {
          ro.observe(el);
          ro.observe(el.parentElement!);
        });

        return () => {
          progress.current = 1;
          ro.disconnect();
          fits.forEach((el) => (el.style.scale = ""));
        };
      });
    },
    { scope: root },
  );

  return (
    <ProgressContext.Provider value={progress}>
      <section
        ref={root}
        id={id}
        data-story={mode}
        style={{ "--screens": screens } as React.CSSProperties}
        className={`relative ${className}`}
      >
        <div data-story-sticky>{children}</div>
      </section>
    </ProgressContext.Provider>
  );
}
