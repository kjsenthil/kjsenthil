import { entityIDParse, goalsPayLoad, postApiHeader } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (formValues: Object, entityId: string) => {
  const newGoalsPayload = { ...goalsPayLoad, ...formValues };

  const goalsURL = ENDPOINTS['create-goal-less-fields']?.replace(entityIDParse, entityId);

  const goalsResponse = await fetch(goalsURL, {
    method: 'POST',
    headers: postApiHeader,
    credentials: 'include', // needed based on the APIM changes
    body: JSON.stringify(newGoalsPayload),
  });

  if (!goalsResponse.ok) {
    const errMessage = 'Goal Creation failed';
    return Promise.reject(new Error(errMessage));
  }
  return goalsResponse.json();
};
