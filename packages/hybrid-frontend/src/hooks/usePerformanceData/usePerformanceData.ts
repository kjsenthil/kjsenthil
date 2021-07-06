import { useSelector } from 'react-redux';
import { PerformanceDatum } from '../../components/organisms/PerformanceChart/performanceData';
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

  const periodPerformanceData = performanceData
    .filter((p) => !date || p.date > date)
    .map(mapPerformanceData);

  // If there is only 1 data point in the dataset (can happen when there is
  // missing data and the period selected is short), the line chart won't
  // render. This piece of code ensures there is always at least a 2 points of
  // data provided for the chart by adding an identical datum dated at the
  // period's beginning .
  if (periodPerformanceData.length === 1 && date) {
    periodPerformanceData.push({
      value: periodPerformanceData[0].value,
      date: new Date(date),
    });
  }

  return periodPerformanceData;
}
