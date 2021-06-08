import React, { useState } from 'react';
import { LoginFormData } from '../../../services/auth/types';
import {
  Button,
  Typography,
  Box,
  Grid,
  Icon,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '../../atoms';
import { Form } from './LoginForm.styles';
import { Alert, FormInput } from '../../molecules';

export interface LoginFormProps {
  errorMessage?: string;
  successMessage?: string;
  onSubmit: (inputs: LoginFormData) => Promise<void>;
}

const LoginForm = ({ errorMessage, successMessage, onSubmit }: LoginFormProps) => {
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
  const theme = useTheme();
  // This type shows as number but it must be a string. A fix is available in the latest MUI, which requires some refactoring in other places.
  const isMobile = useMediaQuery(theme.breakpoints.down('xs' as any));
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h1" color="primary" colorShade="dark2" align="center" gutterBottom>
          Welcome to Bestinvest
          <br />
          Digital Hybrid
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="sh1" color="grey" colorShade="dark1" align="center" gutterBottom>
          Please insert your details below
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} lg={6}>
        <Form onSubmit={onFormSubmit}>
          <Box maxWidth={389} m="auto">
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12}>
                <Grid container justify="space-between">
                  <Grid item xs={isMobile ? 12 : undefined}>
                    <FormInput
                      label="Username"
                      name="username"
                      value={inputs.username}
                      onChange={handleChange('username')}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon name="account" />
                        </InputAdornment>
                      }
                      fullWidth={isMobile}
                    />
                  </Grid>
                  <Grid item xs={isMobile ? 12 : undefined}>
                    <FormInput
                      label="Password"
                      name="password"
                      onChange={handleChange('password')}
                      value={inputs.password}
                      type="password"
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon name="passwordLockIcon" />
                        </InputAdornment>
                      }
                      fullWidth={isMobile}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Button
                    data-testid="login"
                    variant="contained"
                    color="gradient"
                    type="submit"
                    fullWidth
                  >
                    Log in
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Grid>
    </Grid>
  );
};
export default LoginForm;
