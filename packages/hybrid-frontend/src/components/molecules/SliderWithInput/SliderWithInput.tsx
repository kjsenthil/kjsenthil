import React from 'react';
import { Grid, Input, InputAdornment, Slider, Typography } from '../../atoms';

export interface SliderWithInputProps {
  label: string;
  max: number;
  min: number;
  name: string;
  onChange: (name: string, newValue: number | '') => void;
  step: number;
  value: number | '';
  inputDataTestId?: string;
  isCurrency?: boolean;
  onBlur?: () => void;
}

const SliderWithInput: React.FC<SliderWithInputProps> = ({
  inputDataTestId = '',
  isCurrency = false,
  label,
  max,
  min,
  name,
  onChange,
  step,
  value,
}) => {
  const handleSliderChange = (sliderName: string, newValue: number | number[]) => {
    // type guard for slider value, which could be an array
    if (Array.isArray(newValue)) {
      onChange(sliderName, newValue[0]);
    } else {
      onChange(sliderName, newValue);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? '' : Number(event.target.value);
    onChange(event.target.name, newValue);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography id="input-slider">{label}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Input
            value={value}
            onChange={handleInputChange}
            inputProps={{
              'aria-labelledby': 'input-slider',
              'data-testid': inputDataTestId,
              max,
              min,
              name,
              step,
              type: 'number',
            }}
            startAdornment={isCurrency ? <InputAdornment position="start">£</InputAdornment> : null}
          />
        </Grid>
      </Grid>

      <Slider
        max={max}
        min={min}
        name={name}
        step={step}
        value={typeof value === 'number' ? value : 0}
        onChange={(_event, newValue) => handleSliderChange(name, newValue)}
        aria-labelledby="input-slider"
      />
    </>
  );
};

export default SliderWithInput;
