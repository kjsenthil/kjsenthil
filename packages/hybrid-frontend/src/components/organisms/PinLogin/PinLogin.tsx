import React, { useState } from 'react';
import { initStatePins } from '../../../constants';
import { PinLoginItem } from '../../../services/auth';
import { Button, Card, CardContent, Grid, Spacer, TextField } from '../../atoms';
import { Alert } from '../../molecules';

export interface PinLoginProps {
  errorMessage?: string;
  successMessage?: string;
  onPinSubmit: (inputs: PinLoginItem[]) => Promise<void>;
}

const PinLogin = ({ errorMessage, successMessage, onPinSubmit }: PinLoginProps) => {
  const [inputs, setInputs] = useState<PinLoginItem[]>(initStatePins);

  const handleChange = (posIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: remove this when we upgrade to React 17
    event.persist();
    setInputs((currInputs) => {
      const newCurrInputs = [...currInputs];
      newCurrInputs[posIndex].value = Number(event.target.value);
      return newCurrInputs;
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resp = await onPinSubmit(inputs);
    return resp;
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} alignItems="center" justify="center">
            {inputs.map((pinField, index) => (
              <Grid item xs={3} key={String(pinField.position) + String(pinField.value)}>
                <TextField
                  type="number"
                  label={pinField.position}
                  value={pinField.value}
                  onChange={handleChange(index)}
                />
              </Grid>
            ))}

            <Button data-testid="pin-login" variant="contained" color="primary" type="submit">
              Log in
            </Button>
          </Grid>
        </form>
        <Spacer y={2} />
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </CardContent>
    </Card>
  );
};

export default PinLogin;
