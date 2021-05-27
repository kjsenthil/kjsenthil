import { useSelector } from 'react-redux';
import { PerformanceDataPeriod } from '../constants';
import { RootState } from '../../../store';

export default function usePerformanceDataPeriod(): PerformanceDataPeriod {
  return useSelector((state: RootState) => state.performance.performanceDataPeriod);
}
