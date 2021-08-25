import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GoalSimulateProjectionsRequestPayload, GoalSimulateProjectionsResponse } from '../types';

const postGoalSimulateProjections = async (payload?: GoalSimulateProjectionsRequestPayload) => {
  const goalSimulateProjectionUrl = API_ENDPOINTS.PROJECTIONS_SIMULATE_PROJECTION;

  const response = await api.post<GoalSimulateProjectionsResponse>(
    goalSimulateProjectionUrl,
    payload
  );

  // in all app we use onTrack but simulate API returns onTrackPercentage
  if (response.data?.goal?.onTrack?.percentage) {
    response.data.goal.onTrack.percentage /= 100;
  }
  return response.data;
};

export default postGoalSimulateProjections;
