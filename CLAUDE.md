@AGENTS.md

# Hello Success × IT Together: project rules

Marketing site for **Hello Success × IT Together**, a new practice launched by IT Together that sells AI automation, connected systems and process improvement to businesses.

**Status:** board preview. Not public; `robots` is noindex.

## Stack
- **Framework:** Next.js 16 (App Router, Turbopack, `cacheComponents`) with React 19 and TypeScript. Next 16 differs from older versions: read `node_modules/next/dist/docs/` before using an unfamiliar API.
- **Styling:** Tailwind CSS v4, CSS-first config in `src/app/globals.css`. There is no `tailwind.config`.
- **Animation:** GSAP + ScrollTrigger via `@gsap/react` `useGSAP`. This is the only animation library; don't add Motion or Framer.
- **3D:** three.js through `@react-three/fiber`, client-only via `next/dynamic({ ssr: false })`.
- **Commands:** `npm run dev` · `npm run build` · `npx eslint src` · Docker: `docker compose up -d --build` (port 3001, or `PORT=8080 docker compose up -d`), `docker compose down` to stop (`compose.yaml` + `Dockerfile`, uses `output: "standalone"`)

## Structure
```
src/content/services.ts   outcomes (Grow/Serve/Save) + 6 services: all service copy
src/content/site.ts       nav, hero (what Hello Success is + Discover, Redesign, Automate), problem, orchestration, stats, case studies, IT Together, discovery, FAQs
src/app/page.tsx          single page; one function per section, in scroll order
src/app/globals.css       design tokens (@theme static), ScrollStory CSS, reveal animation
src/components/
  ui.tsx                  Lockup, Eyebrow, Icon, ButtonLink
  Orchestration.tsx       pinned scene: scattered systems converge on the core, which sends out Grow/Serve/Save
  OrchestrationDiagram.tsx  converge diagram (reference "business core" + 3D CoreScene); scroll sets --c/--l/--o
  Inbox.tsx               problem section: static Outlook-style inbox
  CoreScene.tsx           R3F space scene behind the services orbit (spins with scroll speed)
  ScrollStory.tsx         pinned scroll = video engine (mode "desk" | "phone") + useScrollProgress() + useMedia()
  phone/                  phone/tablet design: Stories (swipe cards), PhoneOrchestration
  HeroScene.tsx           R3F hero (procedural 3D, reads progress ref)
  FrameSequence.tsx       canvas image-sequence player
  HeroVisual.tsx          picks 3D or frames from site.hero.frames
  ServiceCatalogue.tsx    services orbit (desktop) + Stories (phone) + <dialog> focus mode
  ContactForm.tsx         discovery brief form with live preview (sends nothing yet)
  Header.tsx              nav links; a glowing underline slides to the section on screen (site.nav[].sections)
public/brand/             hs-logo-short-* (hs mark) and hs-logo-long-* (mark + wordmark) in colour / white / ink,
                          white is the main logo; vector rebuild of hs-logo.jpeg; hs-logo-long is proportioned
                          like itt-logo.png (mark = top 236/278, cap = 0.6 x mark) so equal heights align;
                          hello-success-mark-* / -wordmark-* are the retired ring logo;
                          itt-logo.png (IT Together full) and itt-mark.png (triangle only); originals in reference/original/assets
src/app/icon.svg          favicon = hs-logo-short-colour (blue; white would vanish on light tabs)
docs/                     site-audit.md (reference-site analysis), scroll-animation-guide.md
reference/original/       captured source of the original ChatGPT-built site (read-only)
```

## Content rules
- **Change copy in `src/content/*` only.** Components must not hardcode service or marketing text.
- **No on-page demo labels.** Stats, clients, quotes and contact details in `site.ts` are placeholders; the board was told verbally. Replace them before launch.
- **No dashes in visible copy.** No em dashes, en dashes or `--`. Write ranges as "4 to 6 weeks".
- **Logos:** the white `hs-logo-long` + IT Together full logo where there is room (header from 420px, footer); marks only where space is tight (IT Together triangle on small phones, `hs-logo-short` as favicon and services centre). On light sections use the `-ink` versions.
- **Never use real company logos as fake clients.** Fictional client names only.
- **Contact details are fictional.** The email uses the `.example` domain and the phone is in AU's reserved-for-fiction range (0491 570 xxx).
- **Spelling:** Australian English (optimise, organisation).

## Design tokens (`globals.css` → `@theme static`)
`static` is required. Outcome colours are referenced through inline `var(--color-${id})`, so Tailwind would otherwise tree-shake them out.

| Token | Value | Use |
|---|---|---|
| `void` | `#05070b` | page background (dark sections) |
| `navy` / `navy-2` | `#0a1220` / `#111c30` | raised dark surfaces, cards, dialog |
| `paper` | `#f4f6f8` | light "breather" sections |
| `ink` | `#0d1524` | text on light sections |
| `brand` | `#1868db` | IT Together blue (sampled from logo): primary buttons, links |
| `brand-2` | `#5b9bff` | hover / highlight blue |
| `glow` | `#8be8ff` | eyebrows, active indicators |
| `grow` / `serve` / `save` | `#5ee6ff` / `#5b9bff` / `#a596ff` | one accent per outcome, everywhere |
| `line` / `line-dark` | white 10% / ink 10% | borders on dark / light |

