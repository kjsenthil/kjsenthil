import { scaleTime } from '@visx/scale';
import { generateTimeSeriesData, TimeSeriesDatum } from '../data';
import { ChartDimension } from '../../config/chart';
import getDatumAtPosX from './getDatumAtPosX';

describe('getDatumAtPosX', () => {
  const data = generateTimeSeriesData();

  const dateAccessor = (d: TimeSeriesDatum) => d.date;

  const chartDimension: ChartDimension = {
    width: 500,
    height: 250,
    margin: {
      top: 10,
      right: 30,
      bottom: 10,
      left: 20,
    },
  };
  const chartInnerWidth =
    chartDimension.width - chartDimension.margin.left - chartDimension.margin.right;

  const xScale = scaleTime({
    domain: [data[0].date, data[data.length - 1].date],
    range: [chartDimension.margin.left, chartInnerWidth],
  });

  // Just a utility function to clamp a number between a min and a max
  const clamp = (n: number, max: number, min: number): number => Math.max(Math.min(n, max), min);

  const mouseXTestCases = [20, 120, 220, 320, 420];
  test.each(mouseXTestCases)('The function works correctly when mouseX is %i', (mouseX) => {
    const datumAtMouseX = getDatumAtPosX<TimeSeriesDatum>({
      data,
      posX: mouseX - chartDimension.margin.left,
      xScale,
      dateAccessor,
    });

    // Chart inner width = 500 - 20 - 30 = 450
    // MouseX is at 200 (out of the total width 500). Deducting the left margin,
    // we can expect the data point to be at the (200 - 20) / 450 = 40% datum.
    const expectedDatumIndex = clamp(
      Math.round(((mouseX - chartDimension.margin.left) / chartInnerWidth) * (data.length - 1)),
      data.length - 1,
      0
    );
    const expectedDatum = data[expectedDatumIndex];

    expect(datumAtMouseX).toEqual(expectedDatum);
  });
});
