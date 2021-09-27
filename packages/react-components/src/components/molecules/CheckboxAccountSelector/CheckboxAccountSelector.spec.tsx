import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import CheckboxAccountSelector from './CheckboxAccountSelector';

describe('CheckboxAccountSelector', () => {
  it('renders correctly with no linked tag or tooltip', () => {
    renderWithTheme(
      <CheckboxAccountSelector
        updatePortfolioIds={() => undefined}
        accountId="123"
        portfolioIds={[]}
        label="Test account"
        funds="10,000"
      />
    );

    expect(screen.getByText('Test account')).toBeVisible();
    expect(screen.getByText('£10,000')).toBeVisible();
    expect(screen.queryByTitle('infoCircleIcon')).not.toBeInTheDocument();
  });

  it('renders correctly with linked tag and tooltip', () => {
    renderWithTheme(
      <CheckboxAccountSelector
        updatePortfolioIds={() => undefined}
        accountId="123"
        portfolioIds={[]}
        label="Test account"
        funds="10,000"
        linked
      />
    );

    expect(screen.getByText('Test account')).toBeVisible();
    expect(screen.getByText('£10,000')).toBeVisible();
    expect(screen.getByTitle('infoCircleIcon')).toBeInTheDocument();
  });
});
