import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: '50%',
  },
}));

export interface CaptureGoalData {
  targetAmount: number;
  targetYear: number;
  upfrontInvestment: number;
  monthlyInvestment: number;
  riskAppetite: string;
}

export interface CaptureGoalProps {
  onSubmit: (formValues: CaptureGoalData) => void;
}

const CaptureGoal: React.FC<CaptureGoalProps> = ({ onSubmit }) => {
  const classes = useStyles();

  const [inputs, setInputs] = useState({
    targetAmount: 0,
    targetYear: 2021,
    upfrontInvestment: 0,
    monthlyInvestment: 0,
    riskAppetite: 'cautious',
  });

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = value === '' ? '' : Number(value);
    setInputs((currentInputs) => ({ ...currentInputs, [name]: newValue }));
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => {
    const { name, value } = event.target;
    if (name) {
      setInputs((currentInputs) => ({ ...currentInputs, [name]: value }));
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputs);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.formControl}
            id="targetAmount"
            InputLabelProps={{ htmlFor: 'targetAmount' }}
            inputProps={{
              min: 0,
              name: 'targetAmount',
              step: 500,
              type: 'number',
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            label="Target Amount"
            onChange={handleNumberChange}
            value={inputs.targetAmount}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.formControl}
            id="targetYear"
            label="Target Year"
            InputLabelProps={{ htmlFor: 'targetYear' }}
            inputProps={{
              min: 2021,
              name: 'targetYear',
              type: 'number',
            }}
            onChange={handleNumberChange}
            value={inputs.targetYear}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.formControl}
            id="upfrontInvestment"
            label="Upfront Investment"
            InputLabelProps={{ htmlFor: 'upfrontInvestment' }}
            inputProps={{
              max: 20000,
              min: 0,
              name: 'upfrontInvestment',
              step: 500,
              type: 'number',
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            onChange={handleNumberChange}
            value={inputs.upfrontInvestment}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.formControl}
            id="monthlyInvestment"
            InputLabelProps={{ htmlFor: 'monthlyInvestment' }}
            inputProps={{
              min: 0,
              name: 'monthlyInvestment',
              step: 50,
              type: 'number',
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            label="Monthly Investment"
            onChange={handleNumberChange}
            value={inputs.monthlyInvestment}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="risk-appetite-label">Risk Appetite</InputLabel>
            <Select
              inputProps={{
                name: 'riskAppetite',
                id: 'risk-appetite-label',
              }}
              labelId="risk-appetite-label"
              native
              onChange={handleSelectChange}
              value={inputs.riskAppetite}
            >
              <option value="defensive">Defensive</option>
              <option value="cautious">Cautious</option>
              <option value="moderate">Moderate</option>
              <option value="growth">Growth</option>
              <option value="adventurous">Adventurous</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={onFormSubmit} type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CaptureGoal;