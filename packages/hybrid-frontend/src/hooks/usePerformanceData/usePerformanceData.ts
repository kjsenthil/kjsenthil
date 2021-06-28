import { useSelector } from 'react-redux';
import { PerformanceDatum } from '../../components/organisms/PerformanceChart/performanceData/types';
import { mapPerformanceData } from '../../services/performance';
import { RootState } from '../../store';
import findDateByPeriod from '../../utils/date/findDateByPeriod/index';

export interface UsePerformanceDataProps {
  // If true, will ignore performance data period (will always return the full
  // set of data. This is useful for projections chart historical portion, for
  // example.
  ignorePeriod?: boolean;
}

export default function usePerformanceData({
  ignorePeriod,
}: UsePerformanceDataProps = {}): PerformanceDatum[] {
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

  const date = findDateByPeriod(
    performanceData.map((data) => data.date),
    performanceDataPeriod
  );

  return performanceData.filter((p) => !date || p.date > date).map(mapPerformanceData);
}
