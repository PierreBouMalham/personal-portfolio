// All site copy lives here. **double asterisks** mark a key result:
// it renders bold so people skimming catch the numbers.

export const site = {
  url: "https://pierreboumalham.com",
};

export const profile = {
  name: "Pierre Bou-Malham",
  title: "Full-Stack Engineer",
  availability: "Open to opportunities · Remote",
  headline:
    "I build production systems from scratch: AI SaaS platforms, payment and banking solutions, and real-time maps at telecom scale.",
  location: "Beirut, Lebanon",
  summary:
    "4+ years shipping for companies in Canada, France, the USA, the UK and Lebanon, from Booking.com integrations to nationwide telecom tooling.",
  email: "pierreboumalham3@gmail.com",
  cvUrl: "/Pierre_Bou-Malham_CV.pdf",
  github: "https://github.com/PierreBouMalham",
  linkedin: "https://www.linkedin.com/in/pierre-bou-malham",
};

// Proof points: each one says something the summary doesn't
export const stats = [
  { value: "4+", label: "years in production, across 5 countries" },
  { value: "2M+", label: "map features rendered without freezing" },
  { value: "10k+", label: "books generated on a SaaS I built" },
];

export const experience = [
  {
    role: "Full-Stack Engineer",
    company: "Aspire Software (seekda)",
    location: "Remote · HQ Quebec, Canada",
    period: "Sep 2026 – Present",
    type: "Full-Time",
    highlights: [
      "**Helped close deals with dozens of hotels** by building Booking.com guest messaging, a feature prospects asked for, end to end across 6 services (Spring Boot, Vert.x, TypeScript) with an AI-assisted inbox.",
      "**Passed Booking.com's Messaging API certification**, unlocking messaging for thousands of connected seekda properties.",
      "**Hardened platform security** by closing authorization and path-traversal gaps, verifying webhook signatures, encrypting secrets (AES-256-GCM), masking guest data in logs and upgrading vulnerable dependencies.",
      "**Designed a reusable OTA messaging layer** extending the Booking.com work to Airbnb; shipped local events in the guest app.",
    ],
    tech: ["Spring Boot", "Vert.x", "TypeScript", "Booking.com API", "AES-256-GCM"],
  },
  {
    role: "Full-Stack Engineer",
    company: "DualCom / Nokia",
    location: "Remote · HQ Paris, France",
    period: "Jan 2025 – Oct 2026",
    type: "Full-Time",
    highlights: [
      "**Built a network visualization app** (React / Spring Boot) for Bouygues Telecom, letting engineers plan fiber routes and evaluate path metrics across thousands of sites nationwide.",
      "**Eliminated 15+ second UI freezes** with Web Workers and progressive rendering for 100MB+ telecom datasets (2M+ features).",
      "**Contributed to an AI assistant chatbot** integrating an external LLM agent (Prisme AI / Vertex AI) via Spring Boot, including a React highlighting system guiding users across third-party UI libraries and a fix for a cross-layer JSON-parsing defect.",
      "**Built map-based path calculation workflows** with React, Leaflet, spatial indexing (RBush) and Lambert II → WGS84 coordinate transformations; developed a multi-page PDF export engine (jsPDF) for field engineers.",
    ],
    tech: ["React", "Spring Boot", "Leaflet", "Web Workers", "Vertex AI"],
  },
  {
    role: "Full-Stack Developer",
    company: "Decentra-Tech",
    location: "Beirut, Lebanon",
    period: "Feb 2023 – Jan 2025",
    type: "Full-Time",
    highlights: [
      "Developed a live vehicle-tracking dashboard using WebSockets and Spring Boot, handling **thousands of vehicles in real time** with automated reporting and instant telematics.",
      "Led the migration of a fleet management system from Angular 12 to 17, enabling **expansion into the UAE and KSA**.",
      "**Built a multi-branch garage management system** standardizing registration and admin workflows across international branches.",
    ],
    tech: ["Angular", "Spring Boot", "WebSockets", "PostgreSQL"],
  },
  {
    role: "Full-Stack Developer",
    company: "CyberRATSS Ltd",
    location: "Swindon, UK",
    period: "May 2022 – Feb 2023",
    type: "Full-Time",
    highlights: [
      "**Built HR dashboards** processing thousands of applications through dynamic search and multi-layer filtering, with NgRx state management reducing abandonment rates by 65%.",
      "**Developed a mapping and visualization system** for recruiters to filter applicants by location, degree and custom criteria.",
    ],
    tech: ["Angular", "NgRx", "Mapping", "Dashboards"],
  },
];

