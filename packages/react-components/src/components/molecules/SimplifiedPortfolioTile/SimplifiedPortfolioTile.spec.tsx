import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { screen } from '@testing-library/react';
import SimplifiedPortfolioTile, { SimplifiedPortfolioTileProps } from './SimplifiedPortfolioTile';

describe('Simplified portfolio tile', () => {
  const props: SimplifiedPortfolioTileProps = {
    portfolioName: 'Our retirement',
    abbreviatedAccountTypes: ['ISA', 'SIPP'],
    total: '£1,134,975',
  };

  it('should render with the given values', () => {
    renderWithTheme(<SimplifiedPortfolioTile {...props} />);

    expect(screen.getByText(props.portfolioName)).toBeInTheDocument();
    expect(screen.getByText(props.abbreviatedAccountTypes.join(' + '))).toBeInTheDocument();
    expect(screen.getByText(props.total)).toBeInTheDocument();
  });
});
