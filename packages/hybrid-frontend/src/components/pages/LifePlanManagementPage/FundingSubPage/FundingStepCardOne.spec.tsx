import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import { PerformanceDataPeriod } from '@tswdts/react-components';
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

    expect(screen.getByText('The following accounts will fund your retirement pot')).toBeVisible();
  });
});
