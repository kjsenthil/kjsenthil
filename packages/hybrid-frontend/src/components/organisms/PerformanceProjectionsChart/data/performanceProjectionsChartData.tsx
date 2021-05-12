// TODO: switch to actual data when it's ready

import * as React from 'react';
import {
  PerformanceProjectionsDataState,
  usePerformanceProjectionsDataContext,
} from './performanceProjectionsChartDataContext';
import {
  GoalDatum,
  PerformanceHistoricalDatum,
  PerformanceProjectionsDatum,
} from './performanceProjectionsChartDataUtils';

export function useProjectionsData(): PerformanceProjectionsDatum[] {
  const {
    state: { projectionsData },
  } = usePerformanceProjectionsDataContext();

  return React.useMemo(() => projectionsData, []);
}

export function useHistoricalData(): PerformanceHistoricalDatum[] {
  const {
    state: { historicalData },
  } = usePerformanceProjectionsDataContext();

  return React.useMemo(() => historicalData, []);
}

export function useGoalsData(): GoalDatum[] {
  const {
    state: { goalsData },
  } = usePerformanceProjectionsDataContext();

  return React.useMemo(() => goalsData, []);
}

export function useMetadata(): PerformanceProjectionsDataState['metadata'] {
  const {
    state: { metadata },
  } = usePerformanceProjectionsDataContext();

  return React.useMemo(() => metadata, []);
}
