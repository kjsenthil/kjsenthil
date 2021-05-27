export enum PerformanceDataPeriod {
  '1M' = '1m',
  '3M' = '3m',
  '6M' = '6m',
  '1Y' = '1y',
  'ALL_TIME' = 'alltime',
}

// Use this to (roughly) split historical performance data
export const sliceIndexBasedOnPeriod: Record<PerformanceDataPeriod, number> = {
  [PerformanceDataPeriod['1M']]: 30,
  [PerformanceDataPeriod['3M']]: 60,
  [PerformanceDataPeriod['6M']]: 180,
  [PerformanceDataPeriod['1Y']]: 360,
  [PerformanceDataPeriod.ALL_TIME]: 0,
};
