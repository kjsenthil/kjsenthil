import * as React from 'react';
import {
  CurrencyPresentationVariant,
  FormInput,
  Spacer,
  TypographyWithTooltip,
  StepCard,
  formatCurrency,
} from '@tsw/react-components';
import { InputFieldsKeys } from '../../../../services/goal/machines/lifePlan';
import {
  SubPageStepCardContentWithInputsAndSignContainer,
  SubPageStepCardInputContainer,
} from '../CommonSubPage/CommonSubPage.styles';
import EqualSign from '../CommonSubPage/EqualSign';

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
    That&#39;s {formatCurrency(amount, CurrencyPresentationVariant.PROJECTION)} in tomorrow&#39;s
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
    <StepCard
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
              shouldDelayOnChange
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
            shouldDelayOnChange
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
    </StepCard>
  )
);

export default PlanningStepCardTwo;
