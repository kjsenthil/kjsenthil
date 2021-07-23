import { GoalsApiResponse, PostGoalParams, GoalType } from '../types';
import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import determinePayload from '../utils/determinePayload';

const postGoalCreation = async <T extends GoalType>(params: PostGoalParams<T>) => {
  const goalsURL = API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS;

  const response = await api.post<GoalsApiResponse>(goalsURL, determinePayload<T>(params));

  return response.data;
};

export default postGoalCreation;
