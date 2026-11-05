import Image from "next/image";
import { site } from "@/content/site";
import { outcomes, type Outcome } from "@/content/services";
import { ContactForm } from "@/components/ContactForm";
import { Header, MobileCta } from "@/components/Header";
import { HeroVisual } from "@/components/HeroVisual";
import { Inbox } from "@/components/Inbox";
import { Orchestration } from "@/components/Orchestration";
import { ScrollStory } from "@/components/ScrollStory";
import { ServiceCatalogue } from "@/components/ServiceCatalogue";
import { PhoneOrchestration } from "@/components/phone/PhoneOrchestration";
import { Stories } from "@/components/phone/Stories";
import { ButtonLink, Eyebrow, Icon, Lockup } from "@/components/ui";

const H2 = "font-display text-3xl font-semibold tracking-tight sm:text-6xl";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Split id="top" desk={<Hero />} phone={<PhoneHero />} />
        <Problem />
        <Split id="orchestration" desk={<Orchestration />} phone={<PhoneOrchestration />} />
        <div id="outcomes">
          <OutcomesIntro />
          <div className="hidden story:block">
            {outcomes.map((o, i) => (
              <div key={o.id} id={o.id}>
                <OutcomeChapter outcome={o} index={i} />
              </div>
            ))}
          </div>
          <div className="shell pb-20 story:hidden">
            <Stories label="Outcomes">
              {outcomes.map((o, i) => <OutcomeCard key={o.id} outcome={o} index={i} />)}
            </Stories>
          </div>
        </div>
        <Services />
        <Process />
        <Results />
        <PoweredBy />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}

/** One section, two designs: desktop (story: breakpoint) or phone/tablet. The id sits on the shared wrapper. */
function Split({ id, desk, phone }: { id: string; desk: React.ReactNode; phone: React.ReactNode }) {
  return (
    <div id={id}>
      <div className="hidden story:block">{desk}</div>
      <div className="story:hidden">{phone}</div>
    </div>
  );
}

