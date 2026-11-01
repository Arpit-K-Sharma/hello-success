# Site Audit — Hello Success + IT Together (reference site)

- **Source:** https://hello-success-it-together.mina-azar.chatgpt.site/
- **Captured:** 2026-10-31. A full copy of the source is saved in `reference/original/` (`index.html`, `capabilities.html`, `styles.css`, `app.js`, `assets/favicon.svg`).
- **Purpose:** an exact record of what the current site says and how it is built, plus what to improve in the rebuild for **Hello Success, powered by IT Together**.

> The visual-flow notes come from the HTML and CSS, not from screenshots, because the browser extension wasn't connected. Check them against the live site before finalising the designs.

---

## 1. What the business sells, in plain English

The site sells **business improvement delivered through technology** to businesses. The order of work is:

1. **Fix the process** (sales, customer journey, operations).
2. **Enhance the systems** behind it (CRM, ERP, service, data, cloud).
3. **Connect automation and AI** across those systems, with humans kept in control of judgement and exceptions.

It's framed around **three outcomes**: Revenue growth, Customer experience, and Operational performance. The site calls these "Grow · Serve · Run".

The six service lines (from capabilities.html, "Technology delivery fabric"):

| # | Service | What it covers |
|---|---------|----------------|
| 01 | CRM + revenue platforms | Consulting, implementation, adoption, data, workflows, commercial reporting |
| 02 | Intelligent automation + agents | Rules, AI agents, decision support, content intelligence, human-in-the-loop |
| 03 | Process automation + RPA | Workflow, approvals, repetitive tasks, data movement, exception handling |
| 04 | ERP + systems integration | APIs, middleware, custom software, information flow |
| 05 | Cloud + digital platforms | Cloud foundations, customer platforms, digital experiences |
| 06 | Data + security | Trusted data, reporting, access, resilience, security |

The site's claims about the business:
- 30+ years of experience.
- IT-qualified delivery.
- "Major CRM implementation partner". The partner is never named.
- "Thousands of connection points".
- Cross-industry work and a professional network.

**Messaging gap:** you describe the offer as *AI automation for businesses*. The site frames it as abstract *business transformation*, and "AI automation" in buyer terms is almost never stated. Words like "orchestration layer", "signals" and "context" carry most of the copy.

---

## 2. Sitemap

```
/index.html            Home (narrative + proof of concept)
/capabilities.html     "Transformation systems" (services in depth + brief builder)
```

The header nav is the same on both pages:
- **Home**
- **Transformation systems**
- **Connectivity** (`index.html#connected`)
- **CTA:** "Map your transformation ↗", which goes to `capabilities.html#start`

In-page anchors:
- **Home:** `#system-motion`, `#engines`, `#connected`, `#approach`
- **Capabilities:** `#automation-lab`, `#sales`, `#customer`, `#operations`, `#technology`, `#approach`, `#start`

Head metadata (home):
- **Title:** "Hello Success + IT Together | Connected Business Transformation"
- **Meta description:** "Improve revenue, customer experience and operations through process redesign, connected systems, intelligent automation and thousands of global connection points."
- **OG description:** "Turn your business into a connected, intelligent system—from strategy and process to automation, AI and delivery."
- **theme-color:** `#05070b`. The favicon is an SVG arrow.

---

## 3. Content inventory: Home (`index.html`)

The **Bg** label in each heading is the section background: dark (D) or light (L).

### 3.1 Hero, `.network-hero` (D)
- **Eyebrow tags:** CRM, ERP, DATA, AI, CLOUD, COMMERCE
- **Kicker:** "Revenue growth · customer experience · operations"
- **H1:** "Improve revenue. / Elevate customer experience. / *Make operations work better.*"
- **Body:** "We redesign the process, enhance the systems behind it, and connect automation and intelligence to improve revenue, customer experience and operational performance."
- **Buttons:**
  - "See the system in motion ↓" → `#system-motion`
  - "Explore the transformation stack ↗" → capabilities
- **Visual:** an animated canvas network. It shows 78 nodes (38 on mobile) with three glowing hubs labelled REVENUE, CUSTOMER and OPERATIONS, and it reacts to the mouse.
- **"Core console" panel:**
  - Labels: LIVE SYSTEM VIEW · CONNECTED · CONNECTED BUSINESS CORE · INTELLIGENCE ACTIVE
  - Status lines: "Context synchronised", "Systems listening", "Human oversight active"
  - Outcome nodes: Revenue (Growth + conversion), Customer (Experience + loyalty), Operations (Process + performance)
