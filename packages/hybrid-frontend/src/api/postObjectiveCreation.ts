import { objectivePayLoad, entityIDParse, postApiHeader } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (formValues: Object, entityId: string) => {
  const newObjectivePayload = { ...objectivePayLoad, ...formValues };
  const objectiveUrl = ENDPOINTS['create-objective']?.replace(entityIDParse, entityId);

  const objectiveResponse = await fetch(objectiveUrl, {
    method: 'POST',
    headers: postApiHeader,
    credentials: 'include', // needed based on the APIM changes
    body: JSON.stringify(newObjectivePayload),
  });

  if (!objectiveResponse.ok) {
    const errMessage = 'Objective Creation failed';
    return Promise.reject(new Error(errMessage));
  }
  return objectiveResponse.json();
};
