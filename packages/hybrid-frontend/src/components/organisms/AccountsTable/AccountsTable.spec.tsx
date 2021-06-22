import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import AccountsTable from './AccountsTable';
import { mockAccountsTableData, mockAccountsTableHeader } from '../../../constants/storybook';

describe('AccountsTable', () => {
  beforeEach(() => {
    renderWithTheme(
      <AccountsTable headerRow={mockAccountsTableHeader} dataRow={mockAccountsTableData} />
    );
  });

  it('renders a AccountsTable', () => {
    const headerCell1Text = screen.getByText('ACCOUNT');
    const headerCell2Text = screen.getByText('TOTAL HOLDINGS');
    const headerCell3Text = screen.getByText('TOTAL CONTRIBUTIONS');
    const headerCell4Text = screen.getByText('CASH');
    const headerCell5Text = screen.getByText('TOTAL RETURN');

    const rowCell1Text = screen.getByText(mockAccountsTableData[0].accountName || '');
    const rowCell2Text = screen.getByText('£38,382.29');
    const rowCell3Text = screen.getByText('£31,994.90');
    const rowCell4Text = screen.getByText('£0.03');
    const rowCell5Text = screen.getByText('+£6,837.39');

    expect(headerCell1Text).toBeVisible();
    expect(headerCell2Text).toBeVisible();
    expect(headerCell3Text).toBeVisible();
    expect(headerCell4Text).toBeVisible();
    expect(headerCell5Text).toBeVisible();

    expect(rowCell1Text).toBeVisible();
    expect(rowCell2Text).toBeVisible();
    expect(rowCell3Text).toBeVisible();
    expect(rowCell4Text).toBeVisible();
    expect(rowCell5Text).toBeVisible();
  });
});
