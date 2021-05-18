import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

interface ObjectiveCreationProps {
  goalName: string;
}

export const createObjectivePayLoad = (goalName: string) => {
  const currDate = new Date();
  const currDateFormat = currDate.toISOString().split('T')[0];

  return {
    fields: {
      capture_date: {
        _val: currDateFormat,
        _type: 'Date',
      },
      owner: 'client',
      description: `${goalName} Objective Created on ${currDateFormat}`,
    },
  };
};

const postObjectiveCreation = async ({ goalName }: ObjectiveCreationProps) => {
  const objectivesPayload = createObjectivePayLoad(goalName);
  const objectiveUrl = API_ENDPOINTS.CREATE_OBJECTIVE;

  const response = await api.post(objectiveUrl, objectivesPayload);

  return response.data;
};

export default postObjectiveCreation;
