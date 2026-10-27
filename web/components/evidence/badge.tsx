import type { ReactNode } from "react";

/**
 * A fact about the person, not a category. Neutral fill, hairline border, no
 * accent: colour on a badge would claim one of the two meanings.
 */
export function Badge({
  children,
  icon,
}: {
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <span className="inline-flex min-h-8 items-center gap-1.5 rounded-fact border border-badge-line bg-badge px-2.5 font-ui text-label text-ink">
      {icon}
      {children}
    </span>
  );
}

export function LocationPin() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="text-muted"
    >
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}
