import { useSelector } from 'react-redux';
import { PerformanceDataPeriod } from '@tswdts/react-components';
import { RootState } from '../../store/index';

export default function usePerformanceDataPeriod(): PerformanceDataPeriod {
  return useSelector((state: RootState) => state.performance.performanceDataPeriod);
}
