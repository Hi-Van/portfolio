import Link from "next/link";
import type { ReturnKey } from "../../content/site";

/**
 * A link that reads as a switch and states its position with aria-current.
 * It is navigation, not a control, so it does not claim a switch role.
 */
export function AskSwitch({
  current,
  from,
}: {
  current: boolean;
  from: ReturnKey;
}) {
  return (
    <Link
      href={current ? "/ask" : `/ask?from=${from}`}
      aria-current={current ? "page" : undefined}
      className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-line-strong px-3 text-label text-ink transition-colors duration-200 hover:bg-hover"
    >
      <span
        aria-hidden="true"
        className="relative block h-4 w-7 rounded-pill bg-line-strong"
      >
        <span
          className={`absolute top-0.5 left-0.5 block size-3 rounded-pill bg-ink transition-transform duration-200 ${
            current ? "translate-x-3" : ""
          }`}
        />
      </span>
      Ask
    </Link>
  );
}
