import { PerformanceDataPeriod } from '../../services/performance';
import { D3TimeFormatterType } from '../../utils/formatters';

// eslint-disable-next-line import/prefer-default-export
export const axisBottomConfig: Record<
  PerformanceDataPeriod,
  { numTicks: number; tickFormatterType: D3TimeFormatterType }
> = {
  [PerformanceDataPeriod['1W']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.DATE_AND_DAY,
  },
  [PerformanceDataPeriod['1M']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.DATE_AND_MONTH,
  },
  [PerformanceDataPeriod['3M']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.DATE_AND_MONTH,
  },
  [PerformanceDataPeriod['6M']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.YEAR_AND_MONTH,
  },
  [PerformanceDataPeriod['1Y']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.YEAR_AND_MONTH,
  },
  [PerformanceDataPeriod['5Y']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.YEAR_ONLY,
  },
};
