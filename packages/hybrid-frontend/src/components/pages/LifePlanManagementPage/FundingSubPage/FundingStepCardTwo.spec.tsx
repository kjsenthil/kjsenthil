import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import FundingStepCardTwo from './FundingStepCardTwo';

describe('FundingStepCardTwo', () => {
  it('renders correctly', () => {
    renderWithTheme(<FundingStepCardTwo shouldIncludeStatePension onChange={() => {}} />);

    expect(screen.getByText('Include your State Pension?')).toBeVisible();
  });
});
