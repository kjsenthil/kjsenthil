import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import SliderWithInput from '../SliderWithInput';

export interface SimulationFormData {
  monthlyInvestment: number | null;
  upfrontInvestment: number | null;
  investmentPeriod: number | null;
}

interface SimulationFormProps {
  onSubmit: (formValues: SimulationFormData) => void;
}

const SimulationForm: React.FC<SimulationFormProps> = ({ onSubmit }) => {
  const [inputs, setInputs] = useState({
    monthlyInvestment: 200,
    upfrontInvestment: 2000,
    investmentPeriod: 30,
  });

  const handleSliderChange = (name: string, newValue: number | '') => {
    setInputs((currentInputs) => ({ ...currentInputs, [name]: newValue }));
  };

  return (
    <>
      <SliderWithInput
        isCurrency
        label="Upfront investment"
        min={0}
        max={20000}
        name="upfrontInvestment"
        onChange={handleSliderChange}
        step={100}
        value={inputs.upfrontInvestment}
      />
      <SliderWithInput
        isCurrency
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
        name="investmentPeriod"
        onChange={handleSliderChange}
        step={1}
        value={inputs.investmentPeriod}
      />
      <Button
        data-testid="simulation-form-update"
        variant="contained"
        color="primary"
        onClick={() => onSubmit(inputs)}
      >
        Update
      </Button>
    </>
  );
};

export default SimulationForm;
