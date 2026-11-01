import { site } from "@/content/site";
import { OrchestrationDiagram } from "./OrchestrationDiagram";
import { ScrollStory } from "./ScrollStory";
import { Eyebrow } from "./ui";

const { orchestration: o } = site;

/** Pinned scene: scattered systems merge into one layer, which then drives Grow, Serve and Run. */
export function Orchestration() {
  return (
    <ScrollStory id="orchestration" screens={4.5} className="overflow-x-clip border-y border-line bg-void">
      <div className="tech-grid absolute inset-0" aria-hidden />
      {/* Like the hero: copy on the left, a large scene filling the right of the pinned screen. */}
      <div className="shell relative z-10 flex items-center pt-24 pb-12 lg:motion-safe:h-full lg:motion-safe:pb-8">
        <div data-beats className="max-w-md space-y-14 lg:motion-safe:space-y-0">
          {o.beats.map((b, i) => (
            <div key={b.kicker} data-beat={i} className="space-y-5">
              <Eyebrow>{b.kicker}</Eyebrow>
              {i === 0 ? (
                <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">{b.heading}</h2>
              ) : (
                <h3 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">{b.heading}</h3>
              )}
              <p className="text-xl text-white/80">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-3xl px-5 pb-24 lg:motion-safe:absolute lg:motion-safe:inset-y-0 lg:motion-safe:right-0 lg:motion-safe:left-[40%] lg:motion-safe:flex lg:motion-safe:w-auto lg:motion-safe:max-w-none lg:motion-safe:items-center lg:motion-safe:justify-center lg:motion-safe:px-8 lg:motion-safe:pt-20 lg:motion-safe:pb-4">
        <div className="w-full lg:motion-safe:max-w-[calc((100svh-7rem)*1.2)]">
          <OrchestrationDiagram />
        </div>
      </div>
    </ScrollStory>
  );
}
