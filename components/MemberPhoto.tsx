import Image from "next/image";

/**
 * A member's headshot, or a neutral silhouette when there isn't one yet.
 *
 * Photos are a dev task: someone is added to the Avenues Content sheet the
 * moment they join, but their headshot lands later. A blank `photo` cell is
 * the expected state in between, not an error — so it renders a placeholder
 * rather than a broken image. (A non-blank slug with no matching file IS an
 * error, and the content validator refuses to publish it.)
 *
 * Drop-in for the `<Image fill>` it replaces: same props, same positioning,
 * so it must live inside a `relative` container.
 */
export default function MemberPhoto({
  photo,
  name,
  className = "",
  sizes,
}: {
  photo: string;
  name: string;
  className?: string;
  sizes: string;
}) {
  if (photo) {
    return <Image src={photo} alt={name} fill className={className} sizes={sizes} />;
  }

  return (
    <div
      role="img"
      aria-label={`${name} — no photo yet`}
      className="absolute inset-0 flex items-center justify-center bg-white/[0.04]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-1/2 w-1/2 text-white/[0.13]"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M12 14c-4.42 0-8 2.46-8 5.5V21h16v-1.5c0-3.04-3.58-5.5-8-5.5Z" />
      </svg>
    </div>
  );
}
