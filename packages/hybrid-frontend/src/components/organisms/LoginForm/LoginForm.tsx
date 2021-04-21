import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Grid, TextField, Typography, Spacer } from '../../atoms';
import { Alert } from '../../molecules';

const Title = styled((props) => <Typography variant="sh1" {...props} />)`
  color: #7b7b7b;
  text-transform: uppercase;
`;

const Form = styled.form`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
`;

const TextFieldContainer = styled((props) => <Grid item {...props} />)`
  margin: 0 0 1rem;
`;

export interface LoginFormData {
  password: string;
  username: string;
}

export interface LoginFormProps {
  errorMessage: string;
  successMessage: string;
  onSubmit: (inputs: LoginFormData) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ errorMessage, successMessage, onSubmit }) => {
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
      <Title>Log In</Title>
      <Form onSubmit={onFormSubmit}>
        {successMessage.length > 0 && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage.length > 0 && <Alert severity="error">{errorMessage}</Alert>}

        <TextFieldContainer>
          <TextField
            label="Username"
            InputProps={{ id: 'username' }}
            InputLabelProps={{ htmlFor: 'username' }}
            onChange={handleChange('username')}
            value={inputs.username}
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <TextField
            label="Password"
            InputProps={{ id: 'password' }}
            InputLabelProps={{ htmlFor: 'password' }}
            onChange={handleChange('password')}
            type="password"
            value={inputs.password}
          />
        </TextFieldContainer>
        <Spacer y={2} />
        <Button data-testid="login" variant="contained" color="primary" type="submit">
          Log in
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
