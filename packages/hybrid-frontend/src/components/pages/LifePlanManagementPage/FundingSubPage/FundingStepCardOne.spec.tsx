import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import FundingStepCardOne from './FundingStepCardOne';
import { PerformanceDataPeriod } from '../../../../services/performance';

describe('FundingStepCardOne', () => {
  it('renders correctly', () => {
    renderWithTheme(
      <FundingStepCardOne
        accountsTableProps={{
          headerRow: [],
          dataRow: [],
          period: PerformanceDataPeriod['1M'],
        }}
      />
    );

    expect(
      screen.getByText('Which accounts would you like to contribute to your retirement pot?')
    ).toBeVisible();
  });
});
