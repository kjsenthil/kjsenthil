import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GoalCurrentProjectionsRequestPayload, GoalCurrentProjectionsResponse } from '../types';

const postGoalCurrentProjections = async (payload?: GoalCurrentProjectionsRequestPayload) => {
  const goalCurrentProjectionUrl = API_ENDPOINTS.PROJECTIONS_CURRENT_PROJECTION;

  const response = await api.post<GoalCurrentProjectionsResponse>(
    goalCurrentProjectionUrl,
    payload
  );

  return response.data;
};

export default postGoalCurrentProjections;