- **Proof rail along the bottom:** "30+" years · "1000s" connection points · "Revenue + customer + operations" · "Process improvement + system enhancement"
- **Caption:** "One connected operating system for growth"

### 3.2 Capability rail, `.capability-rail`
A ticker strip that reads CRM · DATA · ERP · WEB · CLOUD · VOICE · FINANCE · SERVICE · AI.

### 3.3 System in motion, `#system-motion` (D)
This is a sticky scroll-driven section. Scrolling moves through three phases: the diagram changes and the active story swaps, with phase dots. Below 980px it is static and shows phase 3 only.

| Phase | Eyebrow | Heading | Body |
|---|---|---|---|
| 1 | 01 / CONNECT | Stop adding tools. / Start connecting the business. | Bring the platforms, data and workflows already shaping the business into one coordinated system. |
| 2 | 02 / ORCHESTRATE | Signals become context. / Context becomes action. | Automation, rules and intelligence route work across systems while people stay in control of judgement and exceptions. |
| 3 | 03 / PERFORM | Three business priorities. / One connected technology strategy. | Revenue grows, customer experience improves and operations perform better - each supported by stronger processes and enhanced systems. |

The diagram shows scattered platform labels converging on a "CONNECTED BUSINESS CORE" (OBSERVE · DECIDE · ACT · LEARN), which then feeds three result nodes.

### 3.4 Three engines, `#engines` (L)
- **Heading:** "Improve the process. / Enhance the system behind it."
- **Body:** "We improve the process first, enhance the systems behind it, then connect automation and intelligence to create stronger revenue, customer and operational performance."

Each of the three cards has an eyebrow, an H3, a body, a 4-step flow, three layer tags (Process / Platform / Intelligence) and a CTA.

| Card | H3 | Flow | Process / Platform / Intelligence | CTA |
|---|---|---|---|---|
| 01 GROW — Revenue growth | See every opportunity. / Act while the moment is live. | Demand signal → Enrich + score → Next action → Forecast insight | Qualification + ownership / CRM + connected data / Intent + next-best action | Explore the revenue engine → `#sales` |
| 02 SERVE — Customer experience | Every touchpoint informed / by the last. | Customer signal → Context assembled → Route + respond → Journey learns | Journey + service promise / CRM + service + portals / Sentiment + proactive action | Explore the experience engine → `#customer` |
| 03 RUN — Process + system improvement | Improve the process. / Enhance the system. Automate the flow. | Process event → Rules + AI → Workflow acts → Exception surfaced | Flow + standards + control / ERP + documents + work / RPA + agents + exceptions | Explore the operations engine → `#operations` |

Card bodies:
1. "Improve lead generation, sales process, CRM, communications, quoting and reporting as one revenue system built for stronger visibility, conversion and growth."
2. "Improve the customer journey and connect context across web, service, communications, billing and feedback so every interaction is faster, more relevant and consistent."
3. "Simplify operational processes, enhance the systems behind them and automate repeatable work while keeping people in control of decisions and exceptions."

### 3.5 Connectivity, `#connected` (D)
- **Visual:** an animated "digital globe" with link arcs.
  - Labels: GLOBAL PLATFORM ECOSYSTEM · DATA FLOW: CONNECTED
  - Centre: "ONE ORCHESTRATION LAYER"
  - Platform tags: CRM + REVENUE · ERP + FINANCE · AI + AUTOMATION · DATA + ANALYTICS · SERVICE + EXPERIENCE · CLOUD + SECURITY
  - Caption: "Connected locally. Extensible globally."
- **Big stat:** "1000s"
- **Heading:** "One business moving as one."
- **Paragraph 1:** "Modern businesses run across CRM, ERP, marketing, service, finance, communications, cloud platforms, data and AI. The opportunity is connecting the right systems so information moves, decisions happen and work continues without unnecessary friction."
- **Paragraph 2:** "Our integration capability reaches across thousands of available connection points in the global technology ecosystem—creating one orchestration layer around the way your business needs to operate."
- **Tags:** Intelligence layer active · Human oversight built in · Designed to keep evolving

