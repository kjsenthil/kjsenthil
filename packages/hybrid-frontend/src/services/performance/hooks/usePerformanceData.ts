import { useSelector } from 'react-redux';
import { PerformanceDatum } from '../../../components/organisms/PerformanceChart/performanceData';
import { RootState } from '../../../store';
import { sliceIndexBasedOnPeriod } from '../constants';
import { mapPerformanceData } from '../utils';

export interface UsePerformanceDataProps {
  // If true, will ignore performance data period (will always return the full
  // set of data. This is useful for projections chart historical portion, for
  // example.
  ignorePeriod?: boolean;
}

export default function usePerformanceData({
  ignorePeriod,
}: UsePerformanceDataProps = {}): PerformanceDatum[] {
  const { performance, performanceDataPeriod } = useSelector(
    (state: RootState) => state.performance
  );

  if (!performance) {
    return [];
  }

  if (ignorePeriod) {
    return performance.data.attributes.values.map(mapPerformanceData);
  }

  return performance.data.attributes.values
    .slice(-sliceIndexBasedOnPeriod[performanceDataPeriod])
    .map(mapPerformanceData);
}
