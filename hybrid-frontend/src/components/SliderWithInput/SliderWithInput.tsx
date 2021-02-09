import React from 'react';
import { Grid, Input, Slider, Typography } from '@material-ui/core';

interface SliderWithInputProps {
  label: string;
  max: number;
  min: number;
  name: string;
  onChange: (name: string, newValue: number) => void;
  step: number;
  value: number;
  onBlur?: () => void;
}

const SliderWithInput: React.FC<SliderWithInputProps> = ({
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
    const newValue = event.target.value === '' ? min : Number(event.target.value);
    onChange(event.target.name, newValue);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (value < min) {
      onChange(event.target.name, min);
    } else if (value > max) {
      onChange(event.target.name, max);
    }
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
            onBlur={handleBlur}
            inputProps={{
              'aria-labelledby': 'input-slider',
              'data-testid': 'slider-with-input',
              max,
              min,
              name,
              step,
              type: 'number',
            }}
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
