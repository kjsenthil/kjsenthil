import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { PostGoalParams, GoalType, GoalsApiResponse } from '../types';
import determinePayload from '../utils/determinePayload';

const patchGoalUpdate = async <T extends GoalType>(
  goalIndex: number,
  params: PostGoalParams<T>
) => {
  const goalsURL = API_ENDPOINTS.UPDATE_GOAL.replace('{goal-index}', String(goalIndex));

  const response = await api.patch<GoalsApiResponse>(goalsURL, determinePayload<T>(params));

  return response.data;
};

export default patchGoalUpdate;
