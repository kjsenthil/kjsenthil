import { entityIDParse } from '../constants';
import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

const patchGoalCreation = async (formValues: Object, entityId: string, goalIndex: string) => {
  const newGoalsPayload = { ...formValues };

  const goalsURL = `${API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS?.replace(
    entityIDParse,
    entityId
  )}/${goalIndex}`;

  const response = await api.patch(goalsURL, newGoalsPayload);

  return response.data;
};

export default patchGoalCreation;
