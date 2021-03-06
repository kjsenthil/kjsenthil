import * as React from 'react';
import pluralize from 'pluralize';
import { FormInput, StaticTooltips, StepCard, Typography } from '@tswdts/react-components';
import { InputFieldsKeys } from '../../../../services/goal/machines/lifePlan';
import {
  SubPageStepCardContentWithInputsContainer,
  SubPageStepCardInputContainer,
} from '../CommonSubPage/CommonSubPage.styles';

export interface PlanningStepCardOneProps {
  onFocus: () => void;
  drawdownStartAge: number;
  drawdownEndAge: number;
  drawdownStartDate: Date | null;
  drawdownEndDate: Date | null;
  drawdownPeriodLengthYears: number;
  drawdownPeriodDeviationFromAverageComparison: string;
  handleToAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFromAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayError: (field: InputFieldsKeys) => string | undefined;
}

const PlanningStepCardOne = React.forwardRef(
  (
    {
      onFocus,
      drawdownStartAge,
      drawdownEndAge,
      drawdownStartDate,
      drawdownEndDate,
      drawdownPeriodLengthYears,
      drawdownPeriodDeviationFromAverageComparison,
      handleToAgeChange,
      handleFromAgeChange,
      displayError,
    }: PlanningStepCardOneProps,
    ref
  ) => {
    const drawdownStartYear = drawdownStartDate ? drawdownStartDate.getFullYear() : 0;
    const drawdownEndYear = drawdownEndDate ? drawdownEndDate.getFullYear() : 0;

    return (
      <StepCard
        ref={ref}
        step={1}
        title="When would you like to access your retirement income?"
        digitalCoachBoxProps={{
          title: 'It might help to know...',
          description: `You’re planning to retire over ${pluralize(
            'year',
            drawdownPeriodLengthYears,
            true
          )}. That’s ${drawdownPeriodDeviationFromAverageComparison} most people.`,
          tooltip: StaticTooltips.retirementLength,
        }}
      >
        <SubPageStepCardContentWithInputsContainer>
          <SubPageStepCardInputContainer>
            <FormInput
              label="From age"
              name="from-age"
              type="number"
              hideNumberSpinButton
              fullWidth
              onChange={handleFromAgeChange}
              onFocus={onFocus}
              error={displayError('drawdownStartAge')}
              value={String(drawdownStartAge) || ''}
              shouldDelayOnChange
            />
            <Typography variant="b5" color="primary" colorShade="dark2">
              {`That's year ${drawdownStartYear}`}
            </Typography>
          </SubPageStepCardInputContainer>

          <SubPageStepCardInputContainer>
            <FormInput
              label="To age"
              name="to-age"
              type="number"
              hideNumberSpinButton
              fullWidth
              onChange={handleToAgeChange}
              onFocus={onFocus}
              error={displayError('drawdownEndAge')}
              value={String(drawdownEndAge) || ''}
              shouldDelayOnChange
            />
            <Typography variant="b5" color="primary" colorShade="dark2">
              {`That's year ${drawdownEndYear}`}
            </Typography>
          </SubPageStepCardInputContainer>
        </SubPageStepCardContentWithInputsContainer>
      </StepCard>
    );
  }
);

export default PlanningStepCardOne;
