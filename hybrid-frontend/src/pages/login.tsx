import React, { useState } from 'react';
import { navigate } from 'gatsby';
import LoginForm from '../components/LoginForm';
import { LoginFormData } from '../components/LoginForm/LoginForm';
import login from '../api/postLogin';
import useGlobalContext from '../hooks/GlobalContextHooks/useGlobalContext';
import { handleLoginSession } from '../services/auth';

interface LoginPageProps {
  path: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginPage = ({ path }: LoginPageProps) => {
  const [loginMessages, setLoginMessages] = useState<{
    error: string;
    success: string;
  }>({
    error: '',
    success: '',
  });

  const { setIsLoggedIn } = useGlobalContext();

  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    try {
      await login(loginFormValues); // TODO response

      setIsLoggedIn(true);

      handleLoginSession('HYBRID-LOGIN-SESSION');

      setLoginMessages({
        error: '',
        success: 'Log in successful',
      });

      navigate('/gmvp/accounts');
    } catch (e) {
      setIsLoggedIn(false);

      setLoginMessages({
        error: e.message,
        success: '',
      });
    }
  };

  return (
    <>
      <LoginForm
        onSubmit={onLoginFormSubmit}
        errorMessage={loginMessages.error}
        successMessage={loginMessages.success}
      />
    </>
  );
};

export default LoginPage;
