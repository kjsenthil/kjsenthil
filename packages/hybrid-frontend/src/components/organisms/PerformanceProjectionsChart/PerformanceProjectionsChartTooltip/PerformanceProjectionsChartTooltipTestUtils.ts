/**
 * Contains utilities for our unit tests
 */

import { scaleLinear, scaleTime } from '@visx/scale';
import { PerformanceProjectionsDatum } from '../data/performanceProjectionsChartDataUtils';
import { ChartDimension } from '../../../../config/chart';

function generatePerformanceProjectionsData(howMany: number): PerformanceProjectionsDatum[] {
  const data: PerformanceProjectionsDatum[] = [];

  const firstYear = 2020;

  for (let i = 0; i < howMany; i += 1) {
    data.push({
      Date: new Date(firstYear + i, 0, 1),
      ValueGood: 110 * i,
      Value: 100 * i,
      ValueBad: 90 * i,
      NetContributionsToDate: 50 * i,
    });
  }

  return data;
}

// eslint-disable-next-line import/prefer-default-export
export function generateParametersForUseTooltipHook(dataLength: number) {
  const data = generatePerformanceProjectionsData(dataLength);

  const chartDimension: ChartDimension = {
    width: 500,
    height: 250,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  };
  const chartInnerWidth =
    chartDimension.width - chartDimension.margin.left - chartDimension.margin.right;
  const chartInnerHeight =
    chartDimension.height - chartDimension.margin.top - chartDimension.margin.bottom;

  const hasData = dataLength > 0;

  const minX = hasData ? data[0].Date : new Date();
  const maxX = hasData ? data[dataLength - 1].Date : new Date();
  const xScale = scaleTime({
    domain: [minX, maxX],
    range: [chartDimension.margin.left, chartInnerWidth],
  });

  // We're assuming that our test data's net contributions and value good
  // contain the lowest and highest points of the graph (not reflective of
  // real-world scenarios where min / max calculations are used to determine
  // this).
  const minY = hasData ? data[0].NetContributionsToDate : 0;
  const maxY = hasData ? data[dataLength - 1].ValueGood : 0;
  const yScale = scaleLinear({
    domain: [minY, maxY],
    range: [chartDimension.margin.top, chartInnerHeight],
  });

  return {
    data,
    chartDimension,
    xScale,
    yScale,
    goalMet: true,
  };
}
