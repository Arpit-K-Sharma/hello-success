// Site-wide copy. Stats, clients, quotes and contact details are placeholders
// for the board review; swap in real data before launch.

const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

export const site = {
  name: "Hello Success × IT Together",
  description:
    "AI automation, connected systems and smarter processes that help businesses grow revenue, serve customers better and run leaner.",
  // In page order. `sections` = ids that light up this item while on screen.
  nav: [
    { label: "How it works", href: "#orchestration", sections: ["orchestration"] },
    { label: "Outcomes", href: "#outcomes", sections: ["outcomes", "grow", "serve", "run"] },
    { label: "Services", href: "#services", sections: ["services"] },
    { label: "Process", href: "#process", sections: ["process"] },
    { label: "Results", href: "#results", sections: ["results"] },
  ],
  cta: { label: "Book a discovery call", short: "Book a call", href: "#contact" },

  // Fictional contact details (0491 570 xxx is reserved for fiction in AU).
  contact: {
    email: "hello@hellosuccess.example",
    phone: "+61 491 570 156",
    linkedin: "https://www.linkedin.com/",
    location: "Sydney, Australia",
  },

  hero: {
    eyebrow: "AI automation for growing businesses",
    title: ["Your business,", "connected.", "Automated."],
    intro:
      "We connect the systems you already use, automate the repetitive work and put AI where it actually pays off. You grow revenue, serve customers faster and run leaner.",
    // Scroll beats: copy that swaps while the 3D scene plays.
    beats: [
      {
        kicker: "01 · Connect",
        heading: "Your tools stop working alone.",
        body: "CRM, finance, email, service desk and spreadsheets, joined into one connected system.",
      },
      {
        kicker: "02 · Automate",
        heading: "Work moves on its own.",
        body: "Rules, automation and AI agents route the routine work. Your people handle the judgement calls.",
      },
      {
        kicker: "03 · Grow",
        heading: "Three results, one system.",
        body: "More revenue. Happier customers. Leaner operations. All measured, all improving.",
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
    costs: [
      { stat: "28%", text: "of the working week goes on email and chasing information" },
      { stat: "5+", text: "disconnected systems in the average mid-sized business" },
      { stat: "1 in 3", text: "leads never get a follow-up" },
    ],
    closer: ["We fix the process,", "connect your systems", "and automate the rest, with AI where it pays off."],
  },

  process: [
    { step: "Discover", text: "Goals, people, processes and systems. We find the real bottleneck." },
    { step: "Redesign", text: "We simplify the process before choosing any technology." },
    { step: "Connect", text: "Platforms and data joined into one flow." },
    { step: "Automate", text: "Automation and AI where they create clear value." },
    { step: "Measure", text: "Results tracked against the business case you agreed to." },
    { step: "Advance", text: "After launch we stay on, keep improving and line up your next win." },
  ],

  stats: [
    { value: "30+", label: "years of business and technology delivery" },
    { value: "150+", label: "systems connected" },
    { value: "12k", label: "staff hours returned each year" },
    { value: "98%", label: "client retention" },
  ],

  caseStudies: [
    {
      client: "Harbour Health Group",
      sector: "Healthcare · 12 clinics",
      outcome: "grow" as const,
      before: "2 days",
      after: "15 min",
      metric: "lead response time",
      summary: "Rebuilt CRM with automated lead capture, scoring and follow-up.",
    },
    {
      client: "Northwind Logistics",
      sector: "Transport & logistics",
      outcome: "run" as const,
      before: "0%",
      after: "62%",
      metric: "customer emails answered automatically",
      summary: "An AI agent reads, classifies and replies, escalating only exceptions.",
    },
    {
      client: "Summit Building Supplies",
      sector: "Trade & wholesale",
      outcome: "serve" as const,
      before: "1,200",
      after: "720",
      metric: "service calls a month",
      summary: "A customer portal connected to ERP and dispatch. Customers track orders themselves.",
    },
  ],

  testimonials: [
    {
      quote: "They fixed our process first and then automated it. That's why it actually stuck.",
      name: "Sarah Mitchell",
      role: "COO, Northwind Logistics",
      avatar: img("1573497019940-1c28c88b4f3e", 160),
    },
    {
      quote: "Our sales team finally trusts the CRM. Follow-ups happen without anyone thinking about it.",
      name: "James Carter",
      role: "Head of Sales, Harbour Health Group",
      avatar: img("1507003211169-0a1dd7228f2d", 160),
    },
    {
      quote: "We went from five spreadsheets to one live dashboard in six weeks.",
      name: "Priya Nair",
      role: "CFO, Redgum Financial",
      avatar: img("1580489944761-15a19d654956", 160),
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
      a: "Every engagement starts with a fixed-price discovery. From there you get a clear plan, timeline and budget before any build begins.",
    },
  ],

  itTogether: {
    eyebrow: "Powered by IT Together",
    text: "A new practice from IT Together, built on thirty years of technology delivery.",
    proof: ["30+ years of IT delivery", "IT-qualified engineers", "Major CRM implementation partner"],
  },

  discovery: {
    eyebrow: "Discovery call",
    title: ["Start with the problem,", "not the technology."],
    body: "No brief or shortlist needed. Pick what you want to improve, tell us what's happening, and we'll bring a first idea to a 30 minute call.",
    promises: ["30 minutes", "Free, no obligation", "Reply within one business day"],
    next: [
      { title: "Send a 2 minute brief", text: "What you want to improve and what's in the way." },
      { title: "We reply within a day", text: "With a time that suits you and who you'll meet." },
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
