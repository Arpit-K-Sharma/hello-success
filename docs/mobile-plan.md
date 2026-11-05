# Mobile design plan (phone and tablet, below 1200px)

Scope: section 4 "Design and layout" of `docs/ceo-feedback-summary.md`, for the phone/tablet design. The content plan (`docs/content-plan.md`) is done.

Each phase ends with: `npx eslint src`, a look at 390px and 768px, the same with reduced motion on, then a commit on master.

---

## M1: Static phone hero ✅ done

**Now:** `PhoneHero` pins for 3.5 screens. The copy swaps from the intro through Discover, Redesign, Automate slides, with the 3D converging behind it.

**Done:** one screen, no pinning.
- Shows only the first page: eyebrow, headline, intro, buttons.
- The 3D shows its end state (core formed, rings on) and keeps spinning behind the copy, with the glow kept. Reduced motion: still.
- The Discover / Redesign / Build / Run detail lives in Process, and the step text shows on phones too.
- The desktop hero keeps its scroll animation and slides (decided), so the two heroes stay separate components.

## M2: Swipe cards at the reader's pace

**Now:** outcome and service cards (`Stories`) auto-advance **every 2 seconds** while on screen. That's too fast to read a card.

**Decided:** no auto-advance. People swipe, tap the edges or use the dots. A small "Swipe" hint with the count ("1 of 6") shows that there's more.

## M3: Phone orchestration scene

**Now:** `PhoneOrchestration` pins for 3.5 screens; the diagram draws in and copy swaps through Connect, Orchestrate, Perform.

**Decided:** keep it pinned. It only moves when the reader scrolls, so it isn't auto-moving content.

## M4: Reduced motion check

Already designed in (ScrollStory doesn't pin, Stories don't move, 3D is still). Verify at 390px with reduced motion on after M1 to M3.

## M5: Duplicate desktop and phone copies

- Sections built with `Split` render both designs; the hidden one is `display: none`, which screen readers skip.
- The two heroes each have an `h1`; the hidden one is `display: none`, so screen readers announce only one. Kept, since desktop and phone heroes now differ on purpose.
- Orchestration, outcomes and services keep two designs; their text comes from one content source.

## M6: Contrast (WCAG AA, 4.5:1)

Measure every text colour used on each background (e.g. `text-white/55` sources, `text-white/60` labels, `text-ink/60` on paper) and raise any that fall below 4.5:1. Applies to desktop too.

## M7: Alt text

Checked: every meaningful image (logos) has alt text, and decorative canvases are `aria-hidden`. Nothing to do.

---

## Not in this plan

- **Cutting to 8 sections / folding the 6 services into Grow, Serve, Run.** This changes desktop and phone structure, so it gets its own plan if we go ahead.
- **Booking form** (sending, confirmation, consent, privacy page) and **launch** tasks.
