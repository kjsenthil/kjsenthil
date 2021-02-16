import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 0 2rem',
  },
  heading: {
    color: '#7b7b7b',
    textTransform: 'uppercase',
  },
  form: {
    border: '2px solid #ccc',
    borderRadius: '5px',
    padding: '1rem',
  },
  loginTextField: {
    margin: '0 0 1rem',
  },
}));

export interface LoginFormData {
  password: string;
  username: string;
}

interface LoginFormProps {
  onSubmit: (inputs: LoginFormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const classes = useStyles();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: remove this when we upgrade to React 17
    event.persist();

    setInputs((currentInputs) => ({ ...currentInputs, [name]: event.target.value }));
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputs);
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.heading}>
        Log In
      </Typography>
      <form className={classes.form} onSubmit={onFormSubmit}>
        <Grid className={classes.loginTextField} item>
          <TextField
            label="Username"
            InputProps={{ id: 'username' }}
            InputLabelProps={{ htmlFor: 'username' }}
            onChange={handleChange('username')}
            value={inputs.username}
          />
        </Grid>
        <Grid className={classes.loginTextField} item>
          <TextField
            label="Password"
            InputProps={{ id: 'password' }}
            InputLabelProps={{ htmlFor: 'password' }}
            onChange={handleChange('password')}
            type="password"
            value={inputs.password}
          />
        </Grid>

        <Button
          data-testid="login"
          variant="contained"
          color="primary"
          type="submit"
        >
          Log in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
