import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

export default function usePerformanceDataPeriod(): string {
  return useSelector((state: RootState) => state.performance.performanceDataPeriod);
}
