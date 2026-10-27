import type { ReactNode } from "react";

/** A panel, a caption that states the assumption, and the figure number. */
export function Figure({
  id,
  number,
  caption,
  children,
}: {
  id?: string;
  number: number;
  caption: string;
  children: ReactNode;
}) {
  const captionId = `figure-${number}-caption`;
  return (
    <figure id={id} aria-labelledby={captionId} className="mt-block">
      <div className="rounded-panel bg-panel p-4">{children}</div>
      <figcaption
        id={captionId}
        className="mt-3 font-ui text-caption text-muted"
      >
        <b className="font-semibold text-ink">Figure {number}</b> {caption}
      </figcaption>
    </figure>
  );
}
