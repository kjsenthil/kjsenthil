import { LoginFormData } from '../components/organisms/LoginForm/LoginForm';
import { loginPayload, loginURL } from './apiConstants';

export default async (values: LoginFormData): Promise<void> => {
  const payload = loginPayload
    .replace(/\{username\}/, values.username)
    .replace(/\{password\}/, values.password);

  const response = await fetch(loginURL, {
    method: 'POST',
    // headers: postApiHeader, // TODO: replace with JSON when the API can support it
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
