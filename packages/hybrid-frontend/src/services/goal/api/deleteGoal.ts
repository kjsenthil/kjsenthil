import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GoalStatus } from '../types';

const deleteGoal = async (goalIndex: Number) => {
  const goalsURL = API_ENDPOINTS.UPDATE_GOAL.replace('{goal-index}', String(goalIndex));

  const response = await api.patch(goalsURL, {
    fields: { status: GoalStatus.CANCELLED },
  });

  return response.data;
};

export default deleteGoal;
