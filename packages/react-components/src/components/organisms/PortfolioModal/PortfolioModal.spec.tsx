import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PortfolioModal, { AccountData } from './PortfolioModal';
import mockAccountData from './accounts.json';
import { StaticTooltips } from '../../../constants/tooltips';

describe('PortfolioCreateModal', () => {
  const mockData: AccountData[] = mockAccountData.data.relationships.accounts.concat(
    mockAccountData.data.relationships['linked-accounts']
  );

  const expectedCheckboxes = [
    'Stocks & Shares ISA £19,994',
    'Self-invested Personal Pension £19,994',
    'Investment accounts £19,994',
    `Stocks & Shares ISA £19,994 linked ${StaticTooltips.linkedAccount}`,
    `Self-invested Personal Pension £19,994 linked ${StaticTooltips.linkedAccount}`,
    `Investment accounts £19,994 linked ${StaticTooltips.linkedAccount}`,
  ];

  test('Renders create portfolio modal successfully', () => {
    renderWithTheme(
      <PortfolioModal
        onSubmit={() => undefined}
        allAccounts={mockData}
        type="create"
        open
        onClose={() => null}
      />
    );

    expect(screen.getByText('Create a portfolio')).toBeInTheDocument();
    expect(screen.queryByText('Edit portfolio')).not.toBeInTheDocument();
    expect(screen.getByText('ACCOUNTS')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create my portfolio' })).toBeInTheDocument();
    expectedCheckboxes.forEach((name) =>
      expect(screen.getByRole('checkbox', { name })).toBeInTheDocument()
    );
  });

  test('Renders edit portfolio modal successfully', () => {
    renderWithTheme(
      <PortfolioModal
        onSubmit={() => undefined}
        allAccounts={mockData}
        portfolioAccounts={mockAccountData.data.relationships.portfolios[0].accounts}
        type="edit"
        open
        onClose={() => null}
      />
    );

    expect(screen.queryByText('Create a portfolio')).not.toBeInTheDocument();
    expect(screen.getByText('Edit portfolio')).toBeInTheDocument();
    expect(screen.getByText('ACCOUNTS')).toBeInTheDocument();
    expect(screen.getByText('SELECTED ACCOUNTS')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete portfolio' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expectedCheckboxes.forEach((name) =>
      expect(screen.getByRole('checkbox', { name })).toBeInTheDocument()
    );
  });
});
