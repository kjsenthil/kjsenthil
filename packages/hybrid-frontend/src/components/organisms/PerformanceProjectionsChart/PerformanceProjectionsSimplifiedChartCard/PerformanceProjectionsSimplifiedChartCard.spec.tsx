import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsSimplifiedChartCard from './PerformanceProjectionsSimplifiedChartCard';
import { PerformanceProjectionsSimplifiedChartProps } from '../PerformanceProjectionsSimplifiedChart';
import { GoalDisplayProps } from '../GoalDisplay/GoalDisplay';

describe('PerformanceProjectionsSimplifiedChartCard', () => {
  const defaultFirstName = 'Ava';
  const defaultRetirementAge = 50;
  const defaultRetirementPerformance = 100000;
  const defaultRetirementPerformancePercentage = 0.9;

  const defaultGoalDisplayProps: GoalDisplayProps = {
    iconSrc: '',
    label: '',
    remainingYears: 1,
    progress: 0,
  };

  const defaultChartProps: PerformanceProjectionsSimplifiedChartProps = {
    projectionsData: [],
    goalsData: [],
    annualHistoricalData: [],
    projectionsMetadata: { todayAge: 30, goalMet: true, investmentPeriod: 50 },
  };

  test("The component renders correctly when first name doesn't end with an 's'", () => {
    renderWithTheme(
      <PerformanceProjectionsSimplifiedChartCard
        userFirstName="Tom"
        retirementAge={defaultRetirementAge}
        retirementPerformance={defaultRetirementPerformance}
        retirementPerformancePercentage={defaultRetirementPerformancePercentage}
        goalDisplayProps={defaultGoalDisplayProps}
        chartProps={defaultChartProps}
      />
    );

    expect(screen.getByText("Tom's life plan")).toBeVisible();
  });

  test("The component renders correctly when first name doesn't end with an 's'", () => {
    renderWithTheme(
      <PerformanceProjectionsSimplifiedChartCard
        userFirstName="Thomas"
        retirementAge={defaultRetirementAge}
        retirementPerformance={defaultRetirementPerformance}
        retirementPerformancePercentage={defaultRetirementPerformancePercentage}
        goalDisplayProps={defaultGoalDisplayProps}
        chartProps={defaultChartProps}
      />
    );

    expect(screen.getByText("Thomas' life plan")).toBeVisible();
  });

  test("The component renders correctly when performance doesn't exceed 100%", () => {
    renderWithTheme(
      <PerformanceProjectionsSimplifiedChartCard
        userFirstName={defaultFirstName}
        retirementAge={defaultRetirementAge}
        retirementPerformance={defaultRetirementPerformance}
        retirementPerformancePercentage={defaultRetirementPerformancePercentage}
        goalDisplayProps={defaultGoalDisplayProps}
        chartProps={defaultChartProps}
      />
    );

    expect(screen.getByText("You're on track", { exact: false })).toHaveTextContent(
      "You're on track to have 90% of your target by the time you're 50."
    );
  });

  test('The component renders correctly when performance exceeds 100%', () => {
    renderWithTheme(
      <PerformanceProjectionsSimplifiedChartCard
        userFirstName={defaultFirstName}
        retirementAge={defaultRetirementAge}
        retirementPerformance={defaultRetirementPerformance}
        retirementPerformancePercentage={3}
        goalDisplayProps={defaultGoalDisplayProps}
        chartProps={defaultChartProps}
      />
    );

    expect(screen.getByText("You're on track", { exact: false })).toHaveTextContent(
      "You're on track to have 300% of your target by the time you're 50. That's a surplus of £100,000."
    );
  });
});
