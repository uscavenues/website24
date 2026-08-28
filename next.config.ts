import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/basePath";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only — no Next.js server.
  output: "export",

  // TEMPORARY: the site is served from the /website24/ subpath while
  // uscavenues.org is on registrar clientHold. next/image and next/link
  // prefix this automatically. To move back to the domain root: delete
  // basePath, restore public/CNAME (git show 749a970:public/CNAME), and
  // set the custom domain in Settings > Pages.
  basePath: BASE_PATH,

  // Emit contact/index.html rather than contact.html, so /contact/ resolves
  // instead of 404ing. GitHub Pages redirects the bare /contact to it.
  trailingSlash: true,
  poweredByHeader: false,

  // No image optimizer on a static host. A custom loader (rather than
  // unoptimized: true) is required so basePath gets prefixed onto image
  // paths — next/image does not apply it to unoptimized src values.
  images: { loader: "custom", loaderFile: "./lib/imageLoader.ts" },

  // NOTE: headers() was removed — static hosting cannot set response headers.
  // The old cache-control and security headers (X-Frame-Options, nosniff,
  // Referrer-Policy) no longer apply. Put Cloudflare in front to restore them.
};

export default nextConfig;
