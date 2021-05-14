import { entityIDParse } from '../constants';
import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

export const goalIDParse = /\{objective-index\}/;

const postLinkGoalObjective = async ({
  goalIndex,
  objectiveIndex,
  entityId,
}: {
  goalIndex: number;
  objectiveIndex: number;
  entityId: number;
}) => {
  const newLinkPayload = { objective_obj_index: objectiveIndex };
  const linkGoalObjUrl = API_ENDPOINTS.LINK_GOAL_TO_OBJECTIVE?.replace(
    entityIDParse,
    String(entityId)
  ).replace(goalIDParse, String(goalIndex));

  const response = await api.post(linkGoalObjUrl, newLinkPayload);

  return response.data;
};

export default postLinkGoalObjective;
