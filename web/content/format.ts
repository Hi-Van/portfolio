/** Display formatting for figures drawn in SVG, where a fact's own display is too long. */

export function compact(value: number): string {
  if (value >= 1_000_000)
    return `${(Math.round(value / 100_000) / 10).toFixed(1)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
  return String(value);
}

export function grouped(value: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}
