import React, { useState } from 'react';
import { ProjectionRequest } from '../../../services/projections/types';
import { Button } from '../../atoms';
import SliderWithInput from '../../molecules/SliderWithInput';

export interface SimulationFormProps {
  projInputStateVals?: ProjectionRequest;
  onSubmit: (formValues: ProjectionRequest) => void;
}

const projInputDefaultValues = {
  monthlyInvestment: 200,
  upfrontInvestment: 2000,
  investmentPeriod: 30,
};

const SimulationForm = ({
  onSubmit,
  projInputStateVals = projInputDefaultValues,
}: SimulationFormProps) => {
  const [inputs, setInputs] = useState(projInputStateVals);

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
