import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from 'react-redux';
import useGoalSimulateProjections from './useGoalSimulateProjections';

import mockPostGoalSimulateProjectionsSuccessResponse from '../../services/projections/mocks/mock-post-goal-simulate-projections-success-response.json';

jest.mock('react-redux');

describe('useGoalSimulateProjections', () => {
  it('returns data as expected', () => {
    (useSelector as jest.Mock).mockImplementation(() => ({
      goalSimulateProjections: {
        data: mockPostGoalSimulateProjectionsSuccessResponse,
      },
    }));

    const { result } = renderHook(() => useGoalSimulateProjections());

    expect(result.current).toEqual(mockPostGoalSimulateProjectionsSuccessResponse);
  });
});
