"use client";

import { Slider } from "@base-ui/react/slider";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Area, LinePath } from "@visx/shape";
import { useMemo, useState } from "react";
import { fact } from "../../content/facts";
import { report } from "../../content/report";
import { Figure } from "../figures/figure";
import { compact, grouped } from "../../content/format";
import { DEFAULT_ASSUMPTIONS, sellerHoursReturned } from "../../content/model";

const WIDTH = 900;
const HEIGHT = 380;
const MARGIN = { top: 24, right: 24, bottom: 44, left: 88 };
const DAYS = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

const SHARE_RANGE = { min: 5, max: 100, step: 5 };
const MINUTES_RANGE = { min: 2, max: 12, step: 1 };

/**
 * The model. Two assumptions the reader controls, one derived output, and the
 * figure that shows the gap between today's sessions and shorter ones. The
 * arithmetic lives in content/model.ts and is shared with the prerender.
 */
export function Model() {
  const daily = fact("submissions-per-day").value ?? 0;
  const reduction = (fact("session-shorter").value ?? 0) / 100;

  const [share, setShare] = useState(Math.round(DEFAULT_ASSUMPTIONS.humanShare * 100));
  const [minutes, setMinutes] = useState(DEFAULT_ASSUMPTIONS.sessionMinutes);

  const series = useMemo(() => {
    const humanShare = share / 100;
    const today = (day: number) =>
      sellerHoursReturned({
        submissionsPerDay: daily,
        humanShare,
        sessionMinutes: minutes,
        sessionReduction: 1,
      }) * (day / 365);
    const shorter = (day: number) =>
      sellerHoursReturned({
        submissionsPerDay: daily,
        humanShare,
        sessionMinutes: minutes,
        sessionReduction: reduction,
      }) * (day / 365);
    const points = DAYS.map((day, index) => ({
      month: index + 1,
      today: today(day),
      shorter: shorter(day),
    }));
    return { points, max: today(365) };
  }, [daily, minutes, reduction, share]);

  const returned = sellerHoursReturned({
    submissionsPerDay: daily,
    humanShare: share / 100,
    sessionMinutes: minutes,
    sessionReduction: reduction,
  });

  const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const x = scaleLinear<number>({ domain: [1, 12], range: [0, innerWidth] });
  const y = scaleLinear<number>({ domain: [0, series.max], range: [innerHeight, 0] });

  return (
    <Figure number={5} caption={report.figures.fig5}>
      <p className="font-display text-display-page tracking-display text-indigo">
        {grouped(returned)}
      </p>
      <p className="font-ui text-label text-muted">seller-hours returned in a year</p>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mt-6 w-full"
        role="img"
        aria-label={`Cumulative seller hours at two session lengths. The band is the time returned, ${grouped(returned)} hours over the year at these assumptions.`}
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
          <Area
            data={series.points}
            x={(point) => x(point.month) ?? 0}
            y0={(point) => y(point.today) ?? 0}
            y1={(point) => y(point.shorter) ?? 0}
            className="fill-band"
          />
          <LinePath
            data={series.points}
            x={(point) => x(point.month) ?? 0}
            y={(point) => y(point.today) ?? 0}
            className="stroke-muted"
            strokeWidth="2"
            fill="none"
          />
          <LinePath
            data={series.points}
            x={(point) => x(point.month) ?? 0}
            y={(point) => y(point.shorter) ?? 0}
            className="stroke-indigo"
            strokeWidth="2.5"
            fill="none"
          />
          <text x={0} y={-8} className="fill-muted text-chart-narrow md:text-chart font-ui">
            {compact(series.max)}
          </text>
          <text x={innerWidth} y={innerHeight + 26} textAnchor="end" className="fill-muted text-chart-narrow md:text-chart font-ui">
            Dec
          </text>
        </Group>
      </svg>

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-ui text-caption text-muted">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="block h-0.5 w-5 bg-muted" />
          <dt>Sessions at today's length</dt>
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="block h-0.5 w-5 bg-indigo" />
          <dt>Sessions {fact("session-shorter").display} shorter</dt>
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="block h-2 w-5 rounded-fact bg-band" />
          <dt>Time returned</dt>
        </div>
      </dl>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 font-ui text-label text-ink">
          <span className="flex items-baseline justify-between gap-3">
            <span>Share of traffic done by a person</span>
            <output className="font-semibold tabular-nums text-clay">{share}%</output>
          </span>
          <Slider.Root
            value={share}
            onValueChange={(value) => setShare(Number(value))}
            min={SHARE_RANGE.min}
            max={SHARE_RANGE.max}
            step={SHARE_RANGE.step}
          >
            <Slider.Control className="flex h-11 items-center">
              <Slider.Track className="h-1.5 w-full rounded-pill bg-line">
                <Slider.Indicator className="rounded-pill bg-clay" />
                <Slider.Thumb
                  className="grid size-11 place-items-center bg-transparent"
                  getAriaLabel={() => "Share of traffic done by a person"}
                  getAriaValueText={(formatted) => `${formatted} percent`}
                >
                  <span className="block size-5 rounded-pill bg-clay" />
                </Slider.Thumb>
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </label>

        <label className="flex flex-col gap-2 font-ui text-label text-ink">
          <span className="flex items-baseline justify-between gap-3">
            <span>Baseline session</span>
            <output className="font-semibold tabular-nums text-clay">{minutes} min</output>
          </span>
          <Slider.Root
            value={minutes}
            onValueChange={(value) => setMinutes(Number(value))}
            min={MINUTES_RANGE.min}
            max={MINUTES_RANGE.max}
            step={MINUTES_RANGE.step}
          >
            <Slider.Control className="flex h-11 items-center">
              <Slider.Track className="h-1.5 w-full rounded-pill bg-line">
                <Slider.Indicator className="rounded-pill bg-clay" />
                <Slider.Thumb
                  className="grid size-11 place-items-center bg-transparent"
                  getAriaLabel={() => "Baseline session length in minutes"}
                  getAriaValueText={(formatted) => `${formatted} minutes`}
                >
                  <span className="block size-5 rounded-pill bg-clay" />
                </Slider.Thumb>
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </label>
      </div>

      <p className="mt-4 font-ui text-caption text-muted">
        One assumption is fixed: {fact("seconds-per-record").display} to file a
        record by hand. It is stated, not adjustable.
      </p>

      <button
        type="button"
        onClick={() => {
          setShare(Math.round(DEFAULT_ASSUMPTIONS.humanShare * 100));
          setMinutes(DEFAULT_ASSUMPTIONS.sessionMinutes);
        }}
        className="mt-4 inline-flex min-h-11 items-center rounded-action border border-line-strong px-4 font-ui text-label text-ink transition-colors duration-200 hover:bg-hover"
      >
        Reset assumptions
      </button>
    </Figure>
  );
}
