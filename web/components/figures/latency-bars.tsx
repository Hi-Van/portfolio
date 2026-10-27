import { factValue } from "../../content/facts";

export function LatencyBars() {
  const baseline = 250;
  const scale = 1.8;
  /** Indexed to the pre-cleanup baseline, so the two bars are the whole figure. */
  const index = { before: 100, after: 100 - factValue("queries-faster") };
  const bars = [
    { label: "before", value: index.before, x: 250, fill: "fill-chart-cell" },
    { label: "after", value: index.after, x: 520, fill: "fill-indigo" },
  ];

  return (
    <svg
      viewBox="0 0 900 300"
      className="w-full"
      role="img"
      aria-label={`Bar chart. Query latency indexed to the pre-cleanup baseline: ${index.before} before the cleanup, ${index.after} after.`}
    >
      <line
        x1="200"
        y1={baseline}
        x2="700"
        y2={baseline}
        className="stroke-chart-baseline"
        strokeWidth="1"
      />
      {bars.map((bar) => {
        const height = bar.value * scale;
        return (
          <g key={bar.label}>
            <rect
              x={bar.x}
              y={baseline - height}
              width="140"
              height={height}
              className={bar.fill}
            />
            <text
              x={bar.x + 70}
              y={baseline - height - 14}
              textAnchor="middle"
              className="fill-ink text-chart-value-narrow md:text-chart-value font-ui"
            >
              {bar.value}
            </text>
            <text
              x={bar.x + 70}
              y={baseline + 26}
              textAnchor="middle"
              className="fill-muted text-chart-narrow md:text-chart font-ui"
            >
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
