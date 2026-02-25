![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel&logoColor=white)

# Avenues Consulting Group — Website

The official website for **Avenues Consulting Group**, USC's student-run consulting organization spanning strategy, technology, and design. The site features a scroll-driven cinematic intro animation, portfolio showcase, member directory, and application flow — built pro bono as a reflection of the organization's standards and identity.

**Live:** [avenues-ten.vercel.app](https://avenues-ten.vercel.app)

> Screenshot

## Features

- **Scroll-driven hero animation** — the Avenues logo begins centered and large, then flies into its position as the wordmark "AVENUES CONSULTING GROUP" assembles in staggered sequence, all tied to scroll progress via Framer Motion
- **Three practice area pillars** — Strategy, Technology, and Design showcased with interactive hover effects and animated accent lines
- **Animated stats band** — live count-up counters (20+ client engagements, 24 majors represented, 100% pro bono) with per-stat unique hover states
- **Portfolio page** — case studies and client work organized by practice area, built as a client component for smooth transitions
- **Application flow** — `/apply` page with structured submission process for prospective members
- **Full multi-page site** — About, Community, Members, Contact, and Portfolio sections with scroll-reveal animations and page transitions

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS |
| Typography | Geist (Vercel) |
| Animation | Framer Motion |
| Deployment | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # Production build
npm start       # Production server
npm run lint    # ESLint check
```

## Project Structure

```
avenues-website/
├── app/
│   ├── page.tsx          # Homepage: scroll-driven hero + pillars + stats
│   ├── about/            # About page (AboutClient.tsx)
│   ├── apply/            # Member application page
│   ├── community/        # Community page
│   ├── members/          # Member directory
│   ├── portfolio/        # Client work + case studies
│   └── contact/          # Contact form
├── components/
│   ├── Nav.tsx           # Top navigation
│   ├── Footer.tsx        # Site footer
│   ├── ScrollReveal.tsx  # Intersection Observer fade-in wrapper
│   ├── PageTransition.tsx
│   └── ScrollToTop.tsx
├── assets/               # Photos and icons (including avenues-logo.png)
└── public/
```

## About Avenues

Avenues Consulting Group is USC's student-run consulting organization. We partner with companies and nonprofits on strategy, technology, and design engagements — always pro bono, always built for impact. Since Fall 2023, we've completed 20+ client engagements across industries, with members representing 24+ majors.

## Author

**Caleb Newton** — [calebnewton.me](https://calebnewton.me)
