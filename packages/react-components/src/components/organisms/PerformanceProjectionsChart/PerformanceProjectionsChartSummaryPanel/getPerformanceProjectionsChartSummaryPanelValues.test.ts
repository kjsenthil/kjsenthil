import getPerformanceProjectionsChartSummaryPanelValues, {
  GetPerformanceProjectionsChartSummaryPanelValuesReturn,
} from './getPerformanceProjectionsChartSummaryPanelValues';
import { TooltipData } from '../PerformanceProjectionsChartTooltip/usePerformanceProjectionsChartTooltip';
import {
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../services';

describe('getPerformanceProjectionsChartSummaryPanelValues', () => {
  it('returns zero-like values when no data is available', () => {
    const expectedResult: GetPerformanceProjectionsChartSummaryPanelValuesReturn = {
      performance: 0,
      performanceLowEnd: 0,
      performanceHighEnd: 0,
      performanceTargetNotMet: undefined,
      contributions: 0,
    };

    expect(
      getPerformanceProjectionsChartSummaryPanelValues({
        tooltipData: undefined,
        defaultDataPoint: undefined,
        defaultTargetDataPoint: undefined,
      })
    ).toEqual(expectedResult);
  });

  it('returns data from tooltipData when tooltipData is available', () => {
    const baseMockTooltipData: Omit<
      TooltipData,
      'performanceProjection' | 'performanceProjectionTarget'
    > = {
      contributionIndicatorPosY: 0,
      goalNotMetIndicatorPosY: 0,
      performanceIndicatorPosY: 0,
    };

    const mockTooltipDataNoProjectionTarget: TooltipData = {
      ...baseMockTooltipData,
      performanceProjection: {
        date: new Date(),
        upperBound: 100,
        lowerBound: 50,
        value: 75,
        netContributionsToDate: 60,
      },
      performanceProjectionTarget: undefined,
    };

    const mockTooltipDataWithProjectionTarget: TooltipData = {
      ...mockTooltipDataNoProjectionTarget,
      performanceProjectionTarget: {
        date: new Date(),
        value: 125,
      },
    };

    const expectedResultNoProjectionTarget: GetPerformanceProjectionsChartSummaryPanelValuesReturn = {
      performance: 75,
      performanceLowEnd: 50,
      performanceHighEnd: 100,
      performanceTargetNotMet: undefined,
      contributions: 60,
    };

    const expectedResultWithProjectionTarget: GetPerformanceProjectionsChartSummaryPanelValuesReturn = {
      performance: 75,
      performanceLowEnd: 50,
      performanceHighEnd: 100,
      performanceTargetNotMet: 125,
      contributions: 60,
    };

    expect(
      getPerformanceProjectionsChartSummaryPanelValues({
        tooltipData: mockTooltipDataNoProjectionTarget,
        defaultDataPoint: undefined,
        defaultTargetDataPoint: undefined,
      })
    ).toEqual(expectedResultNoProjectionTarget);
    expect(
      getPerformanceProjectionsChartSummaryPanelValues({
        tooltipData: mockTooltipDataWithProjectionTarget,
        defaultDataPoint: undefined,
        defaultTargetDataPoint: undefined,
      })
    ).toEqual(expectedResultWithProjectionTarget);
  });

  it('returns data from the default data point when tooltip data is not available and the default data point is available', () => {
    const mockDefaultDataPoint: ProjectionsChartProjectionDatum = {
      date: new Date(),
      value: 75,
      lowerBound: 50,
      upperBound: 100,
      netContributionsToDate: 60,
    };
    const mockDefaultTargetDataPoint: ProjectionsChartProjectionTargetDatum = {
      date: new Date(),
      value: 125,
    };

    const expectedResultNoProjectionTarget: GetPerformanceProjectionsChartSummaryPanelValuesReturn = {
      performance: 75,
      performanceLowEnd: 50,
      performanceHighEnd: 100,
      performanceTargetNotMet: undefined,
      contributions: 60,
    };

    const expectedResultWithProjectionTarget: GetPerformanceProjectionsChartSummaryPanelValuesReturn = {
      performance: 75,
      performanceLowEnd: 50,
      performanceHighEnd: 100,
      performanceTargetNotMet: 125,
      contributions: 60,
    };

    // When only the projection data point is available
    expect(
      getPerformanceProjectionsChartSummaryPanelValues({
        tooltipData: undefined,
        defaultDataPoint: mockDefaultDataPoint,
        defaultTargetDataPoint: undefined,
      })
    ).toEqual(expectedResultNoProjectionTarget);

    // When both the projection and projection target data points are available
    expect(
      getPerformanceProjectionsChartSummaryPanelValues({
        tooltipData: undefined,
        defaultDataPoint: mockDefaultDataPoint,
        defaultTargetDataPoint: mockDefaultTargetDataPoint,
      })
    ).toEqual(expectedResultWithProjectionTarget);
  });
});
