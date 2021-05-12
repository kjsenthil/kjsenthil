import { bisector } from 'd3-array';
import { scaleTime } from '@visx/scale';
import { determineTooltipDataAndPosition } from './usePerformanceChartTooltip';
import { ContributionDatum, PerformanceDatum, TimeSeriesDatum } from '../data/utils';
import {
  defaultGenerateTimeSeriesDataProps,
  generateTimeSeriesData,
  GenerateTimeSeriesDataProps,
} from '../../../../utils/data';
import { ChartDimension } from '../../../../config/chart';

describe('usePerformanceChartTooltip', () => {
  // Return an array like this: [1, 2, ..., 100];
  const datumCounts = Array.from({ length: 10 }, (_, i) => i + 1);

  describe('determineTooltipPosition', () => {
    test.each(datumCounts)(
      'The tooltip position is calculated correctly when datum count is %i',
      (howMany: number) => {
        const generateDataProps: GenerateTimeSeriesDataProps = {
          ...defaultGenerateTimeSeriesDataProps,
          howMany,
        };

        const chartDimension: ChartDimension = {
          width: 600,
          height: 300,
          margin: {
            top: 10,
            right: 20,
            bottom: 30,
            left: 40,
          },
        };

        const performanceData: PerformanceDatum[] = generateTimeSeriesData({
          ...generateDataProps,
          firstValue: 2000,
        });
        const contributionsData: ContributionDatum[] = generateTimeSeriesData({
          ...generateDataProps,
        });

        const xAccessor = (d: TimeSeriesDatum) => d.date;

        const bisectDate = bisector<TimeSeriesDatum, Date>((d: TimeSeriesDatum) => d.date).left;

        const xScale = scaleTime({
          domain: [
            new Date(
              generateDataProps.firstYear,
              generateDataProps.firstMonth,
              generateDataProps.firstDate
            ),
            new Date(
              generateDataProps.firstYear,
              generateDataProps.firstMonth,
              generateDataProps.firstDate + generateDataProps.howMany - 1
            ),
          ],
          range: [
            chartDimension.margin.left,
            chartDimension.width - chartDimension.margin.left - chartDimension.margin.right,
          ],
        });

        const { x, cd, pd } = determineTooltipDataAndPosition({
          mouseX: 300,
          xAccessor,
          xScale,
          bisectDate,
          chartDimension,
          contributionsData,
          performanceData,
        });

        // mouseX = 300
        // chart has left offset = 40
        // tooltip should be 300 - 40 = 260 (relative to the start of the chart)
        expect(x).toBe(260);

        // calculate the estimated data index, which is determined by the mouse
        // position relative to the chart's width.
        const dataIndexRatio =
          x / (chartDimension.width - chartDimension.margin.left - chartDimension.margin.right);
        const dataIndex = Math.floor(dataIndexRatio * howMany);

        expect(pd).toEqual(performanceData[dataIndex]);
        expect(cd).toEqual(contributionsData[dataIndex]);
      }
    );
  });
});
