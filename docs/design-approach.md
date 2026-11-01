# Hello Success × IT Together: design approach

How the idea and the design came together, for the board review.

## 1. Where I started

The reference site we were given had strong ideas but was hard to buy from:

- **It spoke in abstractions.** Phrases like "orchestration layer" and "signals become context" sound impressive. A business owner still can't tell what we actually sell.
- **The services were hidden.** They were scattered across two pages, with no answer to "who is this for" or "what do I get".
- **There was no proof and no way to get in touch.** It had no results, no contact details, and its form only copied text to the clipboard.

So I set one rule for the new site: **a visitor should understand what we do, who it's for and what changes for them within one scroll.** Every design decision below serves that rule.

## 2. The story the page tells

The page is built as an argument, in the order a buyer thinks:

| Step | Section | The visitor thinks |
|---|---|---|
| 1 | **Hero** | "What is this?" AI automation and connected systems, in plain words. |
| 2 | **Problem** | "That's us." A normal Tuesday, as the notifications their team actually gets. |
| 3 | **Orchestration layer** | "How would that work?" One layer across the tools they already own. |
| 4 | **Grow / Serve / Run** | "What do I get?" Three business outcomes, each shown as a working flow. |
| 5 | **Services** | "What exactly can they do?" Six services, one at a time. |
| 6 | **Process** | "How do they work?" Process first, technology second. |
| 7 | **Results** | "Does it work?" Before and after numbers. |
| 8 | **Powered by IT Together** | "Can I trust them?" Thirty years of delivery behind a new name. |
| 9 | **FAQ and discovery call** | "What's the next step?" A short brief, not a sales form. |

## 3. Key design decisions

**Outcomes before services.** Buyers don't wake up wanting "systems integration". They want more revenue, happier customers or less admin. So the site leads with three outcomes, **Grow, Serve and Run**, and each has its own colour that follows it everywhere: the workflows, the service tags, the results and the contact form.

**Scroll as video ("focus method").** The key sections pin in place while you scroll, so the page plays like a video you control:

- In the hero, scattered tools pull together into one connected core.
- In each outcome, the workflow lights up step by step until the result appears.
- In services, six services orbit a central core. Each one stops at the front and opens to explain itself, then the ring turns to the next.

The point is focus: **one idea on screen at a time**, so nothing competes with the message.

**The orchestration layer, made concrete.** I kept the reference site's best idea and made it visible. The real platforms clients use (Salesforce, Xero, Microsoft 365 and so on) are grouped around one core labelled Observe · Decide · Act · Learn, with signals flowing into it.

**The problem, made real.** Instead of generic statistics alone, the problem section shows a day of notifications every business owner will recognise: the unanswered enquiry, the spreadsheet edited by four people, the PO waiting since Friday. It is the only light section on the page, so it stands out as the "pain" moment.

**IT Together as the trust anchor.** The new practice borrows credibility from the parent brand. The IT Together section uses the real logo and brand blue (`#1868db`, sampled from the logo), and the whole site's primary colour comes from it. The lockup reads "hello success × IT Together" everywhere.

**A discovery call people want to fill in.** The contact form works like a brief builder:

- The visitor picks what to improve from large outcome tiles, then answers two plain questions.
- A live "Your discovery brief" panel fills in as they type, so they can see we'll arrive prepared.

**Readability.** Text is sized to be read from a desk, with an 18px base and body copy at 20px or more. Headings use Space Grotesk, a technical but friendly typeface; body text uses DM Sans.

## 4. What came from the reference site, and what's new

| From the reference | How it appears now |
|---|---|
| Orchestration layer / connected core | Dedicated section with the real platforms and live signal lines |
| Connect → Orchestrate → Perform story | Hero scroll scene: Connect → Automate → Grow |
| Three engines (revenue, customer, operations) | Grow / Serve / Run chapters with live workflows |
| Process, Platform, Intelligence layers | Shown under every outcome |
| Six capability areas | Six services, each with who it's for, problems, deliverables and timeline |
| "Judgement makes it valuable", 30+ years | IT Together section and its equation strip |
| Delivery approach (Discover to Advance) | Process timeline that loops back to Discover |
| Brief builder | Discovery form with live brief preview |

New on this site: proof (stats, before and after results, testimonials), real contact details, a full detail view per service, and a mobile and reduced-motion version that keeps all content.

## 5. Not carried over yet (decide after review)

- **Interactive "automation lab".** On the reference site, visitors could switch between three example workflows. Our outcome chapters show the same flows on scroll; a click-through version could be added.
- **Six-layer "transformation stack".** This was the layered model from business intent up to measurable outcome. It's partly covered by the Process / Platform / AI rows; a full visual could be added to the orchestration section.
- **Outputs per engine.** The reference listed an outcome set for each engine, for example "Visibility · Consistency · Conversion · Forecasting".
- **Copyable brief.** The reference's form produced text to copy. Ours is ready to connect to email or CRM instead.

## 6. What's placeholder

Everything below is placeholder, chosen to show the layout:

- the stats
- the client names and results
- the testimonials and photos
- the email and phone number

Real figures, approved case studies and contact details replace them before launch. All copy lives in two files (`src/content/site.ts` and `src/content/services.ts`), so the board's wording changes are quick.



Content concept: the CEO's site described a strong idea in abstract terms. I kept every idea and rewrote it in the order a buyer thinks: problem, idea, outcome, services, how we work, proof, next step. Every section answers one question a business owner would ask, in their own words, and leads with what changes for them rather than with technology. Anything we can't yet back up (numbers, clients, guarantees) is a placeholder for the CEO to confirm.

Design concept: a dark, futuristic "technology control room" look that matches what we sell, connected intelligent systems. Scroll-driven scenes show things happening rather than describing them: emails piling up, systems merging into one core, services orbiting it. The only light section is the inbox, so the problem stands out as the moment of tension. IT Together's brand blue runs through everything, and each outcome keeps one colour everywhere (Grow cyan, Serve blue, Run violet), so visitors can follow a thread without reading every word.