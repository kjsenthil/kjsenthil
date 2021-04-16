import { entityIDParse, postApiHeader } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (formValues: Object, entityId: string, goalIndex: string) => {
  const newGoalsPayload = { ...formValues };

  const goalsURL = `${ENDPOINTS['create-goal-less-fields']?.replace(
    entityIDParse,
    entityId
  )}/${goalIndex}`;

  const goalsResponse = await fetch(goalsURL, {
    method: 'PATCH',
    headers: postApiHeader,
    credentials: 'include', // needed based on the APIM changes
    body: JSON.stringify(newGoalsPayload),
  });

  if (!goalsResponse.ok) {
    const errMessage = 'Failed in Updating the Goal';
    return Promise.reject(new Error(errMessage));
  }
  return goalsResponse.json();
};
