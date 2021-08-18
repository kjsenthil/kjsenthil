import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GoalSimulateProjectionsRequestPayload, GoalSimulateProjectionsResponse } from '../types';

const postGoalSimulateProjections = async (payload?: GoalSimulateProjectionsRequestPayload) => {
  const goalSimulateProjectionUrl = API_ENDPOINTS.PROJECTIONS_SIMULATE_PROJECTION;

  const response = await api.post<GoalSimulateProjectionsResponse>(
    goalSimulateProjectionUrl,
    payload
  );

  return response.data;
};

export default postGoalSimulateProjections;
