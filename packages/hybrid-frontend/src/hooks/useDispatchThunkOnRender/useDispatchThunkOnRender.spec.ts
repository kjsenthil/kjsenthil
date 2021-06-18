import { act, renderHook } from '@testing-library/react-hooks';
import useDispatchThunkOnRender from './useDispatchThunkOnRender';
import { CommonState } from '../../services/types';

describe('useDispatchThunkOnRender', () => {
  const mockFetcher = jest.fn();
  const maxRetries = 3;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The hook retries the expected amount of times', () => {
    let thunkState: CommonState['status'] = 'idle';

    const { result, rerender } = renderHook(() =>
      useDispatchThunkOnRender(mockFetcher, thunkState, {
        maxRetries,
      })
    );

    // The state starts out at 'idle' so the hook will attempt to fetch once
    expect(mockFetcher).toHaveBeenCalledTimes(1);
    expect(result.current.maxRetriesHit).toBeFalse();

    // Retry a bunch of times
    for (let i = 1; i <= maxRetries + 3; i += 1) {
      // Simulate the network fetch status changing
      thunkState = 'loading';
      rerender();
      thunkState = 'error';
      rerender();

      const expectedRetryCount = Math.min(i + 1, maxRetries);
      const expectedMaxRetriesHit = expectedRetryCount === maxRetries;

      expect(mockFetcher).toHaveBeenCalledTimes(expectedRetryCount);
      expect(result.current.maxRetriesHit).toBe(expectedMaxRetriesHit);
    }
  });

  test('The hook can reset the retry counter as expected', () => {
    let thunkState: CommonState['status'] = 'error';

    const { result, rerender } = renderHook(() =>
      useDispatchThunkOnRender(mockFetcher, thunkState, {
        maxRetries,
      })
    );

    // The state starts out at 'idle' so the hook will attempt to fetch once
    expect(mockFetcher).toHaveBeenCalledTimes(1);
    expect(result.current.maxRetriesHit).toBeFalse();

    // Retry a bunch of times, simulating hitting the maximum amount of allowed
    // retries
    for (let i = 1; i <= maxRetries; i += 1) {
      // Simulate the network fetch status changing
      thunkState = 'loading';
      rerender();
      thunkState = 'error';
      rerender();
    }

    // Make sure the amount of times the fetcher was called is as expected
    expect(mockFetcher).toHaveBeenCalledTimes(maxRetries);
    expect(result.current.maxRetriesHit).toBeTrue();

    // Reset the retry count
    act(() => {
      result.current.resetRetryCount();
    });

    // Retry a bunch of times (again), simulating hitting the maximum amount of
    // allowed retries (again)
    for (let i = 1; i <= maxRetries; i += 1) {
      // Simulate the network fetch status changing
      thunkState = 'loading';
      rerender();
      thunkState = 'error';
      rerender();
    }

    // Make sure the amount of times the fetcher was called, in total,
    // is as expected.
    expect(mockFetcher).toHaveBeenCalledTimes(maxRetries * 2);
    expect(result.current.maxRetriesHit).toBeTrue();
  });
});
