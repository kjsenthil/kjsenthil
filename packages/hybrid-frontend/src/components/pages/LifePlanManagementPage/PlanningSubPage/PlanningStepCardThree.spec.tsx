import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PlanningStepCardThree from './PlanningStepCardThree';

describe('PlanningStepCardThree', () => {
  it('renders correctly', () => {
    renderWithTheme(
      <PlanningStepCardThree
        onFocus={() => {}}
        drawdownStartAge={0}
        lumpSumAge={0}
        lumpSumAmount={0}
        handleLumpSumAgeChange={() => {}}
        handleLumpSumAmountChange={() => {}}
        displayError={() => undefined}
      />
    );

    expect(screen.getByText('Would you like to take out a cash lump sum?')).toBeVisible();
  });
});
