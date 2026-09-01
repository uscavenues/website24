// Single source of truth for basePath. Imported by next.config.ts, the image
// loader, and PageTransition so there is exactly one place to change when
// uscavenues.org comes off registrar clientHold and the site moves back to
// the domain root (set to "" then).
export const BASE_PATH = "";
