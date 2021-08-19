import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import { PerformanceDataPeriod } from '@tsw/react-components';
import FundingStepCardOne from './FundingStepCardOne';

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