### 3.6 Intelligence in motion, `.intelligence-section` (D, navy)
- **Heading:** "Signals in. / Better actions out."
- **Body:** "Illustrative connected workflows show how integrations, automation, AI and human decisions can work as one operating flow."
- **Animated signal rows:**
  - **REVENUE SIGNAL:** Lead captured → Enriched → Priority assessed → Owner alerted → Next action ready
  - **CUSTOMER SIGNAL:** Request received → History assembled → Sentiment observed → Service routed → Follow-up orchestrated
  - **PROCESS SIGNAL:** Document received → Data extracted → Rules applied → Systems updated → Exception surfaced
- **Footnote:** "Illustrative connected workflows. Every implementation is designed around the client's systems, controls and operating model."

### 3.7 Judgement, `.judgement-section` (L)
- **Stat:** "30+" years of business and technology experience. Tagline: "Intelligence guided by experience".
- **Heading:** "Technology moves fast. / Judgement makes it valuable."
- **Body:** "We use AI where it creates advantage, but we do not mistake a prompt for a transformation strategy. Our recommendations draw on decades of experience, major CRM implementation partnership, IT-qualified specialists, cross-industry knowledge and a professional network that extends our capability when specialist expertise is needed."
- **Equation:** BUSINESS KNOWLEDGE + DELIVERY EXPERIENCE + GLOBAL CONNECTION + INTELLIGENCE

### 3.8 Continuous transformation, `#approach`
- **Heading:** "Build the advantage. / Then keep advancing it."
- **Body:** "We stay connected from the first business question through delivery, automation, learning and the next valuable initiative."
- **Steps:**
  - 01 Discover: find the real constraint and opportunity
  - 02 Redesign: improve the process, journey or model
  - 03 Connect: unify platforms, data and context
  - 04 Automate: move repeatable work intelligently
  - 05 Learn: observe outcomes and refine the system
  - 06 Advance: move into the next transformation
- **Strip:** SIGNAL → CONTEXT → DECISION → ACTION → RESULT

### 3.9 Final CTA, `.final-cta` (D, blue glow)
- **Eyebrow:** "Start with the business problem"
- **Heading:** "Map your next / transformation."
- **Body:** "Bring us the revenue opportunity, customer friction or operational process that needs improvement. We will redesign the process and enhance, connect or automate the technology behind the result."
- **Button:** "Build your transformation brief ↗" → `capabilities.html#start`

### 3.10 Footer (D)
- **Lockup:** "hello success × IT together"
- **Tagline:** "Business transformation · Connected platforms · Intelligent automation"
- **Links:** Home · Transformation systems · Connectivity
- **Legal:** "© Hello Success + IT Together"
- **Missing:** no contact details, no socials, no privacy or terms pages.

---

## 4. Content inventory: Capabilities (`capabilities.html`)

### 4.1 Hero, `.cap-hero` (D)
- **Kicker:** "Business improvement, delivered through technology"
- **H1:** "Improve revenue, customer experience and operational performance."
- **Body:** "We improve revenue, customer experience and operational processes, then enhance the platforms, integrations, automation and intelligence that turn those improvements into lasting performance."
- **CTA:** "Watch intelligence move ↓" → `#automation-lab`
- **Visual:** a "CONNECTED TRANSFORMATION STACK — LIVE MODEL" with six layers that respond to hover:
  - 06 Measurable outcome (Growth · loyalty · scale)
  - 05 Intelligence layer (Observe · decide · learn)
  - 04 Automation layer (Rules · RPA · agents · orchestration)
  - 03 Connected platforms (CRM · ERP · service · data · cloud)
  - 02 Process design (Flow · ownership · standards · controls)
  - 01 Business intent (Grow · serve · run)
- **Proof badges:** 30+ YEARS EXPERIENCE · IT-QUALIFIED DELIVERY · MAJOR CRM IMPLEMENTATION PARTNER · THOUSANDS OF CONNECTION POINTS
- **Section nav pills:** Automation lab · Revenue · Customer · Operations · Technology · Delivery. This row scrolls sideways on mobile.

### 4.2 Automation lab, `#automation-lab` (L)
- **Eyebrow:** "Signal → decide → act → learn"
- **Heading:** "Intelligence is useful / when it moves the work."
- **Body:** "Explore illustrative workflows that combine integrations, business rules, automation, AI and human decisions. The system changes; the principle stays the same: context reaches the right action at the right time."

