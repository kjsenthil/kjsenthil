import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import AccountSummaryPanel from './AccountSummaryPanel';

describe('AccountSummaryPanel', () => {
  beforeEach(() => {
    renderWithTheme(<AccountSummaryPanel cashValue={100} investmentValue={200} totalValue={300} />);
  });

  test('The summary panel is visible and its components render correctly', () => {
    const testTexts = ['CASH', '£100', 'INVESTMENTS', '£200', 'TOTAL', '£300'];

    testTexts.forEach((testText) => {
      expect(screen.getByText(testText)).toBeVisible();
    });
  });
});
