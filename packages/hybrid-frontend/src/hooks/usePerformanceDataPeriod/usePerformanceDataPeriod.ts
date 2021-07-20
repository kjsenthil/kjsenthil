import { useSelector } from 'react-redux';
import { PerformanceDataPeriod } from '../../services/performance';
import { RootState } from '../../store/index';

export default function usePerformanceDataPeriod(): PerformanceDataPeriod {
  return useSelector((state: RootState) => state.performance.performanceDataPeriod);
}
