import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { mockClientResponse } from '../../services/myAccount/mocks';
import useAccountIds from './useAccountIds';

jest.mock('react-redux');

// What our mock useSelector will return
interface MockUseSelectorReturnType {
  client: {
    included?: RootState['client']['included'];
  };
}

describe('useAccountIds', () => {
  it("returns 'undefined' when client.included data is not available", () => {
    (useSelector as jest.Mock).mockImplementation(
      (): MockUseSelectorReturnType => ({ client: {} })
    );

    const { result } = renderHook(() => useAccountIds());

    expect(result.current).toBeUndefined();
  });

  it('returns the account ID array when client.included data is available', () => {
    (useSelector as jest.Mock).mockImplementation(
      (): MockUseSelectorReturnType => ({ client: { included: mockClientResponse.included } })
    );

    const { result } = renderHook(() => useAccountIds());

    expect(result.current).toEqual(['20500', '20871', '20499']);
  });
});
