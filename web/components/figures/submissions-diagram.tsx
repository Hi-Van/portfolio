const SUBMISSIONS = [
  { supplier: "Supplier A", name: "Navy tee, M" },
  { supplier: "Supplier B", name: "Tee / Navy / Medium" },
  { supplier: "Supplier C", name: "T-SHIRT NVY MD" },
];

/**
 * Figure 1. A diagram, not a chart: three submissions resolving to one record.
 * Built from markup so it is complete without scripting and scales as text.
 */
export function SubmissionsDiagram() {
  return (
    <div className="grid items-center gap-4 sm:grid-cols-3">
      <ul className="flex flex-col gap-2">
        {SUBMISSIONS.map((submission) => (
          <li
            key={submission.supplier}
            className="rounded-fact border border-line-strong bg-paper px-3 py-2"
          >
            <span className="block font-ui text-caps tracking-caps text-muted uppercase">
              {submission.supplier}
            </span>
            <span className="block font-ui text-label text-ink">
              {submission.name}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-center font-ui text-caption text-muted">
        the same garment?
        <span aria-hidden="true" className="mt-1 block text-ink">
          &rarr;
        </span>
      </p>

      <div className="rounded-panel border border-line-strong bg-paper px-4 py-3">
        <span className="block font-display text-serif-label text-ink">
          Crew tee, Navy
        </span>
        <span className="mt-1 block font-ui text-label text-muted">
          SKU CT-NVY-M
        </span>
        <span className="mt-1 block font-ui text-label text-muted">
          Apparel / Tops / Tees
        </span>
      </div>
    </div>
  );
}
