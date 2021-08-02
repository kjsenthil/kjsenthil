import * as React from 'react';
import { screen, renderWithTheme } from '@tsw/test-util';
import PlanningStepCardTwo from './PlanningStepCardTwo';

describe('PlanningStepCardTwo', () => {
  it('renders correctly', () => {
    renderWithTheme(
      <PlanningStepCardTwo
        onFocus={() => {}}
        annualIncome={0}
        monthlyIncome={0}
        annualIncomeInTomorrowsMoney={0}
        monthlyIncomeInTomorrowsMoney={0}
        handleAnnualIncomeChange={() => {}}
        handleMonthlyIncomeChange={() => {}}
        displayError={() => undefined}
      />
    );

    expect(screen.getByText('What would you like your retirement income to be?')).toBeVisible();
  });
});
