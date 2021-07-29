import * as React from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps, useLocation } from '@reach/router';
import PlanningStepCardOne, { PlanningStepCardOneProps } from './PlanningStepCardOne';
import PlanningStepCardTwo, { PlanningStepCardTwoProps } from './PlanningStepCardTwo';
import PlanningStepCardThree, { PlanningStepCardThreeProps } from './PlanningStepCardThree';
import PlanningStepCardFour, { PlanningStepCardFourProps } from './PlanningStepCardFour';

import GoalCreationSubPageLayout from '../../../templates/GoalCreationSubPageLayoutExperimental';

type SubComponentsProps = Omit<
  RouteComponentProps &
    PlanningStepCardOneProps &
    PlanningStepCardTwoProps &
    PlanningStepCardThreeProps &
    PlanningStepCardFourProps,
  'onFocus'
>;

export interface PlanningSubPageProps extends SubComponentsProps {
  renderContentSide: () => React.ReactNode;
}

export default function PlanningSubPage({
  renderContentSide,
  drawdownStartAge,
  drawdownEndAge,
  drawdownStartDate,
  drawdownEndDate,
  drawdownPeriodLengthYears,
  drawdownPeriodDeviationFromAverageComparison,
  handleToAgeChange,
  handleFromAgeChange,

  annualIncome,
  monthlyIncome,
  annualIncomeInTomorrowsMoney,
  monthlyIncomeInTomorrowsMoney,

  handleAnnualIncomeChange,
  handleMonthlyIncomeChange,

  lumpSumAge,
  lumpSumAmount,
  handleLumpSumAmountChange,
  handleLumpSumAgeChange,

  remainingAmount,
  handleRemainingAmountChange,

  displayError,
}: PlanningSubPageProps) {
  const { hash: currentUrlHash } = useLocation();

  const stepCardOneElementRef = React.useRef<HTMLElement | null>(null);
  const stepCardTwoElementRef = React.useRef<HTMLElement | null>(null);
  const stepCardThreeElementRef = React.useRef<HTMLElement | null>(null);
  const stepCardFourElementRef = React.useRef<HTMLElement | null>(null);

  const handleStepOneInputsFocused = () => {
    navigate('#step-1');
  };
  const handleStepTwoInputsFocused = () => {
    navigate('#step-2');
  };
  const handleStepThreeInputsFocused = () => {
    navigate('#step-3');
  };
  const handleStepFourInputsFocused = () => {
    navigate('#step-4');
  };

  const mainContentElements = [
    {
      hash: '#step-1',
      ref: stepCardOneElementRef,
      element: (
        <PlanningStepCardOne
          ref={stepCardOneElementRef}
          onFocus={handleStepOneInputsFocused}
          drawdownStartAge={drawdownStartAge}
          drawdownEndAge={drawdownEndAge}
          drawdownStartDate={drawdownStartDate}
          drawdownEndDate={drawdownEndDate}
          drawdownPeriodLengthYears={drawdownPeriodLengthYears}
          drawdownPeriodDeviationFromAverageComparison={
            drawdownPeriodDeviationFromAverageComparison
          }
          handleToAgeChange={handleToAgeChange}
          handleFromAgeChange={handleFromAgeChange}
          displayError={displayError}
        />
      ),
    },

    {
      hash: '#step-2',
      ref: stepCardTwoElementRef,
      element: (
        <PlanningStepCardTwo
          ref={stepCardTwoElementRef}
          onFocus={handleStepTwoInputsFocused}
          annualIncome={annualIncome}
          monthlyIncome={monthlyIncome}
          annualIncomeInTomorrowsMoney={annualIncomeInTomorrowsMoney}
          monthlyIncomeInTomorrowsMoney={monthlyIncomeInTomorrowsMoney}
          handleAnnualIncomeChange={handleAnnualIncomeChange}
          handleMonthlyIncomeChange={handleMonthlyIncomeChange}
          displayError={displayError}
        />
      ),
    },

    {
      hash: '#step-3',
      ref: stepCardThreeElementRef,
      element: (
        <PlanningStepCardThree
          ref={stepCardThreeElementRef}
          onFocus={handleStepThreeInputsFocused}
          drawdownStartAge={drawdownStartAge}
          lumpSumAmount={lumpSumAmount}
          lumpSumAge={lumpSumAge}
          handleLumpSumAgeChange={handleLumpSumAgeChange}
          handleLumpSumAmountChange={handleLumpSumAmountChange}
          displayError={displayError}
        />
      ),
    },

    {
      hash: '#step-4',
      ref: stepCardFourElementRef,
      element: (
        <PlanningStepCardFour
          ref={stepCardFourElementRef}
          onFocus={handleStepFourInputsFocused}
          drawdownEndAge={drawdownEndAge}
          remainingAmount={remainingAmount}
          handleRemainingAmountChange={handleRemainingAmountChange}
          displayError={displayError}
        />
      ),
    },
  ];

  return (
    <GoalCreationSubPageLayout
      currentUrlHash={currentUrlHash}
      mainContentHorizontalSwipeOnMobile
      sideContentFirstOnMobile
      contentMain={mainContentElements}
      contentSide={renderContentSide()}
    />
  );
}
