import React, { useState } from 'react';
import { ProjectionRequest } from '../../../services';
import { Button } from '../../atoms';
import SliderWithInput from '../SliderWithInput';

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

  return (
    <>
      <SliderWithInput
        isCurrency
        label="Upfront investment"
        min={0}
        max={20000}
        name="upfrontInvestment"
        setValue={(newValue) =>
          setInputs((currentInputs) => ({
            ...currentInputs,
            upfrontInvestment: newValue,
          }))
        }
        step={100}
        value={inputs.upfrontInvestment}
      />
      <SliderWithInput
        isCurrency
        label="Monthly investment"
        min={0}
        max={2500}
        name="monthlyInvestment"
        setValue={(newValue) =>
          setInputs((currentInputs) => ({
            ...currentInputs,
            monthlyInvestment: newValue,
          }))
        }
        step={100}
        value={inputs.monthlyInvestment}
      />
      <SliderWithInput
        label="Time horizon"
        min={0}
        max={50}
        name="investmentPeriod"
        setValue={(newValue) =>
          setInputs((currentInputs) => ({
            ...currentInputs,
            investmentPeriod: newValue,
          }))
        }
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