There are three accessible tabs (arrow, Home and End keys work). Each tab rewrites a 5-step flow, labelled OBSERVE → UNDERSTAND → DECIDE → ACT → LEARN:

| Tab | Status | Steps (title — copy) | Output |
|---|---|---|---|
| 01 Revenue intelligence | REVENUE SIGNAL DETECTED | New enquiry — Demand enters from a connected channel. · Enrich + score — Context and intent create priority. · Assign + personalise — Rules and intelligence choose the path. · Follow up — The right action reaches the right owner. · Update forecast — The outcome improves the next decision. | Every demand signal becomes a visible next action. |
| 02 Customer intelligence | CUSTOMER SIGNAL DETECTED | Customer signal — A request or behaviour creates a signal. · Identify context — History and journey context assemble. · Choose next action — Rules and intelligence select the path. · Respond or route — Service acts or a person takes control. · Learn from outcome — The outcome improves the next journey. | Every interaction continues from a connected customer context. |
| 03 Operational intelligence | PROCESS SIGNAL DETECTED | Process event — A document, task or system event begins the flow. · Validate data — Data is checked, enriched and prepared. · Apply rules + AI — Logic and intelligence decide what can move. · Trigger workflow — Systems update and repeatable work completes. · Report exceptions — People see the decisions that need attention. | Repeatable work moves automatically while exceptions stay visible. |

**Footnote:** "Illustrative workflow only. Each solution is scoped around the client's processes, platforms, data, controls and governance."

### 4.3–4.5 Deep engines, `#sales` `#customer` `#operations` (D)
Each engine has the same structure:
- an eyebrow, H2 and H3, and an intro
- a 7-step route
- three columns: Process / Platform / Intelligence
- a row of four outputs

| | Revenue (01 / GROW) | Customer (02 / SERVE) | Operations (03 / RUN) |
|---|---|---|---|
| H2 | Intelligent revenue engine | Connected experience engine | Operational process + system improvement |
| H3 | Turn every signal into the next best sales action. | Make every interaction part of one intelligent journey. | Improve the process. Enhance the system. Automate the flow. |
| Intro | Market-leading sales performance comes from a system that can see demand, prioritise opportunity and help people act at the right moment. | Market-leading customer experience feels connected because the business has context—and can act on it consistently across every touchpoint. | Strong operations simplify the work, enhance the systems behind it and automate repeatable activity - without losing control of decisions and exceptions. |
| Route | Demand signals → Lead capture → Enrichment → Scoring → CRM → Next action → Forecast | Touchpoints → Unified context → Journey decision → Service → Follow-up → Feedback → Retention | Business event → Validate data → Rules + AI → Orchestrate → Human exception → Update systems → Insight |
| Process | *Clarity creates consistency.* Qualification, ownership, follow-up, stages and next actions designed around how the team wins. | *The journey has an owner.* Moments that matter, service promises, escalation and follow-through designed end to end. | *Simplify before automating.* Clear workflows, standards, ownership and controls remove friction from the way work moves. |
| Platform | *CRM becomes the commercial core.* Digital channels, communications, quoting, finance and reporting connected around one revenue view. | *Every channel shares context.* CRM, service, portals, communications, billing and feedback connected around the customer. | *Systems coordinate the work.* ERP, CRM, documents, payments, work management and reporting connected into one flow. |
| Intelligence | *Attention goes where it matters.* Intent signals, lead priority, stalled opportunity detection, next-best actions and forecasting insight. | *Experience adapts in motion.* Sentiment, context assembly, intelligent routing, proactive service and personalised follow-up. | *Automation knows when to ask.* RPA, document intelligence, AI agents, exception detection and automated orchestration. |
| Outputs | Visibility · Consistency · Conversion · Forecasting | Continuity · Relevance · Speed · Retention | Efficiency · Control · Scalability · Insight |

### 4.6 Technology fabric, `#technology` (D)
- **Heading:** "The capability to transform. / The depth to make it real."
- **Body:** "IT-qualified people, cross-industry delivery and a broad technology capability turn the roadmap into a working business system."
- **Cards:** the six service cards from §1. Each card has a "core" label: Commercial · Intelligence · Flow · Operating · Digital · Trust.
- **Strip:** "THOUSANDS OF AVAILABLE CONNECTION POINTS — CRM · ERP · FINANCE · SERVICE · COMMERCE · COMMUNICATIONS · DATA · AI"

