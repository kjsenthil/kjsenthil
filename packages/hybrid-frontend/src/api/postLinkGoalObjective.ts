import { entityIDParse, goalIDParse, xplanPostApiHeader } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (goalIndex: string, objIndex: string, entityId: string) => {
  const newLinkPayload = { objective_obj_index: objIndex };
  const linkGoalObjUrl = ENDPOINTS['link-goal-to-objective']
    ?.replace(entityIDParse, entityId)
    .replace(goalIDParse, goalIndex);

  const linkResponse = await fetch(linkGoalObjUrl, {
    method: 'POST',
    headers: xplanPostApiHeader,
    credentials: 'include', // needed based on the APIM changes
    body: JSON.stringify(newLinkPayload),
  });

  if (!linkResponse.ok) {
    const errMessage = 'Linking Failed failed';
    return Promise.reject(new Error(errMessage));
  }
  return linkResponse.json();
};
