export interface TimeSeriesDatum {
  Date: Date;
  Value: number;
}

export interface PerformanceProjectionsDatum extends TimeSeriesDatum {
  ValueGood: number;
  ValueBad: number;
  NetContributionsToDate: number;

  // This is the datum for the orange "goals not met" line
  ValueGoalNotMet?: number;

  metadata?: Record<string, unknown>;
}

export interface PerformanceHistoricalDatum extends TimeSeriesDatum {
  metadata?: Record<string, unknown>;
}

export interface GoalDatum {
  Date: Date;
  Progress: number;
  Label: string;
  Icon: string;
}

export interface GetPerformanceProjectionsDataResponse {
  Data: PerformanceProjectionsDatum[];
}

export function dateAccessor(d: TimeSeriesDatum): Date {
  return d.Date;
}

export function valueGoodAccessor(d: PerformanceProjectionsDatum): number {
  return d.ValueGood;
}

export function valueBadAccessor(d: PerformanceProjectionsDatum): number {
  return d.ValueBad;
}

export function valueAccessor(d: PerformanceProjectionsDatum): number {
  return d.Value;
}

export function valueDefinedFactory(
  zeroValueYear: number
): (d: PerformanceProjectionsDatum) => boolean {
  return (d: PerformanceProjectionsDatum) => d.Date.getFullYear() <= zeroValueYear;
}

export function contributionsAccessor(d: PerformanceProjectionsDatum): number {
  return d.NetContributionsToDate;
}

export function goalNotMetAccessor(d: PerformanceProjectionsDatum): number {
  return d.ValueGoalNotMet ?? 0;
}

export function getPerformanceProjectionsDataMinValue(data: PerformanceProjectionsDatum[]): number {
  return data.reduce(
    (curMin, { ValueGood, Value, ValueBad, NetContributionsToDate }) =>
      Math.min(curMin, ValueGood, Value, ValueBad, NetContributionsToDate),
    Infinity
  );
}

export function getPerformanceProjectionsDataMaxValue(data: PerformanceProjectionsDatum[]): number {
  return data.reduce(
    (curMin, { ValueGood, Value, ValueBad, NetContributionsToDate }) =>
      Math.max(curMin, ValueGood, Value, ValueBad, NetContributionsToDate),
    -Infinity
  );
}
