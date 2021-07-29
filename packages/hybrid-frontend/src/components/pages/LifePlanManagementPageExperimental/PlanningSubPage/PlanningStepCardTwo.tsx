import * as React from 'react';
import { InputFieldsKeys } from '../../../../services/goal/machines/lifePlan';
import {
  SubPageStepCardContentWithInputsAndSignContainer,
  SubPageStepCardInputContainer,
} from '../CommonSubPage/CommonSubPage.styles';
import { FormInput, TypographyWithTooltip } from '../../../molecules';
import StepCardExperimental from '../../../organisms/StepCardExperimental';
import EqualSign from '../CommonSubPage/EqualSign';
import { formatCurrency } from '../../../../utils/formatters';
import { Spacer } from '../../../atoms';

export interface PlanningStepCardTwoProps {
  onFocus: () => void;
  annualIncome: number;
  monthlyIncome: number;
  annualIncomeInTomorrowsMoney: number;
  monthlyIncomeInTomorrowsMoney: number;
  handleAnnualIncomeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMonthlyIncomeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayError: (field: InputFieldsKeys) => string | undefined;
}

const InflationAdjustedIncomeDescription = ({ amount }: { amount: number }) => (
  <TypographyWithTooltip tooltip="Some description">
    That&#39;s {formatCurrency(amount, { opts: { maximumFractionDigits: 0 } })} in tomorrow&#39;s
    money
  </TypographyWithTooltip>
);

const PlanningStepCardTwo = React.forwardRef(
  (
    {
      onFocus,
      annualIncome,
      monthlyIncome,
      annualIncomeInTomorrowsMoney,
      monthlyIncomeInTomorrowsMoney,
      handleAnnualIncomeChange,
      handleMonthlyIncomeChange,
      displayError,
    }: PlanningStepCardTwoProps,
    ref
  ) => (
    <StepCardExperimental
      ref={ref}
      title="What would you like your retirement income to be?"
      step={2}
      digitalCoachBoxProps={{
        title: 'It might help to know...',
        description: 'Most people are comfortable in retirement on 60% of their working income.',
      }}
    >
      <>
        <SubPageStepCardContentWithInputsAndSignContainer>
          <SubPageStepCardInputContainer>
            <FormInput
              label="Annual income"
              name="annual-income"
              type="number"
              hideNumberSpinButton
              onChange={handleAnnualIncomeChange}
              onFocus={onFocus}
              fullWidth
              error={displayError('annualIncome')}
              value={String(annualIncome || '')}
            />
          </SubPageStepCardInputContainer>
          <EqualSign />
          <FormInput
            label="Monthly income"
            name="monthly-income"
            type="number"
            hideNumberSpinButton
            onChange={handleMonthlyIncomeChange}
            onFocus={onFocus}
            fullWidth
            error={displayError('monthlyIncome')}
            value={String(annualIncome > 0 ? monthlyIncome : '')}
          />
        </SubPageStepCardContentWithInputsAndSignContainer>
        <Spacer y={1} />
        <SubPageStepCardContentWithInputsAndSignContainer>
          <SubPageStepCardInputContainer>
            {!!annualIncome && (
              <InflationAdjustedIncomeDescription amount={annualIncomeInTomorrowsMoney} />
            )}
          </SubPageStepCardInputContainer>
          <Spacer x={0} />

          {!!monthlyIncome && (
            <InflationAdjustedIncomeDescription amount={monthlyIncomeInTomorrowsMoney} />
          )}
        </SubPageStepCardContentWithInputsAndSignContainer>
      </>
    </StepCardExperimental>
  )
);

export default PlanningStepCardTwo;
