# Content plan, phase by phase

Scope: **content changes only**, from the CEO's feedback (`docs/ceo-feedback-summary.md`). Mobile design, booking and launch are separate plans.

Each phase ends with: `npx eslint src`, a search for dashes in visible copy, a look at 1440px and 390px, then a commit on master.

---

## Phase 1: Remove what isn't real ✅ done (local, not yet committed)

Decided: popup results become a non-numeric "What changes" line per service; the CRM partner chip **stays** until the CEO answers (1.4 skipped); the gap where Results was is fine until Phase 3. The "Results" nav link is removed until "Why us" exists.

| # | Change | Where |
|---|---|---|
| 1.1 | Remove the Results section: 4 headline stats, 3 case studies, 3 testimonials with Unsplash headshots | `site.ts` (`stats`, `caseStudies`, `testimonials`, `img` helper), `page.tsx` (`Results`, `CaseStudy`) |
| 1.2 | **Not in the CEO's doc:** every service popup shows a fake client result (Northwind, Harbour Health, Summit, Coastal Wholesale, Brightside, Redgum). Remove all six | `services.ts` (`example`), [ServiceCatalogue.tsx:141-142](../src/components/ServiceCatalogue.tsx#L141-L142) |
| 1.3 | Remove the "30+ years" / "thirty years" claim (3 places) | `site.ts` (`itTogether.text`, `itTogether.proof`, `stats`) |
| 1.4 | Remove the "Major CRM implementation partner" chip; it comes back if he names a real partner | `site.ts` |

## Phase 2: Swap in sourced research stats

| # | Change | Where |
|---|---|---|
| 2.1 | Problem cards become **Every 2 minutes**, **29%** and **23% never reply**, with a "Sources: …" line underneath | `site.problem.costs` plus a new `sources` field; one line in `Problem()` |
| 2.2 | Add an "Example" tag to the mock inbox | Text in `site.problem.inbox`, a small chip in [Inbox.tsx](../src/components/Inbox.tsx) |
| 2.3 | Outcome stats become **7×**, **80% by 2029** and **9 hours a week**, each with "What the research says" above it and a source credit | `services.ts` (`result` gets `source`), shown in both `OutcomeChapter` and `OutcomeCard` |
| 2.4 | Show the outcome "problem" line without quote marks or italics; it's our own line | [page.tsx:236](../src/app/page.tsx#L236) |

## Phase 3: New "Why work with us" and About

| # | Change | Where |
|---|---|---|
| 3.1 | New `site.whyUs`: heading, intro, 3 cards (One team · You see the plan · Measured against your numbers) and the founding client offer with its button. It takes the old Results slot, and the nav item "Results" becomes "Why us" | `site.ts`, new `WhyUs()` in `page.tsx`, reusing `Icon` / `ButtonLink` |
| 3.2 | Add About copy (Mina Azar, 20+ years) and fix the IT Together text to "20+ years of sales, operations and CX leadership, alongside IT Together's engineers" | `site.itTogether`, the `PoweredBy` band |

## Phase 4: Contact details and consistency

| # | Change | Where |
|---|---|---|
| 4.1 | Phone shows as 0478 062 165 and links to `tel:+61478062165`. A separate `phoneHref` field is needed, because the current code builds the link from the display text | `site.contact`, [page.tsx:473](../src/app/page.tsx#L473) |
| 4.2 | Email and LinkedIn stay as placeholders until he sends the real ones | — |
| 4.3 | The name line becomes "Hello Success, powered by IT Together" in the page title and footer © (the logo lockup stays as it is) | `site.name`, footer |
| 4.4 | "We reply within a day" becomes "within one business day" | `site.discovery.next` |
| 4.5 | FAQ cost answer uses the CEO's wording | `site.faqs` |

## Phase 5: One step model (Discover → Redesign → Build → Run)

- Rewrite `site.process` from 6 steps to 4. Each step gets fuller copy that absorbs the hero's Discover / Redesign / Automate text.
- This overlaps with the hero and section-trim design work, so do it last or together with the design phase.

---

## Corrections to the summary

- The site has no prices and no "fee at risk" anywhere.
- "Within a day" is in the discovery steps, not the FAQ.

## Decisions before starting

1. **Service popup examples (1.2):** remove the block entirely, or keep a "Typical result" line with no client name? Recommended: remove it.
2. **Why us vs About:** the CEO's Why us intro ("I spent 20+ years…", first person) and his About copy ("Mina brings 20+ years…", third person) say the same thing. Use both, or merge them into one?
3. **Timelines:** the FAQ's "4 to 6 weeks" and the engagement lengths in each service popup (2 weeks, 6 to 10 weeks and so on). Keep them until he confirms, or remove them now?
4. **Phase 5:** do it now as content only, or hold it for the design phase?
5. **Desktop hero:** keep the Discover / Redesign / Automate scroll slides, or show the first page only?