- **Fonts** (`next/font`, in `layout.tsx`):
  - `font-display` = Space Grotesk, for headings and the `.label` class (uppercase micro-labels, 0.8rem, 600)
  - `font-sans` = DM Sans, for body
  - Base size is 18px (`html { font-size: 112.5% }`). Body copy is `text-lg`/`text-xl`; nothing below `text-base`.
- **Layout:**
  - `.shell` = centred container, max 1280px, 1.25rem gutters.
  - Sections use `py-28`.
  - Headings use `text-4xl sm:text-6xl font-semibold tracking-tight`.
- **Rhythm:** dark (`void`/`navy`) sections, with `bg-paper text-ink` used only for Problem (the deliberate "pain" contrast).
- **Radii:** cards `rounded-3xl`, chips and buttons `rounded-full`, icon tiles `rounded-2xl`.
- **Accent per element:** set `style={{"--accent": "var(--color-grow)"}}`, then use `text-(color:--accent)` / `bg-(--accent)`. Text and border need the `color:` type hint.

## Components and patterns
- **Buttons:** `ButtonLink` (primary = brand fill with glow, ghost = outline). Don't create new button styles.
- **Icons:** `Icon` in `ui.tsx` is a small inline-SVG set (24px grid, 1.6 stroke, round caps). Add new icons there with the same stroke style; no icon library.
- **Reveal on scroll:** add the `reveal` class (native CSS scroll-driven animation; no JS).
- **Scroll scenes:** wrap in `<ScrollStory screens={n} hold={0.25}>` and mark children with `data-beat`, `data-scrub-step`, `data-scrub-bar` (vertical), `data-scrub-bar-x` + `data-scrub-head` (horizontal) and `data-dot`. Pinned content must clear the sticky header (`story:pt-24`+). The `story:` variant (globals.css) is the pinned-scene breakpoint: 1200px+ with motion allowed.
- **Pre-filled booking:** any link to `#start-grow` / `#start-serve` / `#start-save` / `#start-unsure` scrolls to the form with that focus chosen.
- **Scroll-driven CSS needs `overflow-clip`, not `overflow-hidden`,** on ancestors: `hidden` makes a scroll container and freezes `view()` timelines.
- **Tech theme helpers:** `.tech-grid` (faded grid backdrop) and `.hud` (corner brackets) in `globals.css`. Visuals read `useScrollProgress()` (a ref; never put it in state). Full guide: `docs/scroll-animation-guide.md`.
- **Two designs, one content source:** desktop = the `story:` variant (1200px+ with motion); everything else gets the phone/tablet design. Big sections render both via `Split` in `page.tsx` (`hidden story:block` / `story:hidden`); the anchor `id` sits on the shared wrapper, never inside. Phone versions live in `components/phone/` or next to the desktop one; copy still comes from `src/content/*`.
- **Phone motion:** Hero and Orchestration pin with `<ScrollStory mode="phone">`; outcomes, services and case studies are `<Stories>` (auto-advancing swipe cards). 3D mounts only for the design on screen (`useMedia(SCRUB_QUERY)`).
- **Query sync:** `SCRUB_QUERY` / `PHONE_QUERY` in `ScrollStory.tsx` must match the `[data-story="desk"]` / `[data-story="phone"]` media queries in `globals.css`.
- **Dev server gotcha:** Turbopack sometimes stops seeing `globals.css` edits. If new CSS rules don't appear, stop the dev server, delete `.next/dev`, restart.
- **Focus mode:** use a native `<dialog>` with `showModal()`. It gives free focus-trapping and Esc handling.

## Figma → code (MCP) workflow
1. Run `get_design_context` on the node, then `get_screenshot` for visual reference.
2. Treat the MCP output (React + Tailwind) as a **reference only**:
   - Map Figma colours to the tokens above, never raw hex.
   - Map type to `font-display` / `font-sans` / `.label`.
   - Map spacing to Tailwind's scale.
3. Reuse `ui.tsx` components and `ScrollStory` before writing anything new.
4. Put any new copy in `src/content/*`, not in JSX.
5. Assets:
   - If the Figma MCP returns a localhost image/SVG source, use it directly. Don't add icon packages or placeholders.
   - Store permanent images in `public/` (brand assets in `public/brand/`).
   - Remote demo photos are allowed only from `images.unsplash.com` (configured in `next.config.ts`).
6. Validate the result at 1440px and 390px, and with reduced motion enabled.

## Accessibility baseline
- Keep heading order: one `h1` in the hero, then `h2` per section.
- Decorative canvases need `aria-hidden`; every interactive element needs a visible focus state.
- Everything must work and be readable with `prefers-reduced-motion: reduce` and below 1200px.
