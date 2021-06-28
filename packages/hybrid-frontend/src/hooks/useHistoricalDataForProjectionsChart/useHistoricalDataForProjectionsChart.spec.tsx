import { renderHook } from '@testing-library/react-hooks';
import useHistoricalDataForProjectionsChart from './useHistoricalDataForProjectionsChart';
import usePerformanceData from '../usePerformanceData';
import useContributionsData from '../useContributionsData';

import mockGetPerformanceContactResponse from '../../services/performance/mocks/mock-get-performance-contact-success-response.json';
import mockHistoricalDataMonthly from '../../services/performance/mocks/mock-historical-data-monthly.json';
import { mapContributionsData, mapPerformanceData } from '../../services/performance/utils';

jest.mock('../usePerformanceData');
jest.mock('../useContributionsData');

describe('useHistoricalDataForProjectionsChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Edge cases', () => {
    it('returns an empty array when there is no performance data', () => {
      (usePerformanceData as jest.Mock).mockImplementation(() => []);
      (useContributionsData as jest.Mock).mockImplementation(() => [42]);

      const { result } = renderHook(() => useHistoricalDataForProjectionsChart());

      expect(result.current).toEqual([]);
    });

    it('returns an empty array when there is no contributions data', () => {
      (usePerformanceData as jest.Mock).mockImplementation(() => [42]);
      (useContributionsData as jest.Mock).mockImplementation(() => []);

      const { result } = renderHook(() => useHistoricalDataForProjectionsChart());

      expect(result.current).toEqual([]);
    });
  });

  describe('Normal data', () => {
    it('returns expected annual data', () => {
      (usePerformanceData as jest.Mock).mockImplementation(() =>
        mockGetPerformanceContactResponse.data.attributes.values.map(mapPerformanceData)
      );
      (useContributionsData as jest.Mock).mockImplementation(() =>
        mockGetPerformanceContactResponse.included[0].attributes.contributions.map(
          mapContributionsData
        )
      );

      const expectedData = [
        { date: new Date(2021, 0, 1), value: 635376.13, netContributionsToDate: 263877.14 },
        { date: new Date(2020, 0, 1), value: 666570.08, netContributionsToDate: 262777.4 },
        { date: new Date(2019, 0, 1), value: 464266.07, netContributionsToDate: 249798.85 },
        { date: new Date(2018, 0, 1), value: 400410.36, netContributionsToDate: 249798.85 },
        { date: new Date(2017, 0, 1), value: 401092.25, netContributionsToDate: 234798.85 },
        { date: new Date(2016, 0, 1), value: 328381.08, netContributionsToDate: 229768.06 },
      ];

      const { result } = renderHook(() => useHistoricalDataForProjectionsChart('annual'));

      expect(result.current).toEqual(expectedData);
    });

    it('returns expected monthly data', () => {
      (usePerformanceData as jest.Mock).mockImplementation(() =>
        mockGetPerformanceContactResponse.data.attributes.values.map(mapPerformanceData)
      );
      (useContributionsData as jest.Mock).mockImplementation(() =>
        mockGetPerformanceContactResponse.included[0].attributes.contributions.map(
          mapContributionsData
        )
      );

      const expectedData = mockHistoricalDataMonthly.map((d) => ({ ...d, date: new Date(d.date) }));

      const { result } = renderHook(() => useHistoricalDataForProjectionsChart('monthly'));

      expect(result.current).toEqual(expectedData);
    });
  });
});
