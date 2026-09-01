// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────

interface TeamMember {
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
  positions: string[]; // prefix: "Full-Time ·" or "Intern ·"
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
//  Sheet-managed content
//
//  Everything below comes from lib/content.json, which the Avenues Content
//  spreadsheet writes on "Publish to site". Do not hand-edit content.json —
//  the next publish overwrites it. Edit the sheet instead.
//  Static marketing copy (whatWeDo, project lists) stays in this file.
// ─────────────────────────────────────────────────────────────────────────────
import content from "./content.json";

/** Blank photo slug renders the neutral silhouette instead of a broken image. */
export const PROFILE_DIR = "/assets/photos/profiles";
export const LOGO_DIR = "/assets/logos";

const profilePath = (slug: string): string =>
  slug ? `${PROFILE_DIR}/${slug}.jpg` : "";
const logoPath = (file: string): string => (file ? `${LOGO_DIR}/${file}` : "");

const toMember = (m: {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
}): TeamMember => ({ ...m, photo: profilePath(m.photo) });

export interface SiteSettings {
  applicationsOpen: boolean;
  applicationFormUrl: string;
  applicationSeason: string;
  membersPassword: string;
}

export const settings: SiteSettings = {
  applicationsOpen: content.settings.applications_open,
  applicationFormUrl: content.settings.application_form_url,
  applicationSeason: content.settings.application_season,
  membersPassword: content.settings.members_password,
};

export const team: Team = {
  executive: content.team.executive.map(toMember),
  directors: content.team.directors.map(toMember),
  associates: content.team.associates.map(toMember),
};

export const mentors: MentorCompany[] = content.mentors.map((m) => ({
  name: m.name,
  logo: logoPath(m.logo),
}));

export const alumni: AlumniPlacement[] = content.alumni.map((a) => ({
  company: a.company,
  logo: logoPath(a.logo),
  positions: a.positions,
}));

const clients: ClientEngagement[] = content.clients.map((c) => ({
  name: c.name,
  logo: logoPath(c.logo),
  services: c.services,
}));
export const clientCards = clients;

export const majors: string[] = content.majors;

export const faqApplication: FAQItem[] = content.faq;
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
    desc: "Interest-matched weekly one-on-one coffee chats to build meaningful mentorships and friendships across the organization.",
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
