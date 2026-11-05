import { site } from "@/content/site";

const { inbox } = site.problem;
const N = inbox.emails.length;

/** Outlook-style inbox: a static snapshot of a normal Tuesday. */
export function Inbox() {
  return (
    <div className="inbox overflow-hidden rounded-xl border border-black/10 bg-white text-ink shadow-2xl shadow-ink/25">
      {/* App bar */}
      <div className="flex items-center gap-3 bg-[#0f6cbd] px-3 py-2 text-white">
        <svg viewBox="0 0 16 16" className="size-4 fill-white/90" aria-hidden>
          {[0, 6, 12].flatMap((x) => [0, 6, 12].map((y) => <rect key={`${x}${y}`} x={x} y={y} width="3.5" height="3.5" rx="0.6" />))}
        </svg>
        <span className="font-semibold">Mail</span>
        <span className="rounded-sm bg-white px-1.5 text-xs font-semibold tracking-wide text-[#0f6cbd] uppercase">{inbox.tag}</span>
        <span className="mx-auto hidden w-[45%] items-center gap-2 rounded bg-white/90 px-3 py-1 text-sm text-ink/60 sm:flex">
          <svg viewBox="0 0 16 16" className="size-3.5 fill-none stroke-ink/60" strokeWidth="1.6" aria-hidden><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3.5 3.5" /></svg>
          Search
        </span>
        <span className="ml-auto grid size-7 place-items-center rounded-full bg-white/25 text-xs font-semibold sm:ml-0">JS</span>
      </div>
      {/* Ribbon */}
      <div className="flex items-center gap-4 border-b border-black/10 bg-[#f5f5f5] px-3 py-2 text-sm text-ink/75">
        <span className="rounded bg-[#0f6cbd] px-3 py-1 font-semibold text-white">New mail</span>
        <span className="hidden sm:inline">Delete</span>
        <span className="hidden sm:inline">Archive</span>
        <span className="hidden sm:inline">Reply all</span>
        <span>Flag</span>
      </div>

      <div className="grid sm:grid-cols-[10.5rem_1fr]">
        {/* Folder pane */}
        <ul className="hidden border-r border-black/10 bg-[#fafafa] py-2 text-[0.95rem] sm:block">
          <li className="px-4 pt-1 pb-2 text-xs font-semibold text-ink/50">Favourites</li>
          <li className="flex items-center justify-between border-l-2 border-[#0f6cbd] bg-[#e6eef8] px-4 py-1.5 font-semibold">
            Inbox <span className="text-[#0f6cbd]">{inbox.unreadBase + N}</span>
          </li>
          {inbox.folders.map((f) => (
            <li key={f} className="px-4 py-1.5 text-ink/75">{f}</li>
          ))}
        </ul>

        <div className="min-w-0">
          <div className="flex items-end gap-5 border-b border-black/10 px-4 pt-2 text-[0.95rem]">
            <span className="border-b-2 border-[#0f6cbd] pb-1.5 font-semibold">Focused</span>
            <span className="pb-1.5 text-ink/55">Other</span>
            <span className="ml-auto pb-1.5 text-ink/55 sm:hidden"><span>{inbox.unreadBase + N}</span> unread</span>
          </div>
          <ul>
            {inbox.emails.map((m, i) => {
              return (
                <li key={m.subject} className={i > 3 ? "hidden story:block" : undefined}>
                  <div>
                    <div className="relative flex gap-3 border-b border-black/[0.07] py-2.5 pr-4 pl-4">
                      <span className="absolute inset-y-0 left-0 w-[3px] bg-[#0f6cbd]" aria-hidden />
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-white" style={{ background: m.color }}>
                        {m.from.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                      <span className="min-w-0 grow leading-snug">
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="truncate font-semibold">{m.from}</span>
                          <span className="shrink-0 text-sm font-semibold text-[#0f6cbd]">{m.time}</span>
                        </span>
                        <span className="flex items-center justify-between gap-3">
                          <span className="truncate font-semibold text-[#0f6cbd]">{m.subject}</span>
                          {m.urgent && <span className="shrink-0 text-red-600" title="High importance">!</span>}
                        </span>
                        <span className="flex items-center justify-between gap-3 text-[0.95rem]">
                          <span className="truncate text-ink/60">{m.preview}</span>
                          <span className={`shrink-0 rounded-sm px-1.5 text-xs font-semibold ${m.urgent ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`}>{m.tag}</span>
                        </span>
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="flex items-center gap-3 bg-red-50 px-4 py-3 font-medium text-red-700">
            <span className="size-2.5 animate-pulse rounded-full bg-red-500" />
            {inbox.alert}
          </p>
        </div>
      </div>
    </div>
  );
}
