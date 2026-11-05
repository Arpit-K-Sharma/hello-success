import { site } from "@/content/site";
import { OrchestrationDiagram } from "./OrchestrationDiagram";
import { ScrollStory } from "./ScrollStory";
import { Eyebrow } from "./ui";

const { orchestration: o } = site;

/**
 * Our process, as one pinned scene: the intro, then Discover, Redesign, Build, Run.
 * The diagram plays each step; the tracker under the copy shows where you are.
 */
export function Orchestration() {
  return (
    <ScrollStory screens={5.5} className="overflow-x-clip border-y border-line bg-void">
      <div className="tech-grid absolute inset-0" aria-hidden />
      {/* Like the hero: copy on the left, a large scene filling the right of the pinned screen. */}
      <div className="shell relative z-10 flex flex-col justify-center pt-20 pb-12 story:h-full story:pt-24 story:pb-10">
        <div data-beats className="max-w-md space-y-10 story:space-y-0">
          <div data-beat={0} className="space-y-5">
            <Eyebrow>{o.intro.eyebrow}</Eyebrow>
            <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">{o.intro.title}</h2>
            <p className="text-xl text-white/80">{o.intro.body}</p>
          </div>
          {o.steps.map((s, i) => (
            <div key={s.step} data-beat={i + 1} className="space-y-3 story:space-y-5">
              <Eyebrow>0{i + 1} · {s.phase}</Eyebrow>
              <h3 className="font-display text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">{s.step}</h3>
              <p className="text-xl text-white/80">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Step tracker: Consulting (Discover, Redesign) then Technology (Build, Run). */}
        <div className="mt-12 hidden max-w-md story:block" aria-hidden>
          <ol className="grid grid-cols-4 gap-3">
            {o.steps.map((s, i) => (
              <li key={s.step} className="space-y-2">
                <p className={`label ${i % 2 ? "invisible" : ""} ${s.phase === "Consulting" ? "text-glow" : "text-brand-2"}`}>{s.phase}</p>
                <p className="font-display text-lg font-semibold">{s.step}</p>
                <span data-dot={i + 1} className="block h-1.5 w-1.5 rounded-full bg-white/25 transition-all" />
              </li>
            ))}
          </ol>
          <span className="relative mt-4 block h-0.5 rounded-full bg-white/10">
            <span data-scrub-bar-x className="from-glow to-brand-2 absolute inset-0 origin-left rounded-full bg-linear-to-r shadow-[0_0_16px_1px] shadow-glow/60" />
          </span>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-3xl px-5 pb-24 story:absolute story:inset-y-0 story:right-0 story:left-[40%] story:flex story:w-auto story:max-w-none story:items-center story:justify-center story:px-8 story:pt-20 story:pb-4">
        <div className="w-full story:max-w-[calc((100svh-7rem)*1.2)]">
          <OrchestrationDiagram />
        </div>
      </div>
    </ScrollStory>
  );
}
