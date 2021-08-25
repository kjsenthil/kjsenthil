import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import FundingDisclaimer from './FundingDisclaimer';

describe('FundingStepCardOne', () => {
  it('renders correctly', () => {
    renderWithTheme(<FundingDisclaimer />);

    expect(screen.getByTestId('funding-disclaimer')).toBeVisible();
  });
});
