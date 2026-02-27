/**
 * JsonLd — renders structured data as a JSON-LD script tag.
 * Centralises the dangerouslySetInnerHTML usage so it doesn't
 * appear inline in layout files.
 */

type JsonLdData = Record<string, unknown>;

export default function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