// Freelance and contract engagements, kept apart from full-time
// employment so overlapping dates read as what they are.
export const contractWork = [
  {
    role: "AI Full-Stack Engineer",
    company: "Talegacy",
    location: "Remote · HQ Paris, France",
    period: "Sep 2024 – Jun 2026",
    type: "Contract",
    highlights: [
      "Built an AI-powered book generation SaaS from scratch (React, Laravel, MySQL), processing **10,000+ books** for hundreds of active subscribers and dozens of professional ghostwriters.",
      "Integrated Scellius payment processing for subscriptions, recurring billing and coupons via Laravel Queues, securing **tens of thousands of dollars in revenue**.",
      "**Implemented OpenAI content generation** and ElevenLabs voice cloning for automated audiobook production.",
      "**Enabled multi-format publishing** (PDF / EPUB / DOCX) with multilingual support across 4 languages, with CI/CD via GitHub Actions.",
    ],
    tech: ["React", "Laravel", "MySQL", "OpenAI", "ElevenLabs", "GitHub Actions"],
  },
];

// Case studies: problem → build → result, each with a flow diagram of
// how the system works. Deliberately framed differently from the
// Experience bullets so the two sections don't repeat each other.
export const caseStudies = [
  {
    slug: "booking-messaging",
    kicker: "Aspire Software (seekda) · 2026",
    title: "Booking.com guest messaging",
    problem:
      "Hotels evaluating seekda kept asking the same thing: can guests message us through Booking.com from your platform? Without it, deals stalled.",
    build:
      "Built the feature end to end across 6 services, with signed webhooks, encrypted secrets and an AI-assisted inbox for hotel staff. The messaging layer was written to be OTA-agnostic, so Airbnb reused it.",
    result: { value: "Certified", label: "by Booking.com, unlocking messaging for thousands of properties" },
    flow: ["Booking.com API", "Signed webhooks", "Messaging service", "AI-assisted inbox", "Hotel staff"],
    tech: ["Spring Boot", "Vert.x", "TypeScript", "AES-256-GCM"],
  },
  {
    slug: "telecom-map",
    kicker: "DualCom / Nokia for Bouygues Telecom · 2025–26",
    title: "Nationwide fiber-route planning",
    problem:
      "Field engineers loaded 100MB+ network datasets into the map and the whole UI froze for 15 seconds or more, every time.",
    build:
      "Moved parsing to Web Workers, indexed features spatially with RBush and rendered progressively, so the map stays interactive while data streams in. Added path calculation and a multi-page PDF export.",
    result: { value: "15s → 0", label: "UI freeze on 2M+ map features" },
    flow: ["100MB+ dataset", "Web Worker parse", "RBush index", "Progressive render", "Leaflet map"],
    tech: ["React", "Spring Boot", "Leaflet", "Web Workers", "RBush"],
  },
  {
    slug: "talegacy",
    kicker: "Talegacy · 2024–26",
    title: "AI book & audiobook SaaS",
    problem:
      "A publishing startup wanted customers to go from an idea to a finished book and audiobook, with professional ghostwriters in the loop.",
    build:
      "Built the whole platform from scratch: OpenAI drafting, ghostwriter editing, ElevenLabs voice cloning, PDF / EPUB / DOCX export in 4 languages, and subscriptions with recurring billing.",
    result: { value: "10k+", label: "books generated for hundreds of paying subscribers" },
    flow: ["Customer brief", "OpenAI draft", "Ghostwriter edit", "ElevenLabs audio", "PDF · EPUB · DOCX"],
    tech: ["React", "Laravel", "MySQL", "OpenAI", "ElevenLabs"],
  },
];

export const sideProjects = [
  {
    title: "Fit Tracker",
    description:
      "Food, water, workouts and body composition in one installable app: calorie ring, macro targets, per-set training logs and progress charts. Private per-user data with Postgres row-level security.",
    tech: ["React", "TypeScript", "Supabase", "Vercel"],
    url: "https://fit.pierreboumalham.com",
    urlLabel: "Open live app",
  },
  {
    title: "Aipal Fitness",
    description:
      "AI-powered personal training app generating customized workout plans that adapt weekly to user progress.",
    tech: ["React Native", "Spring Boot"],
  },
];

export const skillGroups = [
  {
    label: "Frontend",
    skills: ["React", "Angular", "TypeScript", "JavaScript", "React Native", "Ionic"],
  },
  {
    label: "Backend",
    skills: ["Java Spring Boot", "PHP Laravel", "ASP.NET Core", "Django", "Node.js"],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    label: "Tools & Languages",
    skills: ["Git", "C++", "C#", "GitHub Actions", "CI/CD"],
  },
];

export const education = {
  degree: "Master of Computer and Telecommunications Engineering",
  school: "Lebanese University, Roumieh, Lebanon",
  period: "July 2026",
};

export const certifications = [
  { name: "Meta Front-End Developer", year: "2023" },
  { name: "Angular: The Complete Guide", year: "2021" },
  { name: "Backend REST API, Python & Django", year: "2021" },
];

export const languages = ["English", "French", "Arabic"];
