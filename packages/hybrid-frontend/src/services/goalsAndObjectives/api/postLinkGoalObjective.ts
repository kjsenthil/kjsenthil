import { entityIDParse } from '../constants';
import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

export const goalIDParse = /\{objective-index\}/;

const postLinkGoalObjective = async (goalIndex: string, objIndex: string, entityId: string) => {
  const newLinkPayload = { objective_obj_index: objIndex };
  const linkGoalObjUrl = API_ENDPOINTS.LINK_GOAL_TO_OBJECTIVE?.replace(
    entityIDParse,
    entityId
  ).replace(goalIDParse, goalIndex);

  const response = await api.post(linkGoalObjUrl, newLinkPayload);

  return response.data;
};

export default postLinkGoalObjective;
