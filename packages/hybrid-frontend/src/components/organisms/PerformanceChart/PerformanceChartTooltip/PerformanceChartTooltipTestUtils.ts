/**
 * Contains utilities for our unit tests
 */

import { scaleLinear, scaleTime } from '@visx/scale';
import { ChartDimension } from '../../../../config/chart';
import { ContributionDatum, PerformanceDatum } from '../performanceData';

function generatePerformanceData(howMany: number): PerformanceDatum[] {
  const firstYear = 2020;

  return Array.from({ length: howMany }).map((_, i) => ({
    date: new Date(firstYear + i, 0, 1),
    value: 100 * i,
  }));
}

function generateContributionsData(howMany: number): ContributionDatum[] {
  const firstYear = 2020;

  return Array.from({ length: howMany }).map((_, i) => ({
    date: new Date(firstYear + i, 0, 1),
    value: 50 * i,
  }));
}

// eslint-disable-next-line import/prefer-default-export
export function generateParametersForUseTooltipHook(dataLength: number) {
  const performanceData = generatePerformanceData(dataLength);
  const contributionsData = generateContributionsData(dataLength);

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
  const chartInnerWidth =
    chartDimension.width - chartDimension.margin.left - chartDimension.margin.right;
  const chartInnerHeight =
    chartDimension.height - chartDimension.margin.top - chartDimension.margin.bottom;

  const hasData = dataLength > 0;

  const minX = hasData ? performanceData[0].date : new Date();
  const maxX = hasData ? performanceData[dataLength - 1].date : new Date();
  const xScale = scaleTime({
    domain: [minX, maxX],
    range: [chartDimension.margin.left, chartInnerWidth],
  });

  // We're assuming that our test performance data is always larger than
  // contributions data (not reflective of real-world scenarios where min / max
  // calculations are used to determine this).
  const minY = hasData ? contributionsData[0].value : 0;
  const maxY = hasData ? performanceData[dataLength - 1].value : 0;
  const yScale = scaleLinear({
    domain: [minY, maxY],
    range: [chartDimension.margin.top, chartInnerHeight],
  });

  return {
    performanceData,
    contributionsData,
    chartDimension,
    xScale,
    yScale,
  };
}
