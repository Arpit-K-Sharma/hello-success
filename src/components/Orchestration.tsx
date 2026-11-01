import { site } from "@/content/site";
import { OrchestrationDiagram } from "./OrchestrationDiagram";
import { ScrollStory } from "./ScrollStory";
import { Eyebrow } from "./ui";

const { orchestration: o } = site;

/** Pinned scene: scattered systems merge into one layer, which then drives Grow, Serve and Run. */
export function Orchestration() {
  return (
    <ScrollStory screens={4.5} className="overflow-x-clip border-y border-line bg-void">
      <div className="tech-grid absolute inset-0" aria-hidden />
      {/* Like the hero: copy on the left, a large scene filling the right of the pinned screen. */}
      <div className="shell relative z-10 flex items-center pt-20 pb-12 story:h-full story:pb-8">
        <div data-beats className="max-w-md space-y-10 story:space-y-0">
          {o.beats.map((b, i) => (
            <div key={b.kicker} data-beat={i} className={i > 0 ? "space-y-3 story:space-y-5" : "space-y-5"}>
              <Eyebrow>{b.kicker}</Eyebrow>
              {i === 0 ? (
                <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">{b.heading}</h2>
              ) : (
                <h3 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">{b.heading}</h3>
              )}
              <p className={`text-xl text-white/80 ${i > 0 ? "hidden story:block" : ""}`}>{b.body}</p>
            </div>
          ))}
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
