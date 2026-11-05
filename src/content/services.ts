// Every service and outcome on the site comes from this file.
// Board feedback on what we offer or how it's worded = edit here only.

export type Outcome = {
  id: "grow" | "serve" | "save";
  verb: string;
  title: string;
  promise: string;
  problem: string;
  /** Steps light up one by one as the visitor scrolls the chapter. */
  flow: { label: string; detail: string }[];
  layers: { process: string; platform: string; ai: string };
  /** Industry research, not a Hello Success result: always shown with its source. */
  result: { value: string; label: string; source: string };
};

/** Shown above every outcome stat so it reads as evidence, not our result. */
export const researchLabel = "What the research says";

export const outcomes: Outcome[] = [
  {
    id: "grow",
    verb: "Grow",
    title: "Win more of the leads you already get",
    promise:
      "Every enquiry is captured, scored and followed up in minutes, automatically, so your sales team spends its time closing, not chasing.",
    problem: "Leads sit in inboxes, follow-ups are forgotten and nobody trusts the forecast.",
    flow: [
      { label: "Enquiry arrives", detail: "Web form, email, phone or ad, captured in one place." },
      { label: "AI enriches + scores", detail: "Company, intent and fit added in seconds." },
      { label: "Right owner alerted", detail: "Routed to the best salesperson with context." },
      { label: "Follow-up sent", detail: "Personalised reply drafted and scheduled." },
      { label: "Forecast updates", detail: "Pipeline and reporting stay current on their own." },
    ],
    layers: {
      process: "Clear qualification, ownership and follow-up rules.",
      platform: "CRM connected to web, email, quoting and finance.",
      ai: "Lead scoring, next-best action and forecast insight.",
    },
    result: {
      value: "7×",
      label: "as likely to become a real sales conversation when a lead is contacted within an hour",
      source: "Harvard Business Review, 2011",
    },
  },
  {
    id: "serve",
    verb: "Serve",
    title: "Give every customer a fast, informed answer",
    promise:
      "Requests are understood, routed and answered with the full customer history, so service feels personal even at scale.",
    problem: "Customers repeat themselves, tickets bounce between teams and nobody sees the full picture.",
    flow: [
      { label: "Request received", detail: "Chat, email, portal or phone." },
      { label: "History assembled", detail: "Orders, billing and past conversations pulled together." },
      { label: "AI reads intent", detail: "Urgency and sentiment detected automatically." },
      { label: "Answered or routed", detail: "Simple asks resolved; complex ones go to the right person." },
      { label: "Follow-up closes the loop", detail: "Feedback captured, journey improves." },
    ],
    layers: {
      process: "Service promises, escalation paths and journey ownership.",
      platform: "CRM, help desk, portals and billing sharing one record.",
      ai: "AI assistants, sentiment, smart routing and proactive outreach.",
    },
    result: {
      value: "80%",
      label: "of common customer service issues will be resolved by AI agents by 2029, Gartner forecasts",
      source: "Gartner forecast, March 2025",
    },
  },
  {
    id: "save",
    verb: "Save",
    title: "Take the repetitive work off your team",
    promise:
      "Documents, approvals and data entry move through your systems automatically. People only step in when a decision is needed.",
    problem: "Staff re-key the same data into three systems and approvals stall in email.",
    flow: [
      { label: "Document or event", detail: "Invoice, order, form or system trigger." },
      { label: "Data extracted + checked", detail: "AI reads it; rules validate it." },
      { label: "Workflow runs", detail: "ERP, CRM and finance update together." },
      { label: "Exceptions flagged", detail: "Only the unusual cases reach a person." },
      { label: "Insight reported", detail: "Live view of throughput and bottlenecks." },
    ],
    layers: {
      process: "Simplified workflows, standards and controls, before automating.",
      platform: "ERP, documents, payments and work management connected.",
      ai: "Document AI, RPA, AI agents and exception detection.",
    },
    result: {
      value: "9 hrs",
      label: "a week: the average time AI saves an Australian worker",
      source: "RMIT Online and Deloitte Access Economics, 2026",
    },
  },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: "crm" | "agent" | "flow" | "link" | "cloud" | "shield";
  outcomes: Outcome["id"][];
  forWho: string;
  problems: string[];
  whatWeDo: string[];
  deliverables: string[];
  engagement: { phase: string; length: string }[];
  /** What changes for the client. No numbers or client names until they are real. */
  change: string;
};

