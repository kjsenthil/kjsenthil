import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GoalSimulateProjectionsResponse } from '../../services/projections';

export default function useGoalSimulateProjections(): GoalSimulateProjectionsResponse | undefined {
  const {
    goalSimulateProjections: { data: goalSimulateProjections },
  } = useSelector((state: RootState) => state);

  return goalSimulateProjections;
}