function Hero() {
  const { hero } = site;
  return (
    <ScrollStory screens={4} className="bg-[radial-gradient(circle_at_70%_45%,#0f2a52_0,var(--color-void)_55%)]">
      <div className="relative flex h-full flex-col">
        {/* Pinned: clear the sticky header; data-fit shrinks the copy on short screens. */}
        <div className="shell relative z-10 flex flex-1 items-center pt-20 pb-10 story:pt-24 story:pb-10">
          <div data-beats data-fit className="max-w-2xl origin-left space-y-14 story:items-center story:space-y-0">
            <div data-beat="0" className="space-y-8">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <h1 className="font-display text-4xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
                {hero.title[0]} <span className="text-brand-2">{hero.title[1]}</span>
                <br />
                <span className="text-white/70">{hero.title[2]}</span>
              </h1>
              <p className="max-w-xl text-xl text-white/80">{hero.intro}</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={site.cta.href}>{site.cta.label}</ButtonLink>
                <ButtonLink href="#services" variant="ghost">Explore services</ButtonLink>
              </div>
            </div>
            {hero.beats.map((b, i) => (
              <div key={b.kicker} data-beat={i + 1} className="hidden space-y-6 story:block">
                <Eyebrow>{b.kicker}</Eyebrow>
                <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-tight sm:text-6xl">{b.heading}</h2>
                <p className="max-w-lg text-xl text-white/80">{b.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[40svh] story:absolute story:inset-y-0 story:right-0 story:left-[35%] story:h-auto">
          <HeroVisual desk />
        </div>
      </div>
    </ScrollStory>
  );
}

/** Phone hero: 3D on top, copy below swaps from "what we are" through Discover, Redesign, Automate. */
function PhoneHero() {
  const { hero } = site;
  return (
    <ScrollStory mode="phone" screens={3.5} className="bg-[radial-gradient(circle_at_50%_25%,#0f2a52_0,var(--color-void)_60%)]">
      <div className="relative flex h-full flex-col justify-end pt-18">
        {/* The 3D spins behind the copy; a fade keeps the text readable. */}
        <div className="absolute inset-x-0 top-0 h-[64%] opacity-70 [mask-image:linear-gradient(#000_65%,transparent)]">
          <HeroVisual desk={false} />
        </div>
        <div className="from-void via-void/80 pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-linear-to-t via-55% to-transparent" aria-hidden />
        <div className="shell relative flex flex-col gap-5 pb-10">
          <div data-beats className="mx-auto w-full max-w-xl space-y-8">
            <div data-beat="0" className="space-y-4">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <h1 className="font-display text-4xl leading-[0.98] font-semibold tracking-tight sm:text-5xl">
                {hero.title[0]} <span className="text-brand-2">{hero.title[1]}</span>{" "}
                <span className="text-white/70">{hero.title[2]}</span>
              </h1>
              <p className="text-white/80">{hero.intro}</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={site.cta.href}>{site.cta.short}</ButtonLink>
                <span className="max-[380px]:hidden"><ButtonLink href="#services" variant="ghost">Explore services</ButtonLink></span>
              </div>
            </div>
            {hero.beats.map((b, i) => (
              <div key={b.kicker} data-beat={i + 1} className="space-y-3 self-end">
                <Eyebrow>{b.kicker}</Eyebrow>
                <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{b.heading}</h2>
                <p className="text-lg text-white/80">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto flex w-full max-w-xl gap-2" aria-hidden>
            {[0, ...hero.beats.map((_, i) => i + 1)].map((i) => (
              <span key={i} data-dot={i} data-active={i === 0 ? "" : undefined} className="h-1.5 w-1.5 rounded-full bg-white/25 transition-all" />
            ))}
          </div>
        </div>
      </div>
    </ScrollStory>
  );
}

function Problem() {
  const p = site.problem;
  return (
    <section className="bg-paper text-ink overflow-clip py-20 story:py-28">
      <div className="shell grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-10">
          <div className="reveal space-y-5">
            <p className="label text-brand">{p.eyebrow}</p>
            <h2 className={H2}>{p.title}</h2>
            <p className="text-ink/75 text-xl">{p.body}</p>
          </div>
          <dl className="divide-line-dark border-line-dark divide-y border-y">
            {p.costs.map((c) => (
              <div key={c.stat} className="reveal grid grid-cols-[7.5rem_1fr] items-center gap-6 py-5">
                <dt className="font-display text-5xl font-semibold text-red-600">{c.stat}</dt>
                <dd className="text-ink/80 text-lg">{c.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Inbox />
      </div>

      <p className="reveal shell font-display mt-16 max-w-4xl story:mt-24 text-center text-3xl leading-snug font-medium sm:text-5xl">
        {p.closer[0]} <span className="text-brand">{p.closer[1]}</span> {p.closer[2]}
      </p>
    </section>
  );
}

/** Phone: one outcome per story card. */
function OutcomeCard({ outcome: o, index }: { outcome: Outcome; index: number }) {
  return (
    <article style={{ "--accent": `var(--color-${o.id})` } as React.CSSProperties} className="relative flex w-full flex-col gap-4 overflow-hidden rounded-3xl border border-line bg-navy p-6">
      <span className="bg-(--accent) absolute inset-x-0 top-0 h-1" aria-hidden />
      <p className="label text-(--accent)">0{index + 1} · {o.verb}</p>
      <h3 className="font-display text-2xl leading-[1.1] font-semibold tracking-tight">{o.title}</h3>
      <p className="text-white/80">{o.promise}</p>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm text-white/85">
        {o.flow.map((f, i) => (
          <li key={f.label} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="arrow" className="size-3.5 text-(--accent)" />}
            <span className="rounded-full border border-(--accent)/40 px-2.5 py-1">{f.label}</span>
          </li>
        ))}
      </ol>
      <p className="mt-auto flex items-baseline gap-3 border-t border-line pt-4">
        <span className="font-display text-4xl font-semibold text-(--accent)">{o.result.value}</span>
        <span className="text-white/80">{o.result.label}</span>
      </p>
      <a href={`#start-${o.id}`} className="font-display inline-flex items-center gap-2 font-semibold text-(--accent)">
        Start with {o.verb} <Icon name="arrow" className="size-4" />
      </a>
    </article>
  );
}

function OutcomesIntro() {
  return (
    <section className="pt-20 pb-8 sm:pt-28 story:pb-0">
      <div className="shell reveal space-y-8 text-center">
        <Eyebrow>How it works</Eyebrow>
        <h2 className={`${H2} mx-auto max-w-4xl`}>Three outcomes. One connected system.</h2>
        <div className="hidden flex-wrap justify-center gap-3 story:flex">
          {outcomes.map((o) => (
            <a key={o.id} href={`#${o.id}`} className="font-display rounded-full border border-current/50 px-7 py-3 text-lg font-semibold transition hover:bg-white/5" style={{ color: `var(--color-${o.id})` }}>
              {o.verb}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomeChapter({ outcome: o, index }: { outcome: Outcome; index: number }) {
  const accent = { "--accent": `var(--color-${o.id})` } as React.CSSProperties;
  const layers = [
    ["Process", o.layers.process],
    ["Platform", o.layers.platform],
    ["AI", o.layers.ai],
  ];
  return (
    <ScrollStory screens={2.5}>
      {/* Pinned: content sits below the sticky header with a gap, and data-fit shrinks it on short screens. */}
      <div className="flex h-full flex-col justify-[safe_center] pt-24 pb-6">
        <div data-fit style={accent} className="shell grid origin-top items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="space-y-6">
            <p className="label text-(--accent)">0{index + 1} · {o.verb}</p>
            <h2 className="font-display text-3xl leading-[1.05] font-semibold tracking-tight sm:text-4xl xl:text-5xl">{o.title}</h2>
            <p className="text-xl text-white/80">{o.promise}</p>
            <p className="hidden border-l-2 border-(--accent) pl-5 text-lg text-white/70 italic story:block">“{o.problem}”</p>
            <dl className="hidden divide-y divide-white/10 border-y border-line story:block">
              {layers.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 py-3 text-lg">
                  <dt className="label text-(--accent) pt-1">{k}</dt>
                  <dd className="text-white/85">{v}</dd>
                </div>
              ))}
            </dl>
            <a href={`#start-${o.id}`} className="font-display inline-flex items-center gap-2 text-lg font-semibold text-(--accent) hover:underline">
              Start with {o.verb} <Icon name="arrow" className="size-5" />
            </a>
          </div>
  
          <div className="hidden rounded-3xl border border-line bg-navy/80 p-6 story:block">
            <div className="mb-4 flex items-center justify-between">
              <p className="label text-white/60">Workflow</p>
              <p className="label flex items-center gap-2 text-(--accent)">
                <span className="size-2 animate-pulse rounded-full bg-(--accent)" /> Live
              </p>
            </div>
            <ol className="relative space-y-1">
              <span className="absolute top-6 bottom-6 left-6 w-px bg-white/10" aria-hidden />
              <span data-scrub-bar className="absolute top-6 bottom-6 left-6 w-px origin-top bg-(--accent)" aria-hidden />
              {o.flow.map((f, i) => (
                <li key={f.label} data-scrub-step className="relative flex gap-5 rounded-2xl p-2">
                  <span className="font-display relative grid size-12 shrink-0 place-items-center rounded-full border border-(--accent) bg-navy text-lg font-semibold text-(--accent)">
                    {i + 1}
                  </span>
                  <span>
                    <span className="font-display text-xl font-semibold">{f.label}</span>
                    <span className="block text-lg text-white/70">{f.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div data-scrub-step className="mt-4 flex items-baseline gap-4 rounded-2xl bg-white/5 px-5 py-4">
              <p className="font-display text-5xl font-semibold text-(--accent)">{o.result.value}</p>
              <p className="text-lg text-white/80">{o.result.label}</p>
            </div>
          </div>
        </div>
      </div>
    </ScrollStory>
  );
}

function Services() {
  return (
    <ScrollStory id="services" screens={7} className="bg-[radial-gradient(circle_at_50%_60%,#0f2a52_0,var(--color-void)_60%)]">
      <div className="tech-grid absolute inset-0" aria-hidden />
      <div className="shell relative z-10 space-y-4 pt-20 pb-10 story:pt-28 story:pb-0">
        <Eyebrow>Services</Eyebrow>
        <h2 className={H2}>Six ways we help.</h2>
        <p className="max-w-xl text-xl text-white/75">Each one stands alone or combines into one program.</p>
      </div>
      <ServiceCatalogue />
    </ScrollStory>
  );
}

function Process() {
  return (
    <ScrollStory id="process" screens={3} hold={0.6}>
      <div className="tech-grid absolute inset-0" aria-hidden />
      <div className="shell relative flex h-full flex-col justify-center py-20 story:pt-24 story:pb-10">
        <div className="mb-12 max-w-3xl space-y-5 story:mb-20">
          <Eyebrow>Our process</Eyebrow>
          <h2 className={H2}>Process first. Technology second.</h2>
          <p className="text-xl text-white/75">One team and one thread of accountability, from the first conversation to the next improvement.</p>
        </div>
        <ol className="relative grid gap-5 lg:grid-cols-6 lg:gap-6">
          {/* Mobile: vertical line drawn by CSS. Desktop: thick bar filled by scroll, with a glowing head. */}
          <span className="absolute top-0 bottom-0 left-6 w-px bg-white/10 lg:hidden" aria-hidden />
          <span className="draw-line from-grow via-serve to-run absolute top-0 bottom-0 left-6 w-0.5 origin-top bg-linear-to-b lg:hidden" aria-hidden />
          <span className="absolute top-[1.375rem] right-0 left-0 hidden h-1 rounded-full bg-white/10 lg:block" aria-hidden>
            <span data-scrub-bar-x className="from-grow via-serve to-run absolute inset-0 origin-left rounded-full bg-linear-to-r shadow-[0_0_24px_2px] shadow-glow/60" />
            <span data-scrub-head className="absolute top-1/2 hidden size-5 -translate-1/2 rounded-full bg-white shadow-[0_0_24px_8px] shadow-glow story:block" />
          </span>
          {site.process.map((p, i) => (
            <li key={p.step} data-scrub-step className="relative pl-20 lg:pt-20 lg:pl-0">
              <span className="font-display bg-void text-glow border-glow/60 absolute top-0 left-0 grid size-12 place-items-center rounded-full border text-lg font-semibold shadow-[0_0_30px_-6px] shadow-glow">
                {i + 1}
              </span>
              <p className={`label mb-1 ${p.phase === "Consulting" ? "text-glow" : "text-brand-2"}`}>{p.phase}</p>
              <h3 className="font-display text-2xl font-semibold">{p.step}</h3>
              <p className="mt-2 hidden text-lg text-white/75 story:block">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </ScrollStory>
  );
}

function Results() {
  return (
    <section id="results" className="relative overflow-clip bg-navy py-20 story:py-28">
      <div className="shell space-y-12 story:space-y-20">
        <div className="reveal max-w-3xl space-y-5">
          <Eyebrow>Results</Eyebrow>
          <h2 className={H2}>Numbers our clients now report to their boards.</h2>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 story:gap-x-8 story:gap-y-12">
          {site.stats.map((s) => (
            <div key={s.label} className="reveal">
              <dt className="font-display from-glow to-brand-2 bg-linear-to-br bg-clip-text text-5xl font-semibold text-transparent sm:text-7xl xl:text-8xl">{s.value}</dt>
              <dd className="mt-3 text-lg text-white/75">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="reveal hidden grid-cols-3 gap-6 story:grid">
          {site.caseStudies.map((c) => <CaseStudy key={c.client} c={c} />)}
        </div>
        <div className="story:hidden">
          <Stories label="Case studies">
            {site.caseStudies.map((c) => <CaseStudy key={c.client} c={c} />)}
          </Stories>
        </div>

        <div className="grid gap-6 story:grid-cols-3">
          {site.testimonials.map((t, i) => (
            <figure key={t.name} className={`reveal ${i > 0 ? "hidden story:flex" : "flex"} flex-col justify-between gap-8 border-l-2 border-brand-2 pl-6`}>
              <blockquote className="font-display text-2xl leading-snug">“{t.quote}”</blockquote>
              <figcaption className="flex items-center gap-4">
                <Image src={t.avatar} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
                <span>
                  <span className="block text-lg font-medium">{t.name}</span>
                  <span className="text-white/65">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ c }: { c: (typeof site.caseStudies)[number] }) {
  return (
    <article style={{ "--accent": `var(--color-${c.outcome})` } as React.CSSProperties} className="relative w-full overflow-hidden rounded-3xl border border-line bg-void p-6 story:p-8">
      <span className="bg-(--accent) absolute inset-x-0 top-0 h-1" aria-hidden />
      <p className="label text-(--accent)">{outcomes.find((o) => o.id === c.outcome)?.verb}</p>
      <div className="font-display mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 story:mt-6">
        <span className="text-2xl whitespace-nowrap text-white/45 line-through decoration-1 story:text-3xl">{c.before}</span>
        <Icon name="arrow" className="size-6 shrink-0 self-center text-white/50" />
        <span className="text-4xl font-semibold whitespace-nowrap text-(--accent) sm:text-5xl">{c.after}</span>
      </div>
      <p className="mt-2 text-xl font-medium">{c.metric}</p>
      <p className="mt-4 text-white/70 story:mt-6 story:text-lg">{c.summary}</p>
      <p className="label mt-4 border-t border-line pt-4 text-white/60 story:mt-6 story:pt-5">{c.client} · {c.sector}</p>
    </article>
  );
}

function PoweredBy() {
  const t = site.itTogether;
  return (
    <section className="py-16" aria-label={t.eyebrow}>
      <div className="shell reveal hud flex flex-col gap-6 rounded-3xl border border-brand/50 bg-brand/10 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:gap-10">
        <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2">
          <p className="label text-white/70">Powered by</p>
          <Image src="/brand/itt-logo.png" alt="IT Together" width={1355} height={278} className="h-6 w-auto sm:h-7" />
        </div>
        <p className="text-lg text-white/85 lg:border-l lg:border-line lg:pl-10">{t.text}</p>
        <ul className="flex flex-wrap gap-2 lg:ml-auto lg:max-w-md lg:justify-end">
          {t.proof.map((p) => (
            <li key={p} className="flex items-center gap-2 rounded-full border border-line bg-void/50 px-3 py-1.5 text-white/85">
              <Icon name="check" className="text-glow size-4" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="reveal space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Questions we hear often.</h2>
          <p className="text-xl text-white/75">Something else on your mind? Ask it on the call.</p>
          <ButtonLink href={site.cta.href} variant="ghost">{site.cta.label}</ButtonLink>
        </div>
        <div className="space-y-3">
          {site.faqs.map((f, i) => (
            <details key={f.q} className="group rounded-3xl border border-line bg-navy transition open:border-brand-2/50 open:bg-navy-2">
              <summary className="flex cursor-pointer list-none items-center gap-5 p-6 sm:p-7">
                <span className="label text-glow">0{i + 1}</span>
                <span className="font-display grow text-xl font-semibold sm:text-2xl">{f.q}</span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-xl transition group-open:rotate-45 group-open:border-brand-2 group-open:bg-brand" aria-hidden>+</span>
              </summary>
              <p className="px-6 pb-7 text-lg text-white/80 sm:pl-[4.75rem]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const c = site.contact;
  const d = site.discovery;
  return (
    <section id="contact" className="scroll-mt-16 bg-[radial-gradient(circle_at_15%_20%,rgb(24_104_219/0.35),transparent_45%)] py-20 story:py-28">
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1.3fr]">
        {/* Left: why and what happens next. Sticky so it stays beside the form. */}
        <div className="space-y-10 lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-6">
            <Eyebrow>{d.eyebrow}</Eyebrow>
            <h2 className="font-display text-4xl leading-[0.95] font-semibold tracking-tight sm:text-6xl">
              {d.title[0]} <span className="text-brand-2">{d.title[1]}</span>
            </h2>
            <p className="text-xl text-white/80">{d.body}</p>
          </div>
          <ol className="space-y-5">
            {d.next.map((n, i) => (
              <li key={n.title} className="flex gap-4">
                <span className="font-display border-glow/60 text-glow grid size-10 shrink-0 place-items-center rounded-full border">{i + 1}</span>
                <span>
                  <span className="font-display block text-xl font-semibold">{n.title}</span>
                  <span className="text-lg text-white/70">{n.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="space-y-1 border-t border-line pt-6 text-lg text-white/85">
            <p className="label mb-2 text-white/55">Prefer to talk now?</p>
            {[
              { icon: "phone", href: `tel:${c.phone.replace(/\s/g, "")}`, label: c.phone },
              { icon: "mail", href: `mailto:${c.email}`, label: c.email },
            ].map((l) => (
              <a key={l.icon} href={l.href} className="flex items-center gap-3 py-1 hover:text-white">
                <span className="grid size-9 place-items-center rounded-full border border-line bg-white/5"><Icon name={l.icon as "phone"} className="size-4" /></span>
                {l.label}
              </a>
            ))}
            <p className="pt-1 pl-12 text-white/60">{c.location}</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="shell flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Lockup />
          <p className="text-white/60">AI automation · Connected systems · Better processes</p>
          <a href={site.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-block rounded-md pt-2 transition hover:opacity-80">
            {/* LinkedIn brand mark: blue square, white "in". */}
            <svg viewBox="0 0 24 24" className="size-8" aria-hidden>
              <rect width="24" height="24" rx="4" fill="#0A66C2" />
              <path fill="#fff" d="M7.1 9.4H4.6V19h2.5V9.4ZM5.85 5a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9ZM19.4 13.7c0-2.6-1.4-4.5-3.9-4.5-1.3 0-2.2.7-2.6 1.4V9.4h-2.4V19H13v-5c0-1.3.4-2.5 1.9-2.5s1.6 1.4 1.6 2.6V19h2.9v-5.3Z" />
            </svg>
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-white/75">
          {site.nav.map((n) => <a key={n.href} href={n.href} className="hover:text-white">{n.label}</a>)}
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </div>
      <p className="shell mt-10 text-white/50">© 2026 Hello Success × IT Together</p>
    </footer>
  );
}
