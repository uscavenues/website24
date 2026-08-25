import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only — no Next.js server.
  output: "export",
  poweredByHeader: false,

  // No image optimizer on a static host; images serve as-is.
  images: { unoptimized: true },

  // NOTE: headers() was removed — static hosting cannot set response headers.
  // The old cache-control and security headers (X-Frame-Options, nosniff,
  // Referrer-Policy) no longer apply. Put Cloudflare in front to restore them.
};

export default nextConfig;
