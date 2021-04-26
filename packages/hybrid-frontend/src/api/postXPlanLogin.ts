import { LoginFormData } from '../components/organisms/LoginForm/LoginForm';
import { xplanloginPayload, xPlanBaseUrl } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (values: LoginFormData): Promise<void> => {
  const loginURL = ENDPOINTS['login-to-xplan'] || `${xPlanBaseUrl}/resourceful/site`;

  const payload = xplanloginPayload
    .replace(/\{username\}/, values.username)
    .replace(/\{password\}/, values.password);

  const response = await fetch(loginURL, {
    method: 'POST',
    // headers: xplanPostApiHeader, // TODO: replace with JSON when the API can support it
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    credentials: 'include', // needed based on the APIM changes
    body: payload,
  });

  if (!response.ok) {
    return Promise.reject(new Error('Log in failed'));
  }

  // no response - a session cookie will be set
  return Promise.resolve();
};