### 4.7 Delivery approach, `#approach` (L)
- **Heading:** "One team. One thread of accountability. / Continuous business advantage."
- **Body:** "The business case stays visible through every design choice, build decision and automation—then feeds the next improvement."
- **Steps:**
  - 01 Discover: goals, constraints, customers, people, processes, data, systems
  - 02 Redesign: the improved process, journey or model before selecting the solution
  - 03 Architect: platforms, integrations, data, automation, controls, roadmap
  - 04 Deliver: configure, build, connect, migrate, test, embed
  - 05 Automate: move repeatable activity and surface the exceptions that matter
  - 06 Advance: measure, improve, prioritise the next initiative

### 4.8 Brief builder, `#start` (D)
- **Heading:** "Bring the constraint. / We will map the connected solution."
- **Body:** "You do not need a finished brief or technology shortlist. Start with the revenue opportunity, customer friction or operational process that needs improvement."
- **Strip:** BUSINESS PROBLEM → CONNECTED SYSTEM → MEASURABLE RESULT
- **Form fields:**
  - **Focus** (select): Revenue growth / Customer experience / Operational process improvement / System enhancement and automation / Several areas are connected
  - "What is happening in the business?"
  - "What would a better result look like?"
- **Submit:** "Create my transformation starter →"
- **What submit does:** it generates text in the browser only, then offers **Copy brief**, which copies to the clipboard. **Nothing is sent anywhere.** The output template is:
  ```
  Hello Success + IT Together transformation starter
  Primary opportunity: {focus}
  What is happening now: {challenge}
  What a better result would look like: {outcome}
  I would like to explore the process improvement, connected platforms, automation and intelligence needed to deliver this outcome.
  ```
- **Helper text:** "This creates a short brief you can copy and share with your Hello Success or IT Together contact."

---

## 5. Design system as built

### 5.1 Stack
- Static **HTML + one CSS file (85 KB) + one vanilla JS file (17 KB)**.
- No framework, no build step, no images except an SVG favicon.
- All visuals are CSS, inline SVG or `<canvas>`.

### 5.2 Effective tokens
`styles.css` stacks three generations of `:root` (lines 1, 284 and 514). The **last one wins**, and `theme-color: #05070b` confirms it.

```css
--void:   #05070b;   /* page dark */
--navy:   #0a101a;   --navy-2: #101927;   --ink: #11151d;
--paper:  #f4f6f8;   /* light sections */
--white:  #f7f9fc;
--blue:   #0a84ff;   /* primary accent */
--blue-2: #66b5ff;
--cyan:   #8be8ff;   /* most-used accent */
--lime:   #b9f1ff;   /* named lime, actually pale cyan */
--muted:  #97a1ae;
--line:   rgba(17,21,29,.10);  --line-light: rgba(255,255,255,.12);
--glass-dark: rgba(18,27,42,.56); --glass-light: rgba(255,255,255,.66); --glass-border: rgba(255,255,255,.16);
--display/--serif: "SF Pro Display", -apple-system, …;  --body: "SF Pro Text", …;  --mono: "SFMono-Regular", ui-monospace, …;
--shell: min(1360px, calc(100vw - 112px));  --header: 82px (72px ≤980px)
```

Left over from earlier generations:
- `--coral #ff795f`
- the **favicon still uses the first palette** (`#071b2e`, lime `#c9f35b`, `#3c86ff`)

### 5.3 Typography
- **No webfonts are loaded.** On Windows and Android, SF Pro isn't installed, so the whole site renders in Helvetica/Arial. What most visitors see is not what was designed.
- **Mono** is the most used family, with 42 uses. It sets the uppercase micro-labels, which carry most of the "technical" feel.
- Headings are very large and tightly set: hero up to `7.8rem`, `line-height ~.92`.

### 5.4 Layout and responsiveness
- **Breakpoints:** 1180, 980 and 700px, desktop-first with `max-width` media blocks. The media blocks are duplicated across each CSS generation.
- **At 980px and below:**
  - the menu becomes a full-screen overlay
  - sticky motion turns off
  - grids collapse to one column
