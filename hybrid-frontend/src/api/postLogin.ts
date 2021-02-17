import { LoginFormData } from '../components/LoginForm/LoginForm';

const LOGIN_URL = 'https://tbigroupuat2.xplan.iress.co.uk/home/tfaprelogin';

export default async (values: LoginFormData): Promise<any> => {
  const payload = {
    userid: values.username,
    passwd: values.password,
    rolename: 'User',
  };

  const response = await fetch(LOGIN_URL, {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  if (!response.ok) {
    return Promise.reject(new Error('Unable to login'));
  }

  const resultData = await response.json();
  return resultData.Data;
};
