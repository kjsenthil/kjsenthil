import React, { useState } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '../../atoms';
import { Alert, FormInput } from '../../molecules';
import { initStatePins } from '../../../constants';
import { PinLoginItem } from '../../../services';
import { convertToOrdinal } from '../../../utils/string';

export interface PinLoginProps {
  errorMessage?: string;
  successMessage?: string;
  onPinSubmit: (inputs: PinLoginItem[]) => Promise<void>;
}

const PinLogin = ({ errorMessage, successMessage, onPinSubmit }: PinLoginProps) => {
  const theme = useTheme();

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

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid container spacing={8} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="sh1" color="grey" colorShade="dark1" align="center" gutterBottom>
          Please insert the digits from your pin as requested below
        </Typography>
      </Grid>
      <form onSubmit={onSubmit}>
        <Box maxWidth={600} m="auto">
          <Grid container spacing={2} justifyContent="center">
            {inputs.map((pinField, index) => (
              <Grid item xs={isMobile ? 9 : undefined} key={String(pinField.position)}>
                <FormInput
                  type="number"
                  name={`pin-${index + 1}`}
                  value={pinField.value ? String(pinField.value) : ''}
                  label={`${convertToOrdinal(pinField.position)} digit of your pin`}
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
              <Grid container justifyContent="center">
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
