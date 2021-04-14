import { entityIDParse, postApiHeader } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (objIndex: string, entityId: string) => {
  const newLinkPayload = { objective_obj_index: objIndex };
  const linkGoalObjUrl = ENDPOINTS['link-goal-to-objective']?.replace(entityIDParse, entityId);

  const linkResponse = await fetch(linkGoalObjUrl, {
    method: 'POST',
    headers: postApiHeader,
    credentials: 'include', // needed based on the APIM changes
    body: JSON.stringify(newLinkPayload),
  });

  if (!linkResponse.ok) {
    const errMessage = 'Linking Failed failed';
    return Promise.reject(new Error(errMessage));
  }
  return linkResponse.json();
};
