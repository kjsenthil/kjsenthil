import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Legend from './Legend';

describe('Legend', () => {
  const formattedValue = '£100,000.00';
  const formattedPercentage = '11.00%';

  it('renders title as uppercase', () => {
    renderWithTheme(<Legend title="title value" />);

    expect(screen.getByText('TITLE VALUE')).toBeInTheDocument();
  });

  it('renders value with currency formatter', () => {
    renderWithTheme(
      <Legend title="total value" value={100000} valueFormatter={() => formattedValue} />
    );
    expect(screen.getByText(formattedValue)).toBeInTheDocument();
  });

  it('renders a value with percentage formatter', () => {
    const value = '£111,000.10';
    renderWithTheme(
      <Legend
        title="total value"
        value={value}
        percentageFormatter={() => formattedPercentage}
        percentageChange={11.0}
      />
    );
    expect(screen.getByText(value)).toBeInTheDocument();
    expect(screen.getByText(formattedPercentage)).toBeInTheDocument();
  });

  it('has a tooltip when a tooltip is provided', () => {
    const tooltipText = 'some tooltip';
    renderWithTheme(<Legend title="some title" tooltip={tooltipText} />);

    expect(screen.getByTitle(tooltipText)).toBeInTheDocument();
  });
});
