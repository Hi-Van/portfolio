/**
 * The report's arithmetic, in one place. A build-time render and the reader's
 * controls both call these functions, so the formula exists once.
 */

export type Assumptions = {
  secondsPerRecord: number;
  /** A share between 0 and 1. */
  humanShare: number;
  sessionMinutes: number;
};

/** The values the printed report uses, and the values the prerender starts from. */
export const DEFAULT_ASSUMPTIONS: Assumptions = {
  secondsPerRecord: 20,
  humanShare: 0.25,
  sessionMinutes: 6,
};

export const DAYS_PER_YEAR = 365;

/** Annual submissions, from a measured daily rate. */
export function annualSubmissions(perDay: number): number {
  return perDay * DAYS_PER_YEAR;
}

/** Hours a person needs to file one second of pipeline output. */
export function filingHoursPerSecond(
  recordsPerSecond: number,
  secondsPerRecord: number,
): number {
  return (recordsPerSecond * secondsPerRecord) / 3600;
}

/**
 * Seller hours returned a year. Volume is the measured daily rate; the human
 * share and the session length are assumptions; the cut is measured.
 */
export function sellerHoursReturned(input: {
  submissionsPerDay: number;
  humanShare: number;
  sessionMinutes: number;
  sessionReduction: number;
}): number {
  const sessions =
    annualSubmissions(input.submissionsPerDay) * input.humanShare;
  const minutes = sessions * input.sessionMinutes;
  return (minutes / 60) * input.sessionReduction;
}

/** The model at the default assumptions, which is what the report prints. */
export function defaultOutput(input: {
  submissionsPerDay: number;
  recordsPerSecond: number;
  sessionReduction: number;
}): {
  submissionsPerYear: number;
  filingHoursPerSecond: number;
  sellerHours: number;
} {
  return {
    submissionsPerYear: annualSubmissions(input.submissionsPerDay),
    filingHoursPerSecond: filingHoursPerSecond(
      input.recordsPerSecond,
      DEFAULT_ASSUMPTIONS.secondsPerRecord,
    ),
    sellerHours: sellerHoursReturned({
      submissionsPerDay: input.submissionsPerDay,
      humanShare: DEFAULT_ASSUMPTIONS.humanShare,
      sessionMinutes: DEFAULT_ASSUMPTIONS.sessionMinutes,
      sessionReduction: input.sessionReduction,
    }),
  };
}

/** Clamps a control value into the range the slider allows. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