- **At 700px and below:**
  - the cursor glow is hidden
  - flows stack vertically, with arrows rotated 90°

### 5.5 Section rhythm (visual flow)
- **Home:** Hero D → rail → Motion D → Engines **L** → Connectivity D → Intelligence D (navy) → Judgement **L** → Loop → Final CTA D → Footer D
- **Capabilities:** Hero D → Lab **L** → three Engines D → Fabric D → Delivery **L** → Brief D → Footer D

The site is mostly dark, with occasional light "breather" sections and blue radial glows on hero and CTA sections.

### 5.6 Interactions (`app.js`)
- **Header:** turns solid once scrolled (`.is-scrolled`). The mobile menu is accessible, with `aria-expanded`.
- **Cursor glow:** follows the pointer.
- **Reveal on scroll:** `.reveal` elements animate in via IntersectionObserver.
- **Hero network canvas:** seeded random nodes, pointer parallax, and it pauses when off-screen.
- **Sticky motion section:** three phases driven by scroll progress.
- **Globe:** SVG points and arcs generated by JS.
- **Automation lab tabs:** full ARIA tab pattern.
- **Brief builder:** generates text and copies it to the clipboard.
- **Other CSS animations:** pulse, spin, dash, signal-scan, travel, packet.
- **Reduced motion:** `prefers-reduced-motion` is respected throughout.

### 5.7 Brand lockup as built
Header: `hello success` + an arrow SVG + `IT together` in two weights. The joining mark changes from place to place:
- **arrow** in the header
- **×** in the footer
- **+** in the title, copyright and brief text

---

## 6. Findings for the redesign

### Messaging
1. **Say what you sell.** Lead with *AI automation and connected systems for businesses*, then the three outcomes. Today a visitor has to decode "orchestration layer" and "signals become context".
2. **Cut the repetition.** "Improve the process, enhance the system, automate" appears at least five times.
3. **Make the services buyable.** For each service, show:
   - who it's for
   - typical problems it fixes
   - deliverables
   - a typical engagement shape (for example: discovery workshop, then pilot, then rollout)
   - an example result

### Conversion
4. **The site has no real lead capture.** The brief builder only makes copyable text, and there's no email, phone, booking link or form submission anywhere. The single most important fix is to send the brief to the team as an email or CRM lead, and to offer "Book a call".
5. **Add basic trust pages.** Add contact details, location, an ABN if relevant, privacy and terms pages, and LinkedIn.

### Proof
6. **The site has zero evidence.** There are no case studies, client logos, testimonials, team or certifications. The CRM partnership is unnamed. The "30+ years" and "1000s of connection points" figures have no source. *These must come from you and must not be invented. The rebuild will use clearly marked placeholders until real content arrives.*

### Brand
7. **Use one lockup: "hello success × IT Together"** (decided 2026-11-01). Use the "hello success" wordmark, then ×, then the official IT Together logo. Use it the same way in the header, footer, title and favicon. *Done in the rebuild.*
8. **Fix the type.** Load a real webfont so that every platform renders the design as intended.

### Build
9. **Don't port `styles.css`.** It's 85 KB of three layered themes. Rebuild from the effective tokens in §5.2.
10. **Keep what works:**
    - the three-outcome structure (Grow / Serve / Run)
    - the Process → Platform → Intelligence breakdown per outcome
    - the automation-lab tabs, the strongest "show, don't tell" piece
    - the dark/light rhythm
    - the reduced-motion and ARIA care
11. **Add an OG image.** There isn't one, so link previews on LinkedIn and Slack show no picture.

---

## 7. Open inputs needed from the business

- [ ] **Stack for the rebuild:** plain HTML/CSS/JS like the original, or a framework such as React or Next.js with Tailwind.
- [ ] **Leads:** where form leads go (an email address, a CRM such as HubSpot or Zoho, a booking tool).
- [ ] **CRM partnership:** the platform name and partner tier.
- [ ] **Proof:** real case studies, client logos and testimonials, with permission to publish.
- [ ] **Brand assets:** logos, colours or fonts for Hello Success and for IT Together, if they exist.
- [ ] **Contact and company details:** phone, email, address, ABN, LinkedIn.
- [ ] **Stat sources:** confirmation of "30+ years" and of what "1000s of connection points" refers to.
