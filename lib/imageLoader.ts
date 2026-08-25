// Static export has no image optimizer, so this loader does no resizing —
// it exists only to prefix basePath onto public/ image paths, which
// next/image does not do on its own.
export default function imageLoader({ src }: { src: string }): string {
  return src.startsWith("/") ? `/website24${src}` : src;
}
