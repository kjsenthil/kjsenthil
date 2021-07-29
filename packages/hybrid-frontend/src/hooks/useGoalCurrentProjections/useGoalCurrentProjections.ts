import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GoalCurrentProjectionsResponse } from '../../services/projections';

export default function useGoalCurrentProjections(): GoalCurrentProjectionsResponse | undefined {
  const {
    goalCurrentProjections: { data: goalCurrentProjections },
  } = useSelector((state: RootState) => state);

  return goalCurrentProjections;
}
