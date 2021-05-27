import { renderHook } from '@testing-library/react-hooks';
import useAnnualHistoricalDataForChart from './useAnnualHistoricalDataForChart';
import usePerformanceData from './usePerformanceData';
import useContributionsData from './useContributionsData';
import { mapContributionsData, mapPerformanceData } from '../utils';
import mockGetPerformanceContactResponse from '../mocks/mock-get-performance-contact-success-response.json';

jest.mock('./usePerformanceData');
jest.mock('./useContributionsData');

describe('useAnnualHistoricalDataForChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns an empty array when there is no performance data', () => {
    (usePerformanceData as jest.Mock).mockImplementation(() => []);
    (useContributionsData as jest.Mock).mockImplementation(() => [42]);

    const { result } = renderHook(() => useAnnualHistoricalDataForChart());

    expect(result.current).toEqual([]);
  });

  it('returns an empty array when there is no contributions data', () => {
    (usePerformanceData as jest.Mock).mockImplementation(() => [42]);
    (useContributionsData as jest.Mock).mockImplementation(() => []);

    const { result } = renderHook(() => useAnnualHistoricalDataForChart());

    expect(result.current).toEqual([]);
  });

  it('returns expected data when there is performance and contributions data', () => {
    (usePerformanceData as jest.Mock).mockImplementation(() =>
      mockGetPerformanceContactResponse.data.attributes.values.map(mapPerformanceData)
    );
    (useContributionsData as jest.Mock).mockImplementation(() =>
      mockGetPerformanceContactResponse.included[0].attributes.contributions.map(
        mapContributionsData
      )
    );

    const expectedData = [
      { date: new Date(2016, 0, 1), value: 328381.08, netContributionsToDate: 229768.06 },
      { date: new Date(2017, 0, 1), value: 401092.25, netContributionsToDate: 234798.85 },
      { date: new Date(2018, 0, 1), value: 400410.36, netContributionsToDate: 249798.85 },
      { date: new Date(2019, 0, 1), value: 464266.07, netContributionsToDate: 249798.85 },
      { date: new Date(2020, 0, 1), value: 666570.08, netContributionsToDate: 262777.4 },
      { date: new Date(2021, 0, 1), value: 635376.13, netContributionsToDate: 263877.14 },
    ];

    const { result } = renderHook(() => useAnnualHistoricalDataForChart());

    expect(result.current).toEqual(expectedData);
  });
});
