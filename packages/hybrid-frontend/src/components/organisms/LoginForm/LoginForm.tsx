import React, { useState } from 'react';
import styled from 'styled-components';
import { LoginFormData } from '../../../services/auth/types';
import { Button, Typography, Spacer } from '../../atoms';
import { FormInput, Alert } from '../../molecules';

const Form = styled.form`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
`;

export interface LoginFormProps {
  errorMessage?: string;
  successMessage?: string;
  onSubmit: (inputs: LoginFormData) => Promise<void>;
  title?: string;
}

const LoginForm = ({ errorMessage, successMessage, onSubmit, title }: LoginFormProps) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: remove this when we upgrade to React 17
    event.persist();

    setInputs((currentInputs) => ({ ...currentInputs, [name]: event.target.value }));
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(inputs);
  };

  return (
    <>
      {title && <Typography variant="h4">{title}</Typography>}
      <Spacer y={2} />
      <Form onSubmit={onFormSubmit}>
        <FormInput
          label="Username"
          name="username"
          value={inputs.username}
          onChange={handleChange('username')}
        />
        <Spacer y={1} />
        <FormInput
          label="Password"
          name="password"
          onChange={handleChange('password')}
          value={inputs.password}
          type="password"
        />
        <Spacer y={3} />
        <Button data-testid="login" variant="contained" color="primary" type="submit">
          Log in
        </Button>
        <Spacer y={2} />
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Form>
    </>
  );
};

export default LoginForm;
