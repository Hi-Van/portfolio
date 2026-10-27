import { expect, test } from "vitest";
import {
  annualSubmissions,
  clamp,
  DEFAULT_ASSUMPTIONS,
  defaultOutput,
  filingHoursPerSecond,
  sellerHoursReturned,
} from "../../content/model";

test("annual submissions at the measured daily rate", () => {
  expect(annualSubmissions(390_000)).toBe(142_350_000);
});

test("one second of pipeline output is about 104 person-days", () => {
  const hours = filingHoursPerSecond(450_000, 20);
  expect(hours).toBe(2_500);
  expect(hours / 24).toBeCloseTo(104.17, 1);
});

test("the default assumptions return 782,925 seller hours", () => {
  const hours = sellerHoursReturned({
    submissionsPerDay: 390_000,
    humanShare: DEFAULT_ASSUMPTIONS.humanShare,
    sessionMinutes: DEFAULT_ASSUMPTIONS.sessionMinutes,
    sessionReduction: 0.22,
  });
  expect(Math.round(hours)).toBe(782_925);
});

test("doubling the human share doubles the returned hours", () => {
  const base = {
    submissionsPerDay: 390_000,
    sessionMinutes: 6,
    sessionReduction: 0.22,
  };
  const single = sellerHoursReturned({ ...base, humanShare: 0.25 });
  const double = sellerHoursReturned({ ...base, humanShare: 0.5 });
  expect(double / single).toBeCloseTo(2, 6);
});

test("the default output matches the facts the prose states", () => {
  const output = defaultOutput({
    submissionsPerDay: 390_000,
    recordsPerSecond: 450_000,
    sessionReduction: 0.22,
  });
  expect(output.submissionsPerYear).toBe(142_350_000);
  expect(output.filingHoursPerSecond).toBe(2_500);
  expect(Math.round(output.sellerHours)).toBe(782_925);
});

test("clamp keeps a control inside its range", () => {
  expect(clamp(0, 5, 100)).toBe(5);
  expect(clamp(150, 5, 100)).toBe(100);
  expect(clamp(25, 5, 100)).toBe(25);
});

test("the session length control moves the returned hours", () => {
  const base = {
    submissionsPerDay: 390_000,
    humanShare: 0.25,
    sessionReduction: 0.22,
  };
  const six = sellerHoursReturned({ ...base, sessionMinutes: 6 });
  const twelve = sellerHoursReturned({ ...base, sessionMinutes: 12 });
  expect(twelve / six).toBeCloseTo(2, 6);
});

test("the defaults are the values the report prints", () => {
  expect(DEFAULT_ASSUMPTIONS).toEqual({
    secondsPerRecord: 20,
    humanShare: 0.25,
    sessionMinutes: 6,
  });
});
