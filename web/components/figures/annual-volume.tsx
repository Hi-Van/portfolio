import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { fact } from "../../content/facts";
import { compact } from "../../content/format";

const WIDTH = 900;
const HEIGHT = 320;
const MARGIN = { top: 24, right: 24, bottom: 44, left: 88 };

const DAYS = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
const MONTH_LABELS = ["Jan", "Apr", "Jul", "Dec"];

/**
 * Figure 4. Cumulative volume at the measured daily rate. visx supplies the
 * scales and the path; every mark and label takes a contract role, so no
 * library default reaches the drawing.
 */
export function AnnualVolume() {
  const daily = fact("submissions-per-day").value ?? 0;
  const total = fact("submissions-per-year").value ?? 0;
  const points = DAYS.map((day, index) => ({ month: index + 1, value: daily * day }));

  const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const x = scaleLinear<number>({ domain: [1, 12], range: [0, innerWidth] });
  const y = scaleLinear<number>({ domain: [0, total], range: [innerHeight, 0] });

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full"
      role="img"
      aria-label={`Cumulative line chart. Submissions accumulate from zero in January to ${compact(total)} by December, at a steady daily rate.`}
    >
      <Group left={MARGIN.left} top={MARGIN.top}>
        <line
          x1={0}
          y1={innerHeight}
          x2={innerWidth}
          y2={innerHeight}
          className="stroke-chart-baseline"
          strokeWidth="1"
        />
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={innerHeight}
          className="stroke-chart-axis"
          strokeWidth="1"
        />

        <LinePath
          data={points}
          x={(point) => x(point.month) ?? 0}
          y={(point) => y(point.value) ?? 0}
          className="stroke-indigo"
          strokeWidth="2.5"
          fill="none"
        />

        {MONTH_LABELS.map((label, index) => {
          const month = 1 + index * (11 / 3);
          return (
            <text
              key={label}
              x={x(month) ?? 0}
              y={innerHeight + 26}
              textAnchor={index === 0 ? "start" : index === 3 ? "end" : "middle"}
              className="fill-muted text-chart-narrow md:text-chart font-ui"
            >
              {label}
            </text>
          );
        })}

        <text x={0} y={-8} className="fill-muted text-chart-narrow md:text-chart font-ui">
          {compact(total)}
        </text>
      </Group>
    </svg>
  );
}
