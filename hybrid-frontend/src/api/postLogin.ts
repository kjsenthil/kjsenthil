import { LoginFormData } from '../components/organisms/LoginForm/LoginForm';
import ENDPOINTS from './endpoints';

export default async (values: LoginFormData): Promise<void> => {
  // TODO: replace with JSON when the API can support it
  const payload = 'username={username}&password={password}&loginmode=client&force=0&domain=coa&site_type=full'
    .replace(/\{username\}/, values.username)
    .replace(/\{password\}/, values.password);

  const response = await fetch(ENDPOINTS['login-to-xplan'], {
    body: payload,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });

  if (!response.ok) {
    return Promise.reject(new Error('Log in failed'));
  }

  // no response - a session cookie will be set
  return Promise.resolve();
};
