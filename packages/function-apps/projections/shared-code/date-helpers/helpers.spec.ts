import { monthsDiff } from "./helpers";

describe("Calculate number of months between two dates", () => {
  test("Between 2 simple dates with no potential errors", () => {
    let dateFrom: Date = new Date("1974-02-25T00:00:00");
    let dateTo: Date = new Date("1975-03-02T00:00:00");
    expect(monthsDiff(dateFrom, dateTo)).toBe(12);
  });
  test("Between 2 simple dates with the from date being after the to date", () => {
    let dateFrom: Date = new Date("1975-02-25T00:00:00");
    let dateTo: Date = new Date("1974-03-02T00:00:00");
    expect(monthsDiff(dateFrom, dateTo)).toBeLessThan(0);
  });
  test("Between 2 dates with to date being later in the year than from date", () => {
    let dateFrom: Date = new Date("1974-03-01T00:00:00");
    let dateTo: Date = new Date("1975-01-01T00:00:00");
    expect(monthsDiff(dateFrom, dateTo)).toBe(10);
  });
  test("Between 2 dates with to date being next month after from date with more than a month away", () => {
    let dateFrom: Date = new Date("1974-02-01T00:00:00");
    let dateTo: Date = new Date("1974-03-01T00:00:00");
    expect(monthsDiff(dateFrom, dateTo)).toBe(1);
  });
  test("Between 2 dates less than a month difference away", () => {
    let dateFrom: Date = new Date("1974-02-10T00:00:00");
    let dateTo: Date = new Date("1974-03-01T00:00:00");
    expect(monthsDiff(dateFrom, dateTo)).toBe(0);
  });
});
  