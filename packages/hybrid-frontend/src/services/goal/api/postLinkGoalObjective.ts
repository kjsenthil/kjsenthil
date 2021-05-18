import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

export const goalIDParse = /\{objective-index\}/;

const postLinkGoalObjective = async ({
  goalIndex,
  objectiveIndex,
}: {
  goalIndex: number;
  objectiveIndex: number;
}) => {
  const newLinkPayload = { objective_obj_index: objectiveIndex };
  const linkGoalObjUrl = API_ENDPOINTS.LINK_GOAL_TO_OBJECTIVE.replace(
    goalIDParse,
    String(goalIndex)
  );

  const response = await api.post(linkGoalObjUrl, newLinkPayload);

  return response.data;
};

export default postLinkGoalObjective;
