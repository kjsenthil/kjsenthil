import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from 'react-redux';
import useGoalCurrentProjections from './useGoalCurrentProjections';

import mockPostGoalCurrentProjectionsSuccessResponse from '../../services/projections/mocks/mock-post-goal-current-projections-success-response.json';

jest.mock('react-redux');

describe('useGoalCurrentProjections', () => {
  it('returns data as expected', () => {
    (useSelector as jest.Mock).mockImplementation(() => ({
      goalCurrentProjections: {
        data: mockPostGoalCurrentProjectionsSuccessResponse,
      },
    }));

    const { result } = renderHook(() => useGoalCurrentProjections());

    expect(result.current).toEqual(mockPostGoalCurrentProjectionsSuccessResponse);
  });
});
