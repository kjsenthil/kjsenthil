import MockDate from 'mockdate';
import getDefaultTooltipData, { GetDefaultTooltipDataReturn } from './getDefaultTooltipData';
import {
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../services';

describe('getDefaultTooltipData', () => {
  MockDate.set('2020-01-01');

  const mockDefaultProjectionDataPoint: ProjectionsChartProjectionDatum = {
    date: new Date(),
    upperBound: 30,
    lowerBound: 10,
    netContributionsToDate: 15,
    value: 20,
  };

  const mockDefaultProjectionTargetDataPoint: ProjectionsChartProjectionTargetDatum = {
    date: new Date(),
    value: 40,
  };

  // We don't actually care what the accessors return in the test. Just need
  // some numbers to check later
  const accessors = {
    scaledDateAccessor: () => 0,
    scaledProjectionAccessor: () => mockDefaultProjectionDataPoint.value,
    scaledProjectionUpperBoundAccessor: () => mockDefaultProjectionDataPoint.upperBound,
    scaledContributionAccessor: () => mockDefaultProjectionDataPoint.netContributionsToDate,
    scaledProjectionTargetAccessor: () => mockDefaultProjectionTargetDataPoint.value,
  };

  it('returns zero-like tooltip data values when projection data is not available', () => {
    expect(
      getDefaultTooltipData({
        defaultProjectionDataPoint: undefined,
        defaultProjectionTargetDataPoint: undefined,
        ...accessors,
      })
    );
  });

  it('returns expected tooltip data values when projection data (no projection target data) is available', () => {
    const expectedResult: GetDefaultTooltipDataReturn = {
      defaultTooltipData: {
        contributionIndicatorPosY: 15,
        goalNotMetIndicatorPosY: undefined,
        performanceIndicatorPosY: 20,
        performanceProjection: {
          date: new Date(),
          lowerBound: 10,
          netContributionsToDate: 15,
          upperBound: 30,
          value: 20,
        },
        performanceProjectionTarget: undefined,
      },
      defaultTooltipLeft: 0,
      defaultTooltipTop: 30,
    };

    expect(
      getDefaultTooltipData({
        defaultProjectionDataPoint: mockDefaultProjectionDataPoint,
        defaultProjectionTargetDataPoint: undefined,
        ...accessors,
      })
    ).toEqual(expectedResult);
  });

  it('returns expected tooltip data values when projection data and projection target data is available', () => {
    const expectedResult: GetDefaultTooltipDataReturn = {
      defaultTooltipData: {
        contributionIndicatorPosY: 15,
        goalNotMetIndicatorPosY: 40,
        performanceIndicatorPosY: 20,
        performanceProjection: {
          date: new Date(),
          lowerBound: 10,
          netContributionsToDate: 15,
          upperBound: 30,
          value: 20,
        },
        performanceProjectionTarget: {
          date: new Date(),
          value: 40,
        },
      },
      defaultTooltipLeft: 0,
      defaultTooltipTop: 30,
    };

    expect(
      getDefaultTooltipData({
        defaultProjectionDataPoint: mockDefaultProjectionDataPoint,
        defaultProjectionTargetDataPoint: mockDefaultProjectionTargetDataPoint,
        ...accessors,
      })
    ).toEqual(expectedResult);
  });
});
