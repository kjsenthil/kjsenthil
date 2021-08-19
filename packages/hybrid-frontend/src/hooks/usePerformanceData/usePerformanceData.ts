import { useSelector } from 'react-redux';
import { mapPerformanceData } from '@tsw/react-components';
import filterAndMapPerformanceData from '../../services/performance/utils/filterAndMapPerformanceData';
import { RootState } from '../../store';

export interface UsePerformanceDataProps {
  // If true, will ignore performance data period (will always return the full
  // set of data. This is useful for projections chart historical portion, for
  // example.
  ignorePeriod?: boolean;
}

export default function usePerformanceData({ ignorePeriod }: UsePerformanceDataProps = {}): {
  date: Date;
  value: number;
}[] {
  const { data: performance, performanceDataPeriod } = useSelector(
    (state: RootState) => state.performance
  );

  if (!performance) {
    return [];
  }

  const performanceData = performance.attributes.values;

  if (ignorePeriod) {
    return performanceData.map(mapPerformanceData);
  }

  return filterAndMapPerformanceData(performanceData, performanceDataPeriod);
}
