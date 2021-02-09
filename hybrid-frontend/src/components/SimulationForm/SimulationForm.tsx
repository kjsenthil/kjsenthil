import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import SliderWithInput from '../SliderWithInput';

const SimulationForm = () => {
  const [inputs, setInputs] = useState({
    monthlyInvestment: 20,
    upfrontInvestment: 200,
    timeHorizon: 5,
  });

  const handleSliderChange = (name: string, newValue: number) => {
    setInputs((currentInputs) => ({ ...currentInputs, [name]: newValue }));
  };

  return (
    <>
      <SliderWithInput
        label="Upfront investment"
        min={0}
        max={20000}
        name="upfrontInvestment"
        onChange={handleSliderChange}
        step={100}
        value={inputs.upfrontInvestment}
      />
      <SliderWithInput
        label="Monthly investment"
        min={0}
        max={2500}
        name="monthlyInvestment"
        onChange={handleSliderChange}
        step={100}
        value={inputs.monthlyInvestment}
      />
      <SliderWithInput
        label="Time horizon"
        min={0}
        max={50}
        name="timeHorizon"
        onChange={handleSliderChange}
        step={1}
        value={inputs.timeHorizon}
      />
      <Button variant="contained" color="primary">
        Update
      </Button>
    </>
  );
};

export default SimulationForm;
