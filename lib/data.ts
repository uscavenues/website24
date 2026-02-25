// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamMember {
  name: string;
  role: string;
  photo: string; // absolute path from /public, e.g. "/assets/photos/profiles/armani.jpg"
  linkedin: string;
}

interface Team {
  executive: TeamMember[];
  directors: TeamMember[];
  associates: TeamMember[];
}

interface MentorCompany {
  name: string;
  logo: string; // absolute path from /public, e.g. "/assets/logos/deloitte.png"
}

interface AlumniPlacement {
  company: string;
  logo: string;
  positions: string[]; // prefix: "(Full-Time)" or "(Intern)"
}

interface ClientEngagement {
  name: string;
  logo: string;
  services: string[];
}

interface WhatWeDoItem {
  title: string;
  desc: string;
  icon: string; // two-digit number string used as a mono index glyph
}

export interface ProjectType {
  title: string;
  desc: string;
  clients: string; // comma-separated client names
}

export interface FAQItem {
  q: string;
  a: string;
}

// ── Type alias used by portfolio page imports ─────────────────────────────────
export type Project = ProjectType;

// ─────────────────────────────────────────────────────────────────────────────
//  Team
// ─────────────────────────────────────────────────────────────────────────────

export const team: Team = {
  executive: [
    {
      name: "Armani C.",
      role: "Co-President",
      photo: "/assets/photos/profiles/armani.jpg",
      linkedin: "https://www.linkedin.com/in/armanichoy/",
    },
    {
      name: "Calissa W.",
      role: "Co-President",
      photo: "/assets/photos/profiles/calissa.jpg",
      linkedin: "https://www.linkedin.com/in/calissa-welborn-usc/",
    },
  ],

  directors: [
    {
      name: "Nate B.",
      role: "Human Resources",
      photo: "/assets/photos/profiles/nate.jpg",
      linkedin: "https://www.linkedin.com/in/nathan-brigger-019874304",
    },
    {
      name: "Varenya S.",
      role: "Finance",
      photo: "/assets/photos/profiles/varenya.jpg",
      linkedin: "https://www.linkedin.com/in/varenya-sharma/",
    },
    {
      name: "Grace L.",
      role: "Recruitment",
      photo: "/assets/photos/profiles/grace.jpg",
      linkedin: "https://www.linkedin.com/in/gr4lee",
    },
    {
      name: "Vicky Z.",
      role: "Recruitment",
      photo: "/assets/photos/profiles/vicky.jpg",
      linkedin: "https://www.linkedin.com/in/vicky--zhang/",
    },
    {
      name: "Sam B.",
      role: "External Affairs",
      photo: "/assets/photos/profiles/sam.jpg",
      linkedin: "https://www.linkedin.com/in/samiddhbiswas/",
    },
    {
      name: "Mistie Z.",
      role: "Internal Affairs",
      photo: "/assets/photos/profiles/mistie.jpg",
      linkedin: "https://www.linkedin.com/in/mistiezheng/",
    },
    {
      name: "Katherine Y.",
      role: "Media & Marketing",
      photo: "/assets/photos/profiles/katherine.jpg",
      linkedin: "https://www.linkedin.com/in/27katherineyu/",
    },
    {
      name: "Ariana A.",
      role: "Technology",
      photo: "/assets/photos/profiles/ariana.jpg",
      linkedin: "https://www.linkedin.com/in/ariana-amiri",
    },
    {
      name: "Darius M.",
      role: "Alumni Engagement",
      photo: "/assets/photos/profiles/darius.jpg",
      linkedin: "https://www.linkedin.com/in/darius-mahjoob",
    },
    {
      name: "Anna C.",
      role: "Alumni Engagement",
      photo: "/assets/photos/profiles/anna.jpg",
      linkedin: "https://www.linkedin.com/in/annachi-usc",
    },
  ],

  associates: [
    {
      name: "Rena J.",
      role: "Human Resources",
      photo: "/assets/photos/profiles/rena.jpg",
      linkedin: "https://www.linkedin.com/in/renajeoung/",
    },
    {
      name: "Akshay M.",
      role: "Finance",
      photo: "/assets/photos/profiles/akhsay.jpg",
      linkedin: "https://www.linkedin.com/in/akshay-mediwala/",
    },
    {
      name: "Akash P.",
      role: "Recruitment",
      photo: "/assets/photos/profiles/akash.jpg",
      linkedin: "https://www.linkedin.com/in/akashparikh228/",
    },
    {
      name: "Samarth R.",
      role: "Recruitment",
      photo: "/assets/photos/profiles/samarth.jpg",
      linkedin: "https://www.linkedin.com/in/samarth-r/",
    },
    {
      name: "Cici H.",
      role: "External Affairs",
      photo: "/assets/photos/profiles/cici.jpg",
      linkedin: "https://www.linkedin.com/in/xi-li-he",
    },
    {
      name: "Chetan K.",
      role: "External Affairs",
      photo: "/assets/photos/profiles/chethan.jpg",
      linkedin: "https://www.linkedin.com/in/chetankurkure/",
    },
    {
      name: "Cherim K.",
      role: "Internal Affairs",
      photo: "/assets/photos/profiles/cherim.jpg",
      linkedin: "https://www.linkedin.com/in/cherimki/",
    },
    {
      name: "Nishitha P.",
      role: "Internal Affairs",
      photo: "/assets/photos/profiles/nishitha.jpg",
      linkedin: "https://www.linkedin.com/in/nishitha-pammidi",
    },
    {
      name: "Vani S.",
      role: "Media & Marketing",
      photo: "/assets/photos/profiles/vani.jpg",
      linkedin: "https://www.linkedin.com/in/vani-sharma-926738290/",
    },
    {
      name: "Cynthia S.",
      role: "Media & Marketing",
      photo: "/assets/photos/profiles/cynthia.jpg",
      linkedin: "https://www.linkedin.com/in/xinqishao/",
    },
    {
      name: "Allison L.",
      role: "Technology",
      photo: "/assets/photos/profiles/allison.jpg",
      linkedin: "https://www.linkedin.com/in/allisonlin9",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
//  Industry Mentors
// ─────────────────────────────────────────────────────────────────────────────

export const mentors: MentorCompany[] = [
  { name: "Accenture",      logo: "/assets/logos/accenture.png" },
  { name: "Bain & Company", logo: "/assets/logos/bain.jpg" },
  { name: "BCG",            logo: "/assets/logos/bcg.png" },
  { name: "KPMG",           logo: "/assets/logos/kpmg.png" },
  { name: "Grata",          logo: "/assets/logos/grata.png" },
  { name: "EY",             logo: "/assets/logos/ey.png" },
  { name: "Deloitte",       logo: "/assets/logos/deloitte.png" },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Alumni Placements
//  (Full-Time) or (Intern) prefix
// ─────────────────────────────────────────────────────────────────────────────

export const alumni: AlumniPlacement[] = [
  {
    company: "Bank of America",
    logo: "/assets/logos/bank-of-america-emblem.png",
    positions: ["(Full-Time) PM"],
  },
  {
    company: "EY",
    logo: "/assets/logos/ey.png",
    positions: ["(Intern) Process & Controls"],
  },
  {
    company: "JP Morgan",
    logo: "/assets/logos/jp.png",
    positions: ["(Intern) IB", "(Intern) Analyst"],
  },
  {
    company: "PwC",
    logo: "/assets/logos/pwc.png",
    positions: [
      "(Intern) Cyber Defense & Eng.",
      "(Intern) Cyber Risk & Reg.",
      "(Intern) Tech Consultant",
    ],
  },
  {
    company: "Northrop Grumman",
    logo: "/assets/logos/northrop.png",
    positions: ["(Intern) Cyber Info Assurance"],
  },
  {
    company: "Deloitte",
    logo: "/assets/logos/deloitte.png",
    positions: ["(Intern) Management Consulting"],
  },
  {
    company: "Disney",
    logo: "/assets/logos/disney.jpg",
    positions: ["(Intern) Corp. Enterprise Risk Mgmt."],
  },
  {
    company: "KPMG",
    logo: "/assets/logos/kpmg.png",
    positions: ["(Intern) Consultant"],
  },
  {
    company: "General Dynamics",
    logo: "/assets/logos/general_dynamics.jpg",
    positions: ["(Intern) Software Eng."],
  },
  {
    company: "DrFirst",
    logo: "/assets/logos/drfirst.png",
    positions: ["(Intern) Software Eng."],
  },
  {
    company: "US Bank",
    logo: "/assets/logos/usbank.png",
    positions: ["(Intern) PM"],
  },
  {
    company: "Accenture",
    logo: "/assets/logos/accenture.png",
    positions: ["(Intern) Consulting Analyst"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Client Portfolio
// ─────────────────────────────────────────────────────────────────────────────

const clients: ClientEngagement[] = [
  {
    name: "LinkedIn",
    logo: "/assets/logos/linked.svg",
    services: ["Business Strategy"],
  },
  {
    name: "AANC",
    logo: "/assets/logos/aanc.png",
    services: ["Design", "Technology"],
  },
  {
    name: "DoorDash",
    logo: "/assets/logos/doordash-logo.png",
    services: ["Business Strategy"],
  },
  {
    name: "GALLA Beauty",
    logo: "/assets/logos/galla.jpeg",
    services: ["Business Strategy"],
  },
  {
    name: "Mountain Dew",
    logo: "/assets/logos/mountain_dew_logo.svg.png",
    services: ["Business Strategy", "Design"],
  },
  {
    name: "Wheel & Tire Connection",
    logo: "/assets/logos/wtc.jpeg",
    services: ["Business Strategy", "Technology"],
  },
  {
    name: "XP League",
    logo: "/assets/logos/xp.jpg",
    services: ["Business Strategy"],
  },
  {
    name: "Maryland STEM Festival",
    logo: "/assets/logos/maryland.jpg",
    services: ["Marketing"],
  },
  {
    name: "Network of Care",
    logo: "/assets/logos/noc.png",
    services: ["Marketing", "Design", "Technology"],
  },
  {
    name: "Captis Intelligence",
    logo: "/assets/logos/captis.jpeg",
    services: ["Marketing", "Design", "Technology"],
  },
];

// Alias for pages that import clientCards
export const clientCards = clients;

// ─────────────────────────────────────────────────────────────────────────────
//  What We Do
// ─────────────────────────────────────────────────────────────────────────────

export const whatWeDo: WhatWeDoItem[] = [
  {
    title: "Client Reveal",
    desc: "Members are grouped into client teams based on their individual interests and skill sets each semester: your first real taste of live consulting.",
    icon: "01",
  },
  {
    title: "Curriculum Night",
    desc: "Structured sessions introducing key consulting concepts at every experience level, from frameworks to stakeholder management.",
    icon: "02",
  },
  {
    title: "Mini-Hackathons",
    desc: "Intra-org competitions for project-builders to practice their skills under pressure and compete for prizes.",
    icon: "03",
  },
  {
    title: "Industry Events",
    desc: "Exclusive panels, recruiting nights, office tours, and coffee chats with professionals at top consulting and tech firms.",
    icon: "04",
  },
  {
    title: "Coffee Chats",
    desc: "Algorithmically-paired weekly chats to build meaningful mentorships and friendships across the organization.",
    icon: "05",
  },
  {
    title: "Workshops",
    desc: "Resume reviews, case interview prep, and skill-building sessions designed to sharpen your edge for recruiting season.",
    icon: "06",
  },
  {
    title: "Case Competitions",
    desc: "Semesterly strategy competitions: plan, pitch, and present a full consulting deliverable in one hour. High pressure, high reward.",
    icon: "07",
  },
  {
    title: "Social Events",
    desc: "Beach hangouts, retreats, study sessions, and team dinners. We work hard and play harder. Community is the foundation of Avenues.",
    icon: "08",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Member Majors
// ─────────────────────────────────────────────────────────────────────────────

export const majors: string[] = [
  "Business Admin",
  "Computer Science",
  "Economics",
  "Art History",
  "Intelligence & Cyber Ops",
  "Public Policy",
  "Jazz Studies",
  "Real Estate",
  "Design",
  "BioPharm Marketing",
  "Financial Math",
  "Health Promotion",
  "Architecture",
  "Data Science",
  "Quant Bio",
  "Philosophy Politics & Econ",
  "Global Health",
  "Sociology",
  "Environmental Engineering",
  "International Relations",
  "Political Science",
  "Political Economy",
  "BioPharm Science",
  "Tech Design & Business",
];

// ─────────────────────────────────────────────────────────────────────────────
//  Project Types by Discipline
// ─────────────────────────────────────────────────────────────────────────────

export const strategyProjects: ProjectType[] = [
  {
    title: "General Business Strategy",
    desc: "End-to-end strategic roadmaps covering competitive landscape analysis, go-to-market planning, and prioritized recommendations tailored to each client's goals.",
    clients: "LinkedIn, DoorDash, XP League, GALLA Beauty",
  },
  {
    title: "Marketing Strategy & Planning",
    desc: "Brand positioning, audience segmentation, channel strategy, and campaign planning to help organizations reach and retain the right customers.",
    clients: "Maryland STEM Festival, Network of Care, Captis Intelligence",
  },
  {
    title: "Subscription Model Creation",
    desc: "Tier design, pricing analysis, churn mitigation frameworks, and revenue projection models for subscription-based and recurring-revenue businesses.",
    clients: "GALLA Beauty, Wheel & Tire Connection",
  },
  {
    title: "Customer Growth & Retention",
    desc: "Lifecycle mapping, loyalty program design, and data-driven playbooks to acquire new customers and deepen engagement with existing ones.",
    clients: "DoorDash, LinkedIn, XP League",
  },
  {
    title: "Event Strategizing & Planning",
    desc: "Logistics planning, stakeholder engagement strategy, sponsorship frameworks, and post-event impact measurement for mission-driven events.",
    clients: "Maryland STEM Festival, AANC",
  },
];

export const techProjects: ProjectType[] = [
  {
    title: "Website Creation (Custom)",
    desc: "Fully custom-coded websites and web applications built from scratch using modern frameworks, tailored precisely to each client's brand and functionality needs.",
    clients: "AANC, Network of Care, Captis Intelligence",
  },
  {
    title: "Website Creation (No-Code)",
    desc: "Fast, polished, and fully manageable websites built on no-code platforms, ideal for organizations that need a great web presence without ongoing dev overhead.",
    clients: "Wheel & Tire Connection, XP League",
  },
  {
    title: "Data Analysis",
    desc: "Structured data pipelines, exploratory analysis, and insight reporting to help organizations understand their metrics and make evidence-based decisions.",
    clients: "Captis Intelligence, Network of Care",
  },
];

export const designProjects: ProjectType[] = [
  {
    title: "Complete Brand Creation",
    desc: "Full brand identity systems built from the ground up: logo, color palette, typography, visual language, and brand guidelines for new or rebranding organizations.",
    clients: "GALLA Beauty, AANC",
  },
  {
    title: "Brand & Logo Modernization",
    desc: "Refreshing and evolving existing brand identities to feel contemporary and consistent across all digital and physical touchpoints.",
    clients: "Mountain Dew, Wheel & Tire Connection",
  },
  {
    title: "Web & Mobile UI/UX Design",
    desc: "User research, wireframing, prototyping, and high-fidelity UI design for web and mobile products, delivered as Figma handoffs or fully implemented.",
    clients: "Network of Care, Captis Intelligence, AANC",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  FAQ  -  Application
// ─────────────────────────────────────────────────────────────────────────────

export const faqApplication: FAQItem[] = [
  {
    q: "When can I apply?",
    a: "Avenues accepts new members at the start of each semester. Applications open during the first two weeks of the fall and spring semesters. Follow our Instagram @uscavenues for announcements on exact dates.",
  },
  {
    q: "Is prior consulting or business experience required?",
    a: "Not at all. We welcome students from all majors and backgrounds. What we look for is curiosity, a collaborative mindset, and a genuine desire to learn, not a polished resume.",
  },
  {
    q: "What does the application process look like?",
    a: "The process typically includes a written application followed by a brief interview. We want to learn about you, your interests, and how you think, not just your credentials.",
  },
  {
    q: "How much time does membership require?",
    a: "Expect to commit roughly 4–6 hours per week across client project work, org events, and curriculum nights. It's designed to be manageable alongside a full course load.",
  },
  {
    q: "Can first-year and transfer students apply?",
    a: "Yes, absolutely. We actively encourage first-years and transfers to apply. Many of our current leaders joined in their first semester at USC.",
  },
  {
    q: "What happens if I'm not accepted?",
    a: "We encourage you to reapply the following semester. Many members were not accepted on their first try. In the meantime, attend our open events to connect with the org and get a feel for what we do.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  FAQ  -  Organization
// ─────────────────────────────────────────────────────────────────────────────

export const faqOrg: FAQItem[] = [
  {
    q: "What makes Avenues different from other consulting clubs?",
    a: "We work on real, live engagements with actual clients, not case studies. Every member contributes to a deliverable that a real organization will act on. We also span three disciplines (strategy, tech, and design) under one roof, which makes our project teams genuinely multidisciplinary.",
  },
  {
    q: "What kinds of clients does Avenues work with?",
    a: "We partner with non-profits, early-stage startups, and established companies across a wide range of industries. All of our work is pro bono — our clients pay nothing, and our members build real skills in return.",
  },
  {
    q: "How are members placed on client teams?",
    a: "At the start of each semester we hold a Client Reveal: members are matched to client teams based on their stated interests, skillsets, and availability. We aim to give everyone a placement that both challenges and excites them.",
  },
  {
    q: "Does Avenues help with recruiting?",
    a: "Yes. In addition to the skills you build on client projects, we run workshops on resume writing, case interview prep, and networking. We also host industry events with professionals from top consulting, finance, and tech firms.",
  },
  {
    q: "Are there leadership opportunities within the org?",
    a: "Definitely. As you grow within Avenues, there are opportunities to take on director and associate leadership roles across departments including recruitment, technology, marketing, finance, and more.",
  },
  {
    q: "How does Avenues stay in touch with alumni?",
    a: "Our Alumni Engagement team maintains an active network of Avenues alumni now working at firms like Deloitte, JP Morgan, EY, Accenture, and more. Alumni mentor current members and participate in events throughout the year.",
  },
];
