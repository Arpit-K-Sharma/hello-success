// Site-wide copy. Problem stats and contact details are placeholders until
// the sourced figures and real details go in (docs/content-plan.md).

export const site = {
  name: "Hello Success, powered by IT Together",
  description:
    "AI automation, connected systems and smarter processes that help businesses grow revenue, serve customers better and run leaner.",
  // In page order. `sections` = ids that light up this item while on screen.
  nav: [
    { label: "How it works", href: "#orchestration", sections: ["orchestration"] },
    { label: "Outcomes", href: "#outcomes", sections: ["outcomes", "grow", "serve", "run"] },
    { label: "Services", href: "#services", sections: ["services"] },
    { label: "Process", href: "#process", sections: ["process"] },
    { label: "Why us", href: "#why-us", sections: ["why-us"] },
  ],
  cta: { label: "Book a discovery call", short: "Book a call", href: "#contact" },

  // Real phone. Email and LinkedIn are placeholders until the CEO sends them.
  contact: {
    email: "hello@hellosuccess.example",
    phone: "0478 062 165",
    phoneHref: "tel:+61478062165",
    linkedin: "https://www.linkedin.com/",
    location: "Sydney, Australia",
  },

  hero: {
    eyebrow: "Business consulting, delivered through technology",
    title: ["Consulting that", "delivers.", "Not just a report."],
    intro:
      "We find what's holding your business back and fix the process. Then, instead of handing you a report, we automate it with technology that gets better the more you use it.",
    // What Hello Success does, in order. Scroll beats on desktop; a short list on smaller screens.
    beats: [
      {
        kicker: "01 · Where we start",
        heading: "Discover",
        body: "Goals, people, processes and systems. We find the real bottleneck.",
      },
      {
        kicker: "02 · Before any software",
        heading: "Redesign",
        body: "We simplify the process before choosing any technology.",
      },
      {
        kicker: "03 · Where we're different",
        heading: "Automate",
        body: "No report on a shelf. We build the automation that does the work, and it keeps getting better the more your team uses it.",
      },
    ],
    // Set to a frame folder in /public/frames to replace the 3D scene with an
    // image-sequence "video". See docs/scroll-animation-guide.md.
    frames: null as null | { dir: string; count: number; ext: "webp" | "jpg" },
  },

  // The orchestration layer (after the reference site's "connected business core"):
  // scattered systems merge into one layer, which drives Grow, Serve and Run.
  orchestration: {
    beats: [
      {
        kicker: "The orchestration layer",
        heading: "Everything flows in. Results flow out.",
        body: "Most businesses already own good software. The cost is in the gaps between it. We add one layer across your systems that makes them work as one.",
      },
      {
        kicker: "01 · Connect",
        heading: "Stop adding tools. Start connecting them.",
        body: "Your CRM, finance system, inbox, service desk and spreadsheets already hold the information. We connect them, using thousands of available connection points.",
      },
      {
        kicker: "02 · Orchestrate",
        heading: "One layer that sees, decides and acts.",
        body: "It notices what happens in every system, applies your rules and AI, and moves the work on. People approve anything that matters.",
      },
      {
        kicker: "03 · Perform",
        heading: "Grow, Serve and Run from one system.",
        body: "The same layer wins more revenue, answers customers faster and takes admin off your team, and it gets sharper as it learns.",
      },
    ],
    tags: ["CRM", "Email", "Finance", "ERP", "Service desk", "Spreadsheets", "Website", "Data", "AI", "Cloud"],
    outputs: [
      { id: "grow", verb: "Grow", label: "More revenue" },
      { id: "serve", verb: "Serve", label: "Happier customers" },
      { id: "run", verb: "Run", label: "Leaner operations" },
    ],
  },

  problem: {
    eyebrow: "The problem",
    title: "Your team is flat out. The business isn't moving faster.",
    body: "It isn't a people problem. It's a system problem: good staff spending their day as the glue between tools that don't talk to each other.",
    // Inbox mock-up, newest first. Every email is a symptom of disconnected systems.
    inbox: {
      // Shown on the mock-up so it reads as an illustration, not client data.
      tag: "Example",
      unreadBase: 38,
      folders: ["Flagged", "Sent", "Drafts", "Archive"],
      alert: "3 customers have waited more than 48 hours",
      emails: [
        { from: "Website Enquiry", time: "9:58", subject: "Demo request from Coastal Wholesale", preview: "Not assigned to anyone yet.", tag: "Unassigned", urgent: false, color: "#1868db" },
        { from: "Megan Ross", time: "9:41", subject: "Board report due Thursday", preview: "Can someone pull numbers from all five systems?", tag: "Due soon", urgent: false, color: "#7c3aed" },
        { from: "Operations", time: "9:12", subject: "Approval needed: PO-2291", preview: "Still waiting on sign-off from Friday.", tag: "Waiting 4 days", urgent: true, color: "#0891b2" },
        { from: "Sales Team", time: "Yesterday", subject: "Pipeline_v7_FINAL_final.xlsx", preview: "Which version is the latest one?", tag: "4 versions", urgent: false, color: "#059669" },
        { from: "Mark Chen", time: "Yesterday", subject: "RE: RE: RE: Order #8812 not delivered", preview: "This is the third time I've asked.", tag: "3rd follow-up", urgent: true, color: "#dc2626" },
        { from: "Accounts", time: "Mon", subject: "FW: 38 invoices to key into Xero", preview: "Please enter these by end of week.", tag: "Manual entry", urgent: false, color: "#d97706" },
        { from: "Website Enquiry", time: "Mon", subject: "Quote request: 40 units", preview: "Customer needs pricing today.", tag: "No reply 2 days", urgent: true, color: "#1868db" },
      ],
    },
    // Research figures only; every one is credited in `sources` (checked 5 Nov 2026).
    costs: [
      { stat: "2 min", text: "The average worker is interrupted by a meeting, email or message every two minutes during core hours." },
      { stat: "29%", text: "of the apps a business runs are connected to each other." },
      { stat: "23%", text: "of businesses never answered a website enquiry. The ones that did took 42 hours on average." },
    ],
    sources: "Sources: Microsoft Work Trend Index 2025; MuleSoft Connectivity Benchmark 2025; Harvard Business Review 2011.",
    closer: ["We fix the process,", "connect your systems", "and automate the rest, with AI where it pays off."],
  },

  // The one step model used across the site (CEO feedback): Discover, Redesign, Build, Run.
  process: [
    {
      step: "Discover",
      phase: "Consulting",
      text: "Goals, people, processes and systems. We find the real bottleneck, and you get a written plan with prices and dates before anything is built.",
    },
    {
      step: "Redesign",
      phase: "Consulting",
      text: "We simplify the process before choosing any technology, so we automate the right work, not today's workarounds.",
    },
    {
      step: "Build",
      phase: "Technology",
      text: "No report on a shelf. We connect your systems and build the automation and AI that does the work. People approve anything that matters.",
    },
    {
      step: "Run",
      phase: "Technology",
      text: "We stay on after launch, report against the measures we agreed, and keep improving it the more your team uses it.",
    },
  ],

  faqs: [
    {
      q: "Do we need to replace our current systems?",
      a: "Usually not. We start by connecting and improving what you already have, and only recommend new platforms when they clearly pay off.",
    },
    {
      q: "Where does AI actually fit in?",
      a: "Wherever it removes repetitive work or improves a decision: reading documents, answering routine questions, scoring leads, flagging exceptions. People stay in control of the judgement calls.",
    },
    {
      q: "How long until we see results?",
      a: "Most clients see a first automation live within 4 to 6 weeks of discovery. We prioritise quick wins that fund the bigger changes.",
    },
    {
      q: "Is our data secure?",
      a: "Security and access controls are designed in from day one, delivered by IT-qualified specialists from IT Together.",
    },
    {
      q: "What does it cost?",
      a: "Every engagement starts with a fixed price Discovery, quoted after a free 30 minute call. Discovery ends with a written plan, timeline and budget before any build begins.",
    },
  ],

  itTogether: {
    eyebrow: "Powered by IT Together",
    text: "A new practice from IT Together.",
    proof: ["20+ years of sales, operations and CX leadership", "IT-qualified engineers", "Major CRM implementation partner"],
  },

  // Replaces the old Results section. No numbers until there are real clients.
  whyUs: {
    eyebrow: "Why work with us",
    title: "Built by someone who's run the floor, not just advised it.",
    lead: "Hello Success is new. The experience behind it isn't.",
    about:
      "Hello Success is a consulting practice founded by Mina Azar, co-founder of IT Together. Mina brings 20+ years leading sales, customer experience and operations across automotive, retail, financial services and government. IT Together's engineers build and run the systems. One team diagnoses the problem, designs the fix and wires it in.",
    reasons: [
      {
        icon: "crm" as const,
        title: "One team, start to finish.",
        text: "The person who finds the problem stays to build the fix. There's no handover gap between the consultant and the IT provider.",
      },
      {
        icon: "flow" as const,
        title: "You see the plan before you commit.",
        text: "Discovery ends with a written plan that has prices and dates on it. It's not a slide deck of theory.",
      },
      {
        icon: "chart" as const,
        title: "Measured against your numbers.",
        text: "We agree the measures up front and report against them every month.",
      },
    ],
    offer: {
      eyebrow: "Founding clients",
      title: "Be one of our first clients.",
      text: "We're taking on a small number of founding clients for 2027. You get senior attention from day one, and we get a story we're proud to tell, with your permission.",
    },
  },

  discovery: {
    eyebrow: "Discovery call",
    title: ["Start with the problem,", "not the technology."],
    body: "No brief or shortlist needed. Pick what you want to improve, tell us what's happening, and we'll bring a first idea to a 30 minute call.",
    promises: ["30 minutes", "Free, no obligation", "Reply within one business day"],
    next: [
      { title: "Send a 2 minute brief", text: "What you want to improve and what's in the way." },
      { title: "We reply within one business day", text: "With a time that suits you and who you'll meet." },
      { title: "30 minute call", text: "We bring a first idea for your quickest win." },
    ],
    focus: [
      { id: "grow", label: "Grow revenue", hint: "Leads, sales, CRM" },
      { id: "serve", label: "Serve customers", hint: "Service, portals, response" },
      { id: "run", label: "Run leaner", hint: "Admin, approvals, data entry" },
      { id: "unsure", label: "Not sure yet", hint: "Help me find the win" },
    ],
  },
};
