export const profile = {
  name: "Pierre Bou-Malham",
  roles: [
    "Full-Stack Engineer",
    "AI SaaS Builder",
    "React Specialist",
    "Spring Boot Developer",
  ],
  tagline: "Meta Certified Developer",
  location: "Beirut, Lebanon",
  summary:
    "Full-stack engineer with 4+ years shipping production systems across Canada, France, Lebanon, the UK and the USA, including an AI-powered SaaS built from scratch, large-scale telecom network visualization, and real-time fleet platforms.",
  email: "pierreboumalham3@gmail.com",
  phone: "+961 71 637 891",
  cvUrl: "/Pierre_Bou-Malham_CV.pdf",
  github: "https://github.com/PierreBouMalham",
  linkedin: "https://www.linkedin.com/in/pierre-bou-malham",
};

export const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "5", label: "Countries shipped in" },
];

export const experience = [
  {
    role: "Full-Stack Engineer",
    company: "Aspire Software (seekda)",
    location: "Remote · HQ Quebec, Canada",
    period: "Sep 2026 – Present",
    type: "Full-Time",
    highlights: [
      "Helped close deals with dozens of hotels by building Booking.com guest messaging, a feature prospects asked for, end to end across 6 services (Spring Boot, Vert.x, TypeScript) with an AI-assisted inbox.",
      "Passed Booking.com's Messaging API certification, unlocking messaging for thousands of connected Seekda properties.",
      "Hardened platform security by closing authorization and path-traversal gaps, verifying webhook signatures, encrypting secrets (AES-256-GCM), masking guest data in logs and upgrading vulnerable dependencies.",
      "Designed a reusable OTA messaging layer extending the Booking.com work to Airbnb; shipped local events in the guest app.",
    ],
    tech: ["Spring Boot", "Vert.x", "TypeScript", "Booking.com API", "AES-256-GCM"],
  },
  {
    role: "Full-Stack Engineer",
    company: "DualCom / Nokia",
    location: "Remote · HQ Paris, France",
    period: "Jan 2025 – Sep 2026",
    type: "Full-Time",
    highlights: [
      "Built a network visualization app (React / Spring Boot) for Bouygues Telecom, enabling engineers to plan fiber routes and evaluate path metrics across thousands of sites nationwide.",
      "Contributed to an AI assistant chatbot integrating an external LLM agent (Prisme AI / Vertex AI) via Spring Boot, including a React highlighting system guiding users across third-party UI libraries and a fix for a cross-layer JSON-parsing defect.",
      "Eliminated 15+ second UI freezes with Web Workers and progressive rendering for 100MB+ telecom datasets (2M+ features).",
      "Built map-based path calculation workflows with React, Leaflet, spatial indexing (RBush) and Lambert II → WGS84 coordinate transformations; developed a multi-page PDF export engine (jsPDF) for field engineers.",
    ],
    tech: ["React", "Spring Boot", "Leaflet", "Web Workers", "Vertex AI"],
  },
  {
    role: "AI Full-Stack Engineer",
    company: "Talegacy",
    location: "Remote · HQ Paris, France",
    period: "Sep 2024 – Sep 2026",
    type: "Contractor",
    highlights: [
      "Built an AI-powered book generation SaaS from scratch (React, Laravel, MySQL), processing 10,000+ books for hundreds of active subscribers and dozens of professional ghostwriters.",
      "Implemented OpenAI content generation and ElevenLabs voice cloning for automated audiobook production.",
      "Integrated Scellius payment processing for subscriptions, recurring billing and coupons via Laravel Queues, securing tens of thousands of dollars in revenue.",
      "Enabled multi-format publishing (PDF / EPUB / DOCX) with multilingual support across 4 languages, with CI/CD via GitHub Actions.",
    ],
    tech: ["React", "Laravel", "MySQL", "OpenAI", "ElevenLabs", "GitHub Actions"],
  },
  {
    role: "Full-Stack Developer",
    company: "Decentra-Tech",
    location: "Beirut, Lebanon",
    period: "Feb 2023 – Jan 2025",
    type: "Full-Time",
    highlights: [
      "Developed a live vehicle-tracking dashboard using WebSockets and Spring Boot, handling thousands of vehicles in real time with automated reporting and instant telematics.",
      "Led the migration of a fleet management system from Angular 12 to 17, enabling expansion into the UAE and KSA markets.",
      "Built a multi-branch garage management system standardizing registration and admin workflows across international branches.",
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
      "Developed a mapping and visualization system for recruiters to filter applicants by location, degree and custom criteria.",
      "Built advanced HR dashboards processing thousands of applications through dynamic search and multi-layer filtering, with NgRx state management reducing abandonment rates by 65%.",
    ],
    tech: ["Angular", "NgRx", "Mapping", "Dashboards"],
  },
];

export const projects = [
  {
    title: "Booking.com Guest Messaging",
    description:
      "End-to-end hotel guest messaging across 6 services with an AI-assisted inbox. Passed Booking.com's Messaging API certification, unlocking messaging for thousands of Seekda properties, then extended to Airbnb via a reusable OTA messaging layer.",
    tech: ["Spring Boot", "Vert.x", "TypeScript", "Booking.com API"],
    accent: "#ef4444",
    featured: true,
  },
  {
    title: "Talegacy: AI Book Generation SaaS",
    description:
      "Full SaaS platform built from scratch: AI-written books, cloned-voice audiobooks, multi-format publishing in 4 languages, subscriptions and recurring billing. 10,000+ books generated for hundreds of subscribers.",
    tech: ["React", "Laravel", "MySQL", "OpenAI", "ElevenLabs"],
    accent: "#8b5cf6",
    featured: true,
  },
  {
    title: "Telecom Network Visualization",
    description:
      "Nationwide fiber-route planning tool for Nokia & Bouygues Telecom. Renders 2M+ map features from 100MB+ datasets without freezing, using Web Workers, progressive rendering and spatial indexing.",
    tech: ["React", "Spring Boot", "Leaflet", "RBush", "jsPDF"],
    accent: "#3b82f6",
    featured: true,
  },
  {
    title: "Real-Time Fleet Tracking Platform",
    description:
      "Live vehicle-tracking dashboard handling thousands of vehicles simultaneously over WebSockets, with instant telematics, automated reporting, and multi-branch operations across Lebanon, UAE and KSA.",
    tech: ["Angular", "Spring Boot", "WebSockets"],
    accent: "#06b6d4",
  },
  {
    title: "Aipal Fitness",
    description:
      "AI-powered personal training app generating customized workout plans that adapt weekly to user progress.",
    tech: ["React Native", "Spring Boot"],
    accent: "#22c55e",
  },
  {
    title: "Food-Tracker",
    description:
      "Nutrition tracking app for logging caloric intake and macro/micronutrients with rich data visualization.",
    tech: ["Ionic", "Angular"],
    accent: "#f59e0b",
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
