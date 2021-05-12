export interface GetPerformanceDataResponse {
  // All numbers have 2 decimal places
  Data: {
    Type: 'performance';
    Id: string;
    Attributes: {
      AccountValue: number;
      Performance: {
        Value: number;
        Percentage: number; // This is a float. 50% will be 50.00
      };
      Values: Array<{ Date: string; Value: number }>;
    };
    Links: {
      self: string;
    };
    Relationships: {
      contributions: {
        Links: {
          related: string;
        };
        Data: {
          Type: 'contributions';
          Id: string;
        };
      };
    };
  };
  Included: Array<{
    // All numbers have 3 decimal places
    Type: 'contributions';
    Id: string;
    Attributes: {
      TotalContributions: number;
      Contributions: Array<{ Date: string; NetContributionsToDate: number }>;
    };
    Links: {
      self: string;
    };
    Relationships: null;
  }>;
}

export interface TimeSeriesDatum {
  date: Date;
  value: number;
}

export interface PerformanceDatum extends TimeSeriesDatum {
  metadata?: Record<string, unknown>;
}

export interface ContributionDatum extends TimeSeriesDatum {
  metadata?: Record<string, unknown>;
}

export enum PerformanceChartPeriod {
  '1M' = '1m',
  '3M' = '3m',
  '6M' = '6m',
  '1Y' = '1y',
  'ALL_TIME' = 'alltime',
}

export function sortTimeSeries<TS extends TimeSeriesDatum>(
  timeSeriesData: TS[],
  direction: 'asc' | 'desc' = 'asc'
): TS[] {
  return [...timeSeriesData].sort((d1, d2) =>
    direction === 'asc'
      ? d2.date.getTime() - d1.date.getTime()
      : d1.date.getTime() - d2.date.getTime()
  );
}

export function getTimeSeriesMinMax<TS extends TimeSeriesDatum>(timeSeriesData: TS[]) {
  if (timeSeriesData.length === 0) {
    return {
      minDate: new Date(0),
      maxDate: new Date(0),
      minValue: 0,
      maxValue: 0,
    };
  }

  let minDate = timeSeriesData[0].date;
  let maxDate = timeSeriesData[0].date;
  let minValue = timeSeriesData[0].value;
  let maxValue = timeSeriesData[0].value;

  timeSeriesData.forEach(({ date, value }) => {
    if (date > maxDate) maxDate = date;
    if (date < minDate) minDate = date;
    if (value > maxValue) maxValue = value;
    if (value < minValue) minValue = value;
  });

  return {
    minDate,
    maxDate,
    minValue,
    maxValue,
  };
}

export function timeSeriesDateAccessor(d: TimeSeriesDatum) {
  return d.date;
}

export function timeSeriesValueAccessor(d: TimeSeriesDatum) {
  return d.value;
}
