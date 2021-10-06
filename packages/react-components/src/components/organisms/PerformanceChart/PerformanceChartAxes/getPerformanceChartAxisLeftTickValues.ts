import {
  roundUpToNearest0s,
  roundDownToNearest0s,
  getBufferNumber,
  getNumberBand,
} from '../../../../utils/chart';

export interface GetPerformanceChartAxisBottomTicksProps {
  minChartValue: number; // Always >= 0
  maxChartValue: number; // Always >= 0
  bandsCount: number; // Integer please
}

export default function getPerformanceChartAxisLeftTickValues({
  minChartValue,
  maxChartValue,
  bandsCount,
}): number[] {
  if (maxChartValue < 10) {
    return [0, 2, 4, 6, 8, 10];
  }

  const roundedDownMin = roundDownToNearest0s(minChartValue);

  const flattenedMax = roundUpToNearest0s(maxChartValue);
  const roundedUpMax = flattenedMax + getBufferNumber(flattenedMax);

  const distance = roundedUpMax - roundedDownMin;
  const step = Math.trunc(distance / bandsCount);

  return getNumberBand({
    min: roundedDownMin,
    max: roundedUpMax,
    step,
  });
}
