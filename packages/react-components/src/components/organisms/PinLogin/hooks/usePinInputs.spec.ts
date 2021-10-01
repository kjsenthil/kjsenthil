import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as randomPinIndices from '../../../../services/auth/utils/randomPinIndices';
import usePinInputs from './usePinInputs';

jest.mock('../../../../services/auth/utils/randomPinIndices');

describe('usePinInput', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (randomPinIndices.default as jest.Mock).mockReturnValue([
      { position: 1, value: undefined },
      { position: 2, value: undefined },
      { position: 3, value: undefined },
    ]);
  });

  it('should return randomly positioned inputs', () => {
    const { result } = renderHook(() => usePinInputs());
    const positions = result.current.inputs.map(({ position }) => position);
    expect(positions).toEqual([1, 2, 3]);
  });

  it('should update input values at the specified index', () => {
    const { result } = renderHook(() => usePinInputs());
    const initialValues = result.current.inputs.map(({ value }) => value);
    expect(initialValues).toEqual([undefined, undefined, undefined]);

    act(() => {
      result.current.setInputValue(0, 4);
      result.current.setInputValue(1, 5);
      result.current.setInputValue(2, 6);
    });

    const values = result.current.inputs.map(({ value }) => value);
    expect(values).toEqual([4, 5, 6]);
  });
});
