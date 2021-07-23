import * as React from 'react';
import { InputFieldsKeys } from '../../../../services/goal/machines/lifePlan';
import { SubPageStepCardContentWithInputsContainer } from '../CommonSubPage/CommonSubPage.styles';
import { FormInput } from '../../../molecules';
import StepCardExperimental from '../../../organisms/StepCardExperimental';

export interface PlanningStepCardThreeProps {
  onFocus: () => void;
  drawdownStartAge: number;
  lumpSumAmount: number;
  lumpSumAge: number;
  handleLumpSumAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLumpSumAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayError: (field: InputFieldsKeys) => string | undefined;
}

const PlanningStepCardThree = React.forwardRef(
  (
    {
      onFocus,
      drawdownStartAge,
      lumpSumAmount,
      lumpSumAge,
      handleLumpSumAmountChange,
      handleLumpSumAgeChange,
      displayError,
    }: PlanningStepCardThreeProps,
    ref
  ) => (
    <StepCardExperimental
      ref={ref}
      step={3}
      title="Would you like to take out a cash lump sum?"
      digitalCoachBoxProps={{
        title: 'It might help to know...',
        description: `At retirement, you can normally take up to 25% of your
           pension from age ${drawdownStartAge} as a tax free cash lump sum.`,
      }}
    >
      <SubPageStepCardContentWithInputsContainer>
        <FormInput
          disabled
          label="Lump sum amount"
          name="lump-sum-amount"
          type="number"
          hideNumberSpinButton
          fullWidth
          onChange={handleLumpSumAmountChange}
          onFocus={onFocus}
          error={displayError('lumpSum')}
          value={lumpSumAmount || undefined}
        />
        <FormInput
          disabled
          label="At age"
          name="lump-sum-age"
          type="number"
          hideNumberSpinButton
          fullWidth
          onChange={handleLumpSumAgeChange}
          onFocus={onFocus}
          error={displayError('lumpSum')}
          value={lumpSumAge || undefined}
        />
      </SubPageStepCardContentWithInputsContainer>
    </StepCardExperimental>
  )
);

export default PlanningStepCardThree;
