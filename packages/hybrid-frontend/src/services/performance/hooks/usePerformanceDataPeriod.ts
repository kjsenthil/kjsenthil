import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export default function usePerformanceDataPeriod(): string {
  return useSelector((state: RootState) => state.performance.performanceDataPeriod);
}