export const services: Service[] = [
  {
    slug: "ai-automation",
    name: "AI Automation & Agents",
    short: "AI assistants and agents that handle routine work and hand people the decisions.",
    icon: "agent",
    outcomes: ["grow", "serve", "save"],
    forWho: "Teams buried in repetitive questions, emails, data entry or document handling.",
    problems: [
      "Staff answer the same questions every day",
      "Manual data entry between systems",
      "AI pilots that never reached production",
    ],
    whatWeDo: [
      "Identify the highest-value automation opportunities",
      "Build AI assistants and agents connected to your real systems",
      "Keep humans in the loop for approvals and exceptions",
    ],
    deliverables: ["Automation opportunity map", "Production AI agents", "Governance & oversight dashboard"],
    engagement: [
      { phase: "Discovery", length: "2 weeks" },
      { phase: "Pilot", length: "4 to 6 weeks" },
      { phase: "Scale", length: "Ongoing" },
    ],
    change: "Routine questions and data entry get handled without anyone touching them. Your team steps in only for the decisions.",
  },
  {
    slug: "crm-revenue",
    name: "CRM & Revenue Systems",
    short: "A CRM your team actually uses, connected to marketing, quoting and finance.",
    icon: "crm",
    outcomes: ["grow", "serve"],
    forWho: "Sales-led businesses with leads leaking, messy pipelines or low CRM adoption.",
    problems: ["No single view of the customer", "Forecasts based on guesswork", "Slow, manual quoting"],
    whatWeDo: [
      "Design the sales process before configuring software",
      "Implement or rescue your CRM",
      "Automate lead capture, scoring, follow-up and reporting",
    ],
    deliverables: ["Sales process blueprint", "Configured & integrated CRM", "Live revenue dashboards"],
    engagement: [
      { phase: "Blueprint", length: "2 to 3 weeks" },
      { phase: "Implement", length: "6 to 10 weeks" },
      { phase: "Adopt & optimise", length: "Ongoing" },
    ],
    change: "Every lead has an owner and a next step, and your team finally trusts the forecast.",
  },
  {
    slug: "process-automation",
    name: "Process Automation & RPA",
    short: "Approvals, data movement and back-office tasks that run themselves.",
    icon: "flow",
    outcomes: ["save"],
    forWho: "Operations and finance teams handling high volumes of repeatable work.",
    problems: ["Approvals stuck in email", "Copy-paste between systems", "Errors from manual handling"],
    whatWeDo: [
      "Map and simplify the process first",
      "Automate with workflow, RPA and document AI",
      "Surface only the exceptions that need a person",
    ],
    deliverables: ["Process maps (current & future)", "Automated workflows", "Exception & throughput reporting"],
    engagement: [
      { phase: "Process review", length: "1 to 2 weeks" },
      { phase: "Build", length: "3 to 6 weeks per process" },
      { phase: "Run & improve", length: "Ongoing" },
    ],
    change: "Approvals and paperwork move on their own. Only the exceptions land on someone's desk.",
  },
  {
    slug: "integration",
    name: "Systems Integration & ERP",
    short: "Your CRM, ERP, finance and tools talking to each other. No more re-keying.",
    icon: "link",
    outcomes: ["save", "grow"],
    forWho: "Businesses running on disconnected systems and spreadsheets in between.",
    problems: ["Data out of sync between systems", "Spreadsheets as glue", "Legacy systems nobody can change"],
    whatWeDo: [
      "Design one integration layer around how you operate",
      "Connect platforms via APIs and middleware",
      "Build custom software where off-the-shelf falls short",
    ],
    deliverables: ["Integration architecture", "Live connections between core systems", "Monitoring & alerting"],
    engagement: [
      { phase: "Architecture", length: "2 weeks" },
      { phase: "Connect", length: "4 to 8 weeks" },
      { phase: "Support", length: "Ongoing" },
    ],
    change: "Information is entered once and appears everywhere it's needed. No more re-keying between systems.",
  },
  {
    slug: "cloud-digital",
    name: "Cloud & Digital Platforms",
    short: "Modern, secure cloud foundations and customer-facing portals.",
    icon: "cloud",
    outcomes: ["serve", "save"],
    forWho: "Organisations moving off ageing infrastructure or launching digital services.",
    problems: ["Slow, ageing on-premise systems", "No self-service for customers", "Rising infrastructure costs"],
    whatWeDo: [
      "Plan and execute cloud migration",
      "Build customer and staff portals",
      "Architect for scale and cost control",
    ],
    deliverables: ["Cloud roadmap", "Migrated workloads", "Customer / staff portal"],
    engagement: [
      { phase: "Assess", length: "2 weeks" },
      { phase: "Migrate & build", length: "6 to 12 weeks" },
      { phase: "Manage", length: "Ongoing" },
    ],
    change: "Customers help themselves through a portal, and your systems run on a platform built to grow with you.",
  },
  {
    slug: "data-security",
    name: "Data, Reporting & Security",
    short: "Trusted data, live dashboards and security built in from day one.",
    icon: "shield",
    outcomes: ["grow", "serve", "save"],
    forWho: "Leaders who can't get a straight answer from their data, or worry about who can see it.",
    problems: ["Reports take days to build", "Conflicting numbers", "Unclear access & security controls"],
    whatWeDo: [
      "Clean and connect your core data",
      "Build live dashboards for each team",
      "Design access, backup and security controls",
    ],
    deliverables: ["Data model & quality rules", "Executive and team dashboards", "Security & access review"],
    engagement: [
      { phase: "Data audit", length: "2 weeks" },
      { phase: "Build", length: "4 to 6 weeks" },
      { phase: "Govern", length: "Ongoing" },
    ],
    change: "Everyone works from the same live numbers, and you know exactly who can see what.",
  },
];
