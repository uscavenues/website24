import { MetadataRoute } from "next";

// Required by output: "export" — the route is fully static.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.uscavenues.org";
  const pages = ["/", "/about", "/community", "/apply", "/portfolio", "/contact"];
  return pages.map((path) => ({
    // trailing slash to match trailingSlash:true and the canonical og:url
    url: `${base}${path === "/" ? "/" : `${path}/`}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}
