import getDefaultProjectionsDataPoint, {
  GetDefaultProjectionsDataPointPropsReturn,
} from './getDefaultProjectionsDataPoint';
import mapDate from './mapDate';

import mockHistoricalMonthlyData from '../mocks/mock-historical-monthly-data.json';
import mockProjectionsMonthlyData from '../mocks/mock-projections-monthly-data.json';
import mockProjectionsTargetMonthlyData from '../mocks/mock-projections-target-monthly-data.json';

describe('getDefaultProjectionsDataPoint', () => {
  it('returns undefined data points when there is no data provided', () => {
    const expectedResult: GetDefaultProjectionsDataPointPropsReturn = {
      defaultProjectionDataPoint: undefined,
      defaultProjectionTargetDataPoint: undefined,
    };

    expect(
      getDefaultProjectionsDataPoint({
        projectionsData: undefined,
        projectionsTargetData: undefined,
        historicalData: undefined,
      })
    ).toEqual(expectedResult);
  });

  it('returns the first projections data point when there is projections data', () => {
    // When there is no projection target data

    const expectedResultNoProjectionsTarget: GetDefaultProjectionsDataPointPropsReturn = {
      defaultProjectionDataPoint: {
        ...mockProjectionsMonthlyData[0],
        date: new Date(mockProjectionsMonthlyData[0].date),
      },
      defaultProjectionTargetDataPoint: undefined,
    };

    expect(
      getDefaultProjectionsDataPoint({
        projectionsData: mockProjectionsMonthlyData.map(mapDate),
        projectionsTargetData: undefined,
        historicalData: mockHistoricalMonthlyData.map(mapDate),
      })
    ).toEqual(expectedResultNoProjectionsTarget);

    // When there is projection target data (this time all kinds of data is
    // available)

    const expectedResultWithProjectionsTarget: GetDefaultProjectionsDataPointPropsReturn = {
      defaultProjectionDataPoint: {
        ...mockProjectionsMonthlyData[0],
        date: new Date(mockProjectionsMonthlyData[0].date),
      },
      defaultProjectionTargetDataPoint: {
        ...mockProjectionsTargetMonthlyData[0],
        date: new Date(mockProjectionsTargetMonthlyData[0].date),
      },
    };

    expect(
      getDefaultProjectionsDataPoint({
        projectionsData: mockProjectionsMonthlyData.map(mapDate),
        projectionsTargetData: mockProjectionsTargetMonthlyData.map(mapDate),
        historicalData: mockHistoricalMonthlyData.map(mapDate),
      })
    ).toEqual(expectedResultWithProjectionsTarget);
  });

  it('returns a projection data point based on the first historical data point when there is no projections data and there is historical data', () => {
    const expectedResult: GetDefaultProjectionsDataPointPropsReturn = {
      defaultProjectionDataPoint: {
        ...mockHistoricalMonthlyData[0],
        date: new Date(mockHistoricalMonthlyData[0].date),
        upperBound: 0,
        lowerBound: 0,
      },
      defaultProjectionTargetDataPoint: undefined,
    };

    expect(
      getDefaultProjectionsDataPoint({
        projectionsData: undefined,
        projectionsTargetData: undefined,
        historicalData: mockHistoricalMonthlyData.map(mapDate),
      })
    ).toEqual(expectedResult);
  });
});
