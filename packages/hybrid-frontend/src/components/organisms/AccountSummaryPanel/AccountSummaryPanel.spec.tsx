import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import AccountSummaryPanel from './AccountSummaryPanel';

describe('AccountSummaryPanel', () => {
  beforeEach(() => {
    renderWithTheme(<AccountSummaryPanel cashValue={100} investmentValue={200} totalValue={300} />);
  });

  test('The summary panel is visible and its components render correctly', () => {
    const cashLabel = screen.getByText('CASH');
    const investmentLabel = screen.getByText('INVESTMENTS');
    const totalLabel = screen.getByText('TOTAL');

    const cashValue = screen.getByText('£100.00');
    const investmentValue = screen.getByText('£200.00');
    const totalValue = screen.getByText('£300.00');

    expect(cashLabel).toBeVisible();
    expect(investmentLabel).toBeVisible();
    expect(totalLabel).toBeVisible();

    expect(cashValue).toBeVisible();
    expect(investmentValue).toBeVisible();
    expect(totalValue).toBeVisible();
  });
});
