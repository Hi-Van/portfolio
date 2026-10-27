import type { ReactNode } from "react";

/**
 * The skip link's target. It is focusable only programmatically, so following
 * the link moves the reader into the content without adding a tab stop.
 */
export function PageMain({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main id="main" tabIndex={-1} className={className}>
      {children}
    </main>
  );
}
