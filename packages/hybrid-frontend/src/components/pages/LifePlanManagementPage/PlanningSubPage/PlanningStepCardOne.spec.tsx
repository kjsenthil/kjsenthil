import * as React from 'react';
import { screen, renderWithTheme } from '@tsw/test-util';
import PlanningStepCardOne from './PlanningStepCardOne';

describe('PlanningStepCardOne', () => {
  it('renders correctly', () => {
    renderWithTheme(
      <PlanningStepCardOne
        onFocus={() => {}}
        drawdownStartAge={0}
        drawdownEndAge={0}
        drawdownStartDate={new Date()}
        drawdownEndDate={new Date()}
        drawdownPeriodLengthYears={0}
        drawdownPeriodDeviationFromAverageComparison=""
        handleToAgeChange={() => {}}
        handleFromAgeChange={() => {}}
        displayError={() => undefined}
      />
    );

    expect(screen.getByText('When would you like to access your retirement income?')).toBeVisible();
  });
});
