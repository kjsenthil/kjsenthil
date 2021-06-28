import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from 'react-redux';
import useContributionsData from './useContributionsData';

jest.mock('react-redux');

describe('useContributionsData', () => {
  it('returns an empty array when performance data is not available', () => {
    (useSelector as jest.Mock).mockImplementation(() => ({
      performance: undefined,
    }));

    const { result } = renderHook(() => useContributionsData());

    expect(result.current).toEqual([]);
  });
});
