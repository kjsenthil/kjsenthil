import React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import PortfolioModal, { AccountData } from './PortfolioModal';
import mockAccountData from './accounts.json';
import { StaticTooltips } from '../../../constants/tooltips';

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

const onSubmit = jest.fn();
const onClose = jest.fn();

describe('PortfolioCreateModal', () => {
  beforeEach(() => {
    renderWithTheme(
      <PortfolioModal
        onSubmit={onSubmit}
        allAccounts={mockData}
        type="create"
        open
        onClose={onClose}
      />
    );
  });

  test('Renders create portfolio modal successfully', () => {
    expect(screen.getByText('Create a portfolio')).toBeInTheDocument();
    expect(screen.queryByText('Edit portfolio')).not.toBeInTheDocument();
    expect(screen.getByText('ACCOUNTS')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create my portfolio' })).toBeInTheDocument();
    expectedCheckboxes.forEach((name) =>
      expect(screen.getByRole('checkbox', { name })).toBeInTheDocument()
    );
  });

  it('calls handlePortfolioSubmit on Create my portfolio button press', () => {
    const createButton = screen.getByRole('button', { name: 'Create my portfolio' });

    fireEvent.click(createButton);

    expect(onSubmit).toBeCalledTimes(1);
  });

  it('calls onClose on cancel button press', () => {
    const button = screen.getByText('Cancel');

    button.click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('PortfolioEditModal', () => {
  beforeEach(() => {
    renderWithTheme(
      <PortfolioModal
        onSubmit={() => undefined}
        allAccounts={mockData}
        portfolioAccounts={mockAccountData.data.relationships.portfolios[0]}
        type="edit"
        open
        onClose={() => null}
      />
    );
  });

  test('Renders edit portfolio modal successfully', () => {
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

  test('Renders portfolio name of current portfolio', () => {
    expect(screen.getByDisplayValue('Test portfolio')).toBeInTheDocument();
  });
});
