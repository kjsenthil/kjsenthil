import * as React from 'react';
import { screen, renderWithTheme } from '@tsw/test-util';
import WithDrawCashCard from './WithDrawCashCard';

describe('WithDrawCashCard', () => {
  it('render card when there is no GIA account or not more than 1 account', () => {
    renderWithTheme(<WithDrawCashCard canTransferCash={false} />);
    // title
    expect(screen.getByText('Withdraw cash')).toBeVisible();
    // description
    expect(screen.getByText('Withdraw cash to your bank account.')).toBeVisible();
    // button
    expect(screen.getByText('Withdraw Cash')).toBeInTheDocument();
  });

  it('render card when there is GIA account and has more than 1 account', () => {
    renderWithTheme(<WithDrawCashCard canTransferCash />);
    // title
    expect(screen.getByText('Withdraw or transfer cash')).toBeVisible();
    // description
    expect(
      screen.getByText('Withdraw cash to your bank account or transfer it between your accounts.')
    ).toBeVisible();
    // buttons
    expect(screen.getByText('Withdraw Cash')).toBeInTheDocument();
    expect(screen.getByText('Transfer Cash')).toBeInTheDocument();
  });
});
