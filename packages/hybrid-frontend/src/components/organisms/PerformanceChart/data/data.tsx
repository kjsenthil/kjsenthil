// TODO: switch to actual data when it's ready

import * as React from 'react';
import mockData from './mock-data.json';
import { usePerformanceDataContext } from './dataContext';
import { ContributionDatum, PerformanceChartPeriod, PerformanceDatum } from './utils';

// TODO: this config object is a mock one. This kind of data operation should
//  probably come from the API
const sliceIndexBasedOnPeriod: Record<PerformanceChartPeriod, number> = {
  [PerformanceChartPeriod['1M']]: 30,
  [PerformanceChartPeriod['3M']]: 60,
  [PerformanceChartPeriod['6M']]: 180,
  [PerformanceChartPeriod['1Y']]: 360,
  [PerformanceChartPeriod.ALL_TIME]: 0,
};

export function usePerformanceDataSummary(): {
  totalPerformance: number;
  totalContributions: number;
  totalReturn: number;
  totalReturnPct: number;
} {
  const {
    state: { dataStore, dataStoreId },
  } = usePerformanceDataContext();

  return React.useMemo(() => {
    const data = dataStore[`${dataStoreId}`];

    if (!data) {
      return {
        totalPerformance: 0,
        totalContributions: 0,
        totalReturn: 0,
        totalReturnPct: 0,
      };
    }

    return {
      totalPerformance: data.Data.Attributes.AccountValue,
      totalContributions: data.Included[0].Attributes.TotalContributions,
      totalReturn: data.Data.Attributes.Performance.Value,
      totalReturnPct: data.Data.Attributes.Performance.Percentage / 100,
    };
  }, [dataStoreId]);
}

export function usePerformanceData(): PerformanceDatum[] {
  const {
    state: { dataStore, dataStoreId, dataPeriod },
  } = usePerformanceDataContext();

  return React.useMemo(() => {
    const data = dataStore[`${dataStoreId}`];

    if (!data) {
      return [];
    }

    return (
      data.Data.Attributes.Values.map((d) => ({
        date: new Date(d.Date),
        value: d.Value,
      }))
        // TODO: temporary method to retrieve period data. The -1 is because
        //  the last point in our mock dataset is uneven and will screw up the
        //  chart's presentation
        .slice(-sliceIndexBasedOnPeriod[dataPeriod], -1)
    );
  }, [dataStoreId, dataPeriod]);
}

export function useContributionsData(): ContributionDatum[] {
  const {
    state: { dataStore, dataStoreId, dataPeriod },
  } = usePerformanceDataContext();

  return React.useMemo(() => {
    const data = dataStore[`${dataStoreId}`];

    if (!data) {
      return [];
    }

    return (
      mockData.Included[0].Attributes.Contributions.map((d) => ({
        date: new Date(d.Date),
        value: d.NetContributionsToDate,
      }))
        // TODO: temporary method to retrieve period data. The -1 is because
        //  the last point in our mock dataset is uneven and will screw up the
        //  chart's presentation
        .slice(-sliceIndexBasedOnPeriod[dataPeriod], -1)
    );
  }, [dataStoreId, dataPeriod]);
}

export function usePerformanceDataPeriod(): PerformanceChartPeriod {
  const {
    state: { dataPeriod },
  } = usePerformanceDataContext();

  return dataPeriod;
}
