import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

const deleteGoal = async (goalIndex: Number) => {
  const goalsURL = API_ENDPOINTS.UPDATE_GOAL.replace('{goal-index}', String(goalIndex));

  const response = await api.delete(goalsURL);

  return response.data;
};

export default deleteGoal;
