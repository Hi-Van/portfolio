import { site } from "../../content/site";

/**
 * The one filled invitation. A document surface may repeat it in its closing
 * block; nothing else on the site is a filled invitation.
 */
export function ContactPill({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={`mailto:${site.email}`}
      className={`inline-flex min-h-11 items-center rounded-pill bg-ink font-medium text-paper transition-colors duration-200 hover:bg-ink/90 ${
        compact ? "px-4 text-label" : "px-5 text-label"
      }`}
    >
      Contact
    </a>
  );
}
