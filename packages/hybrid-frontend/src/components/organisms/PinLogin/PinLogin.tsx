import React, { useState } from 'react';
import { initStatePins } from '../../../constants';
import { PinLoginItem } from '../../../services/auth';
import { Grid, Typography, Button, Box, useMediaQuery, useTheme } from '../../atoms';
import { Alert, FormInput } from '../../molecules';

const buildPinFieldLabel = (pinPosition) => {
  switch (pinPosition) {
    case 1:
      return '1st digit of your pin';
    case 2:
      return '2nd digit of your pin';
    case 3:
      return '3rd digit of your pin';
    case 4:
      return '4th digit of your pin';
    case 5:
      return '5th digit of your pin';
    case 6:
      return '6th digit of your pin';
    default:
  }
  return '';
};

export interface PinLoginProps {
  errorMessage?: string;
  successMessage?: string;
  onPinSubmit: (inputs: PinLoginItem[]) => Promise<void>;
}

const PinLogin = ({ errorMessage, successMessage, onPinSubmit }: PinLoginProps) => {
  const [inputs, setInputs] = useState<PinLoginItem[]>(initStatePins);
  const theme = useTheme();
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

  const isMobile = useMediaQuery(theme.breakpoints.down('xs' as any));

  return (
    <Grid container spacing={8} justify="center">
      <Grid item xs={12}>
        <Typography variant="sh1" color="grey" colorShade="dark1" align="center" gutterBottom>
          Please insert the digits from your pin as requested below
        </Typography>
      </Grid>
      <form onSubmit={onSubmit}>
        <Box maxWidth={600} m="auto">
          <Grid container spacing={2} justify="center">
            {inputs.map((pinField, index) => (
              <Grid
                item
                xs={isMobile ? 9 : undefined}
                key={String(pinField.position) + String(pinField.value)}
              >
                <FormInput
                  type="number"
                  label={String(buildPinFieldLabel(pinField.position))}
                  value={pinField.value}
                  onChange={handleChange(index)}
                  fullWidth={isMobile}
                />
              </Grid>
            ))}
            <Grid item xs={9} sm={12}>
              <Button
                data-testid="pin-login"
                variant="contained"
                color="gradient"
                type="submit"
                fullWidth
              >
                Pin log in
              </Button>
            </Grid>
            <Grid item xs={9} sm={12}>
              <Grid container justify="center">
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Grid>
  );
};

export default PinLogin;
