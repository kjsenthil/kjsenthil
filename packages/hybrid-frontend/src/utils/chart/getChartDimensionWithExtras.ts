import { ChartDimension, ChartDimensionWithExtras } from '../../config/chart';

/**
 * This function calculates and injects certain extra figures (like inner width
 * and inner height) to a chart dimension object. It returns a new chart
 * dimension object containing these extras.
 */
export default function getChartDimensionWithExtras(
  chartDimension: ChartDimension
): ChartDimensionWithExtras {
  return {
    ...chartDimension,
    innerWidth: chartDimension.width - chartDimension.margin.left - chartDimension.margin.right,
    innerHeight: chartDimension.height - chartDimension.margin.top - chartDimension.margin.bottom,
  };
}
