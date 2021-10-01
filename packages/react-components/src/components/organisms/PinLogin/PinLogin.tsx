import React from 'react';
import { PinLoginItem } from '../../../services';
import { convertToOrdinal } from '../../../utils/string';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '../../atoms';
import { Alert, FormInput } from '../../molecules';
import { usePinInputs } from './hooks';

export interface PinLoginProps {
  errorMessage?: string;
  successMessage?: string;
  onPinSubmit: (inputs: PinLoginItem[]) => Promise<void>;
}

const PinLogin = ({ errorMessage, successMessage, onPinSubmit }: PinLoginProps) => {
  const { inputs, setInputValue, focusInput } = usePinInputs();

  const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as any).value;
    if (event.key === 'Backspace' && index !== 0 && !inputValue) {
      event.preventDefault();
      focusInput(index - 1);
    } else if (event.key.length === 1 && Number.isNaN(Number(event.key))) {
      event.preventDefault();
    }
  };

  const handleChange = (index: number) => ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(index, Number(value));
    const nextIndex = index + 1;
    if (nextIndex < inputs.length && value) {
      focusInput(nextIndex);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resp = await onPinSubmit(inputs.map(({ position, value }) => ({ position, value })));
    return resp;
  };

  const theme = useTheme();
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
            {inputs.map(({ value, position, ref }, index) => (
              <Grid item xs={isMobile ? 9 : undefined} key={String(position)}>
                <FormInput
                  type="password"
                  name={`pin-${index + 1}`}
                  value={value ? String(value) : ''}
                  label={`${convertToOrdinal(position)}`}
                  inputProps={{ maxLength: 1, inputMode: 'numeric' }}
                  inputRef={ref}
                  onKeyDown={handleKeyDown(index)}
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
