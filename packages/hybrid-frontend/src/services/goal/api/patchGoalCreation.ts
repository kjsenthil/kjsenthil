import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

const patchGoalCreation = async (formValues: Object, goalIndex: string) => {
  const newGoalsPayload = { ...formValues };

  const goalsURL = `${API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS}/${goalIndex}`;

  const response = await api.patch(goalsURL, newGoalsPayload);

  return response.data;
};

export default patchGoalCreation;
