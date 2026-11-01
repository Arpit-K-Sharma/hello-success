"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "./ui";

const { focus } = site.discovery;
const field =
  "w-full rounded-2xl border border-line bg-white/5 px-5 py-4 text-lg text-white placeholder:text-white/40 outline-none transition focus:border-brand-2 focus:bg-white/10";
const accent = (id: string) => (id === "unsure" ? "var(--color-glow)" : `var(--color-${id})`);

// Board preview: nothing is sent. Wire to email/CRM before launch.
// Links to `#start-grow` (serve / run / unsure) arrive with that focus picked.
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [brief, setBrief] = useState({ focus: "", now: "", better: "", name: "", company: "" });
  const set = (k: keyof typeof brief) => (e: { target: { value: string } }) => setBrief((b) => ({ ...b, [k]: e.target.value }));
  const chosen = focus.find((f) => f.id === brief.focus);

  useEffect(() => {
    const pick = () => {
      const id = location.hash.match(/^#start-(\w+)$/)?.[1];
      if (!id || !focus.some((f) => f.id === id)) return;
      setBrief((b) => ({ ...b, focus: id }));
      history.replaceState(null, "", "#contact");
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };
    pick();
    addEventListener("hashchange", pick);
    return () => removeEventListener("hashchange", pick);
  }, []);

  if (sent) {
    return (
      <div role="status" className="grid min-h-96 place-items-center rounded-3xl border border-line bg-white/5 p-10 text-center">
        <div className="space-y-4">
          <span className="bg-brand mx-auto grid size-16 place-items-center rounded-full"><Icon name="check" className="size-8" /></span>
          <p className="font-display text-3xl font-semibold">Brief received, {brief.name.split(" ")[0] || "thanks"}.</p>
          <p className="text-lg text-white/75">We&apos;ll reply within one business day with a time for your call.</p>
          <button type="button" onClick={() => setSent(false)} className="text-white/70 underline">Edit my brief</button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-8 rounded-3xl border border-line bg-white/[0.04] p-6 sm:p-8"
    >
      <fieldset>
        <legend className="font-display mb-4 text-2xl font-semibold"><Step n={1} />What do you want to improve?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {focus.map((f) => (
            <label
              key={f.id}
              style={{ "--accent": accent(f.id) } as React.CSSProperties}
              className="group cursor-pointer rounded-2xl border border-line p-5 transition hover:border-(--accent)/60 has-checked:border-(--accent) has-checked:bg-(--accent)/10 has-focus-visible:ring-2 has-focus-visible:ring-(--accent)"
            >
              <input type="radio" name="focus" value={f.id} required checked={brief.focus === f.id} onChange={set("focus")} className="sr-only" />
              <span className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-(--accent)">{f.label}</span>
                <span className="grid size-6 place-items-center rounded-full border border-line group-has-checked:border-(--accent) group-has-checked:bg-(--accent)">
                  <Icon name="check" className="size-4 text-void opacity-0 group-has-checked:opacity-100" />
                </span>
              </span>
              <span className="mt-1 block text-white/70">{f.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-4">
        <p className="font-display text-2xl font-semibold"><Step n={2} />Tell us what&apos;s happening</p>
        <label className="block space-y-2">
          <span className="text-white/80">What&apos;s slowing the business down?</span>
          <textarea name="now" rows={3} value={brief.now} onChange={set("now")} className={field} placeholder="Leads go cold, staff re-key invoices into two systems…" />
        </label>
        <label className="block space-y-2">
          <span className="text-white/80">What would better look like? <span className="text-white/50">(optional)</span></span>
          <input name="better" value={brief.better} onChange={set("better")} className={field} placeholder="Every enquiry answered the same day" />
        </label>
      </div>

      <div className="space-y-4">
        <p className="font-display text-2xl font-semibold"><Step n={3} />Where do we reach you?</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-white/80">Name</span>
            <input required name="name" autoComplete="name" value={brief.name} onChange={set("name")} className={field} placeholder="Jane Smith" />
          </label>
          <label className="space-y-2">
            <span className="text-white/80">Work email</span>
            <input required type="email" name="email" autoComplete="email" className={field} placeholder="jane@company.com" />
          </label>
          <label className="space-y-2 sm:col-span-2">
            <span className="text-white/80">Company <span className="text-white/50">(optional)</span></span>
            <input name="company" autoComplete="organization" value={brief.company} onChange={set("company")} className={field} placeholder="Company name" />
          </label>
        </div>
      </div>

      {/* Review before sending: a plain checklist of what they've told us, filled in live. */}
      <div aria-live="polite" className="hud hidden rounded-2xl story:block border border-glow/30 bg-[linear-gradient(160deg,rgb(24_104_219/0.25),transparent_70%)] p-5">
        <p className="font-display text-xl font-semibold">Check before you send</p>
        <p className="mt-1 text-white/70">This is what our team will read before your call.</p>
        <dl className="mt-4 divide-y divide-white/10">
          <Row label="You want to" value={chosen?.label} color={chosen && accent(chosen.id)} missing="Choose an option in step 1" />
          <Row label="What's in the way" value={brief.now} missing="Add a sentence in step 2" />
          <Row label="Better looks like" value={brief.better} missing="Optional" />
          <Row label="From" value={[brief.name, brief.company].filter(Boolean).join(", ")} missing="Add your name in step 3" />
        </dl>
      </div>

      <div className="space-y-3">
        <button type="submit" className="bg-brand hover:bg-brand-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-lg font-medium shadow-[0_0_50px_-10px] shadow-brand transition">
          Send my brief and book the call <Icon name="arrow" className="size-5" />
        </button>
        <p className="text-center text-white/60">Free · 30 minutes · Reply within one business day</p>
      </div>
    </form>
  );
}

function Step({ n }: { n: number }) {
  return <span className="text-brand-2 mr-3">0{n}</span>;
}

function Row({ label, value, color, missing }: { label: string; value?: string; color?: string; missing: string }) {
  return (
    <div className="grid gap-1 py-2.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-white/60">{label}</dt>
      <dd className={`text-lg break-words ${value ? "font-medium" : "text-white/40 italic"}`} style={{ color: value ? color : undefined }}>
        {value ? <span className="flex gap-2"><Icon name="check" className="text-glow mt-1 size-4 shrink-0" />{value}</span> : missing}
      </dd>
    </div>
  );
}
