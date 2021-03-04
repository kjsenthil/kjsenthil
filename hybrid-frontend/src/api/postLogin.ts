import { LoginFormData } from '../components/LoginForm/LoginForm';

export default async (values: LoginFormData): Promise<any> => {
  const payload = {
    userid: values.username,
    passwd: values.password,
    rolename: 'User',
  };

  const response = await fetch(`${process.env.XPLAN_BASE_URL}/home/tfaprelogin`, {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  if (!response.ok) {
    return Promise.reject(new Error('Unable to login'));
  }

  const resultData = await response.json();
  return resultData.Data;
};
