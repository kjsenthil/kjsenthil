import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GoalTargetProjectionsResponse, GoalTargetProjectionsRequestPayload } from '../types';

const postGoalTargetProjections = async (payload?: GoalTargetProjectionsRequestPayload) => {
  const url = API_ENDPOINTS.PROJECTIONS_TARGET_PROJECTION;

  const response = await api.post<GoalTargetProjectionsResponse>(url, payload);

  return response.data;
};

export default postGoalTargetProjections;
