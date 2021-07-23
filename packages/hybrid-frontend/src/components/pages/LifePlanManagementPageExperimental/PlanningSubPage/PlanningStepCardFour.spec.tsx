import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PlanningStepCardFour from './PlanningStepCardFour';

describe('PlanningStepCardFour', () => {
  it('renders correctly', () => {
    renderWithTheme(
      <PlanningStepCardFour
        onFocus={() => {}}
        drawdownEndAge={0}
        remainingAmount={0}
        handleRemainingAmountChange={() => {}}
        displayError={() => undefined}
      />
    );

    expect(screen.getByText('Would you like to have money left over at 0?')).toBeVisible();
  });
});
