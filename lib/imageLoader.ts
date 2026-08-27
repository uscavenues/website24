// Static export has no image optimizer, so this loader does no resizing.
// It does two things: serve the WebP variant of every image, and prefix
// basePath, which next/image does not apply on its own.
//
// Images are pre-converted to .webp at their display size. The .jpg/.png
// originals for og:image and JSON-LD are kept on disk deliberately —
// several social scrapers handle WebP poorly — and those tags reference
// them directly rather than through this loader.
export default function imageLoader({ src }: { src: string }): string {
  const webp = src.replace(/\.(jpe?g|png)$/i, ".webp");
  return webp.startsWith("/") ? `/website24${webp}` : webp;
}
