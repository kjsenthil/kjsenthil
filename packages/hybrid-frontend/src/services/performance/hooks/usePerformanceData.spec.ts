import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from 'react-redux';
import usePerformanceData from './usePerformanceData';

jest.mock('react-redux');

describe('usePerformanceData', () => {
  it('returns an empty array when performance data is not available', () => {
    (useSelector as jest.Mock).mockImplementation(() => ({
      performance: undefined,
    }));

    const { result } = renderHook(() => usePerformanceData());

    expect(result.current).toEqual([]);
  });
});
