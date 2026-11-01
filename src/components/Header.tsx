"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Icon, Lockup } from "./ui";

/** The nav item whose section crosses the 40% line of the screen (null in hero / contact). */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const line = innerHeight * 0.4;
      const hit = site.nav.find((n) =>
        n.sections.some((id) => {
          const r = document.getElementById(id)?.getBoundingClientRect();
          return r && r.top <= line && r.bottom > line;
        }),
      );
      setActive(hit?.href ?? null);
    };
    const onScroll = () => (raf ||= requestAnimationFrame(check));
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return active;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const rail = useRef<HTMLDivElement>(null);
  const underline = useRef<HTMLSpanElement>(null);
  const close = () => setOpen(false);

  // Slide the glowing underline beneath the current section's link text.
  useEffect(() => {
    const link = rail.current?.querySelector<HTMLElement>(`a[href="${active}"]`);
    const u = underline.current!.style;
    u.opacity = link ? "1" : "0";
    if (link) {
      u.width = `${link.offsetWidth - 24}px`;
      u.transform = `translateX(${link.offsetLeft + 12}px)`;
    }
  }, [active]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-void/80 backdrop-blur-xl">
      <div className="shell flex h-18 items-center gap-6">
        <a href="#top" aria-label={`${site.name} home`} onClick={close} className="shrink-0">
          <Lockup />
        </a>

        {/* Free-standing links; a glowing underline slides to the section on screen. */}
        <nav aria-label="Primary" className="mx-auto hidden xl:block">
          <div ref={rail} className="relative flex items-center gap-2">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "location" : undefined}
                className="relative px-3 py-2 text-[0.95rem] whitespace-nowrap text-white/65 transition-colors hover:text-white aria-[current=location]:text-white"
              >
                {item.label}
              </a>
            ))}
            <span
              ref={underline}
              aria-hidden
              className="bg-glow absolute -bottom-1 left-0 h-0.5 rounded-full opacity-0 shadow-[0_0_10px_1px_var(--color-glow)] transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            />
          </div>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 xl:ml-0">
          <a
            href={site.cta.href}
            className="bg-brand hover:bg-brand-2 group hidden items-center gap-2 rounded-full px-5 py-3 font-medium whitespace-nowrap shadow-[0_0_40px_-8px] shadow-brand transition sm:inline-flex"
          >
            <span className="xl:hidden">{site.cta.short}</span>
            <span className="hidden xl:inline">{site.cta.label}</span>
            <Icon name="arrow" className="size-4 transition group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            className="relative grid size-11 place-items-center rounded-full border border-line xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className={`block h-px w-4 bg-white transition ${open ? "translate-y-[3px] rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute block h-px w-4 bg-white transition ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="shell flex flex-col pb-8 xl:hidden">
        {site.nav.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={close}
            aria-current={active === item.href ? "location" : undefined}
            className="font-display flex items-center gap-4 border-b border-line py-4 text-2xl aria-[current=location]:text-glow"
          >
            <span className="label w-6 text-white/45">0{i + 1}</span>
            {item.label}
            {active === item.href && <span className="bg-glow ml-auto size-2 rounded-full shadow-[0_0_10px_2px_var(--color-glow)]" aria-hidden />}
          </a>
        ))}
        <a href={site.cta.href} onClick={close} className="bg-brand mt-6 rounded-full py-4 text-center text-lg font-medium">
          {site.cta.label}
        </a>
      </nav>
    </header>
  );
}

/** Mobile only: a floating call-to-action once the hero is gone, hidden while the form is on screen. */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
      setShow(!seen.get("top") && !seen.get("contact"));
    });
    ["top", "contact"].forEach((id) => io.observe(document.getElementById(id)!));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={site.cta.href}
      className={`bg-brand fixed inset-x-4 bottom-4 z-40 flex items-center justify-center rounded-full py-4 text-lg font-medium shadow-[0_10px_40px_-5px] shadow-brand transition duration-300 lg:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
    >
      {site.cta.label}
    </a>
  );
}
