import { fact, factValue } from "../../content/facts";

const COLUMNS = 13;
const SIZE = 34;
const GAP = 8;

/**
 * Figure 3. One second of pipeline against one person's filing, drawn as one
 * cell per person-day. The count comes from the registry, and the cells are
 * generated at build time, so the figure is complete with scripting disabled.
 */
export function UnitGrid() {
  const entry = fact("filing-person-days");
  const count = factValue("filing-person-days");
  const rows = Math.ceil(count / COLUMNS);
  const height = 120 + rows * (SIZE + GAP) + 44;
  const cells = Array.from({ length: count }, (_, index) => ({
    x: 60 + (index % COLUMNS) * (SIZE + GAP),
    y: 120 + Math.floor(index / COLUMNS) * (SIZE + GAP),
  }));

  return (
    <svg
      viewBox={`0 0 900 ${height}`}
      className="w-full"
      role="img"
      aria-label={`Unit chart. One second of pipeline output equals ${entry.display} person-days of manual filing, drawn as one bar and ${entry.display} squares.`}
    >
      <rect
        x="60"
        y="40"
        width="60"
        height="34"
        rx="3"
        className="fill-indigo"
      />
      <text x="132" y="63" className="fill-ink text-chart font-ui">
        one second of pipeline
      </text>

      <text
        x="60"
        y="104"
        className="fill-muted text-chart-narrow md:text-chart font-ui"
      >
        {entry.display} person-days of filing
      </text>

      {cells.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          x={cell.x}
          y={cell.y}
          width={SIZE}
          height={SIZE}
          rx="3"
          className="fill-chart-cell"
        />
      ))}
    </svg>
  );
}
