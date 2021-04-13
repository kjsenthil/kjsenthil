import { renderHook, act } from '@testing-library/react-hooks';

import useGlobalContext from './useGlobalContext';
import useGlobalContextValue from './useGlobalContextValue';
import useExDataLoading from './useExDataLoading';

describe('GlobalContextProvider', () => {
  test('allows you to useGlobalContext', async () => {
    const { result } = renderHook(() => useGlobalContext());
    await act(async () => {
      const testSet = await result.current.setIsLoading(false);
      return testSet;
    });
    expect(result.current.isLoading).toBe(false);
  });

  test('allows you to useGlobalContextValue', () => {
    const { result } = renderHook(() => useGlobalContextValue());
    expect(result.current.isLoading).toBe(true);
  });

  test('allows you to useExDataLoading', () => {
    const { result } = renderHook(useExDataLoading);
    act(() => result.current);
  });
});
