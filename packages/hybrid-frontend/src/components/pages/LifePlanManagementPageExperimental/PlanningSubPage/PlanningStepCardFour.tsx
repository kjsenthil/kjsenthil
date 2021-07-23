import * as React from 'react';
import { InputFieldsKeys } from '../../../../services/goal/machines/lifePlan';
import { SubPageStepCardContentWithInputsContainer } from '../CommonSubPage/CommonSubPage.styles';
import { FormInput } from '../../../molecules';
import StepCardExperimental from '../../../organisms/StepCardExperimental';

export interface PlanningStepCardFourProps {
  onFocus: () => void;
  drawdownEndAge: number;
  remainingAmount: number;
  handleRemainingAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayError: (field: InputFieldsKeys) => string | undefined;
}

const PlanningStepCardFour = React.forwardRef(
  (
    {
      onFocus,
      drawdownEndAge,
      remainingAmount,
      handleRemainingAmountChange,
      displayError,
    }: PlanningStepCardFourProps,
    ref
  ) => (
    <StepCardExperimental
      ref={ref}
      step={4}
      title={`Would you like to have money left over at ${drawdownEndAge}?`}
      digitalCoachBoxProps={{
        title: 'It might help to know...',
        description: `Some people like to leave some money to their family or
         just have a buffer at the end of their planned retirement.`,
      }}
    >
      <SubPageStepCardContentWithInputsContainer>
        <FormInput
          disabled
          label="Remaining amount"
          name="remaining-amount"
          type="number"
          hideNumberSpinButton
          fullWidth
          onChange={handleRemainingAmountChange}
          onFocus={onFocus}
          error={displayError('lumpSum')}
          value={remainingAmount || undefined}
        />
      </SubPageStepCardContentWithInputsContainer>
    </StepCardExperimental>
  )
);

export default PlanningStepCardFour;