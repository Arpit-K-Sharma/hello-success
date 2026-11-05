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

## M2: Swipe cards at the reader's pace ✅ done

**Now:** outcome and service cards (`Stories`) auto-advance **every 2 seconds** while on screen. That's too fast to read a card.

**Decided:** no auto-advance. People swipe, tap the edges or use the dots. A small "Swipe" hint with the count ("1 of 6") shows that there's more.

## M3: Phone orchestration scene

**Now:** `PhoneOrchestration` pins for 3.5 screens; the diagram draws in and copy swaps through Connect, Orchestrate, Perform.

**Decided:** keep it pinned. It only moves when the reader scrolls, so it isn't auto-moving content.

## M4: Reduced motion check ✅ done

Already designed in (ScrollStory doesn't pin, Stories don't move, 3D is still). Verify at 390px with reduced motion on after M1 to M3.

## M5: Duplicate desktop and phone copies

- Sections built with `Split` render both designs; the hidden one is `display: none`, which screen readers skip.
- The two heroes each have an `h1`; the hidden one is `display: none`, so screen readers announce only one. Kept, since desktop and phone heroes now differ on purpose.
- Orchestration, outcomes and services keep two designs; their text comes from one content source.

## M6: Contrast (WCAG AA, 4.5:1) ✅ done

Measured every visible text element against its real background, at desktop and 390px. Raised the few that failed: mock inbox avatar colours and grey labels, the contact form's "missing" hints and placeholders, the mobile menu numbers. Everything now passes 4.5:1 (3:1 for large text).

## M7: Alt text ✅ done

Checked: every meaningful image (logos) has alt text, and decorative canvases are `aria-hidden`. Nothing to do.

---

## Not in this plan

- **Cutting to 8 sections / folding the 6 services into Grow, Serve, Run.** This changes desktop and phone structure, so it gets its own plan if we go ahead.
- **Booking form** (sending, confirmation, consent, privacy page) and **launch** tasks.

## Also done from the PDF

- One button label everywhere: "Book a discovery call" (the short "Book a call" and "Talk to us about…" are gone).
- Hero has one button (PDF: "Hero, with the headline and one button").
- Desktop hero slides say Build, not Automate, matching Process.
- Share image for LinkedIn and messaging apps (`app/opengraph-image.tsx`) plus Open Graph title and description.
