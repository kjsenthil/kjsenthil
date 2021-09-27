import * as React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import ShareOrderForm, { ShareOrderFormProps } from './ShareOrderForm';

type Props = Omit<ShareOrderFormProps, 'setExecutionType' | 'executionType'>;

const ShareOrderPage = (props: Props) => {
  const [executionType, setExecutionType] = React.useState<'market' | 'limit'>('market');
  return (
    <ShareOrderForm {...props} setExecutionType={setExecutionType} executionType={executionType} />
  );
};

describe('ShareOrderForm', () => {
  const defaultProps: Props = {
    numOfUnits: '123',
    numOfUnitsError: '',
    handleNumOfUnitsChange: () => {},

    isMarketOpen: true,
    orderType: 'Buy',
    desiredValue: '234',
    desiredValueError: '',
    handleDesiredValueChange: () => {},

    amountInPence: '345',
    amountInPenceError: '',
    handleAmountInPenceChange: () => {},

    numberOfDays: '456',
    numberOfDaysError: '',
    handleExpireAfterDaysChange: () => {},

    maxCashAvailable: '£1200',
  };

  describe('ShareOrderForm', () => {
    describe('Buy order', () => {
      beforeEach(() => {
        renderWithTheme(<ShareOrderPage {...defaultProps} />);
      });

      it('renders the radio input fields', async () => {
        expect(await screen.findByText('Specific number of units/shares')).toBeVisible();
        expect(await screen.findByText('Specific value* (maximum £1200)')).toBeVisible();
        expect(
          await screen.findByText(
            'You can enter either a number of shares or an amount of cash to be invested/raised.'
          )
        ).not.toBeVisible();
      });

      it('renders marketOrder button not disabled', async () => {
        expect(await screen.getByRole('button', { name: 'marketOrder' })).not.toBeDisabled();
      });

      it('renders buy limit order fields', async () => {
        expect(await screen.getByRole('button', { name: 'limitOrder' })).toBeVisible();

        fireEvent.click(screen.getByRole('button', { name: 'limitOrder' }));

        expect(await screen.findByText('Buy when')).toBeVisible();
        expect(await screen.findByText('Limit order to expire after')).toBeVisible();

        const amountInPence = screen.getByTestId('form-input-field-amount') as HTMLInputElement;
        expect(amountInPence).toBeInTheDocument();
        const amountInPenceValue = (amountInPence.firstChild as HTMLInputElement).value;
        expect(amountInPenceValue).toBe('345');
      });
    });

    describe('Sell order', () => {
      beforeEach(() => {
        renderWithTheme(<ShareOrderPage {...defaultProps} orderType="Sell" />);
      });

      it('renders buy limit order fields', async () => {
        expect(await screen.getByRole('button', { name: 'limitOrder' })).toBeVisible();
        fireEvent.click(screen.getByRole('button', { name: 'limitOrder' }));

        expect(await screen.findByText('Sell when')).toBeVisible();
        expect(await screen.findByText('Limit order to expire after')).toBeVisible();

        const amountInPence = screen.getByTestId('form-input-field-amount') as HTMLInputElement;
        expect(amountInPence).toBeInTheDocument();
        const amountInPenceValue = (amountInPence.firstChild as HTMLInputElement).value;
        expect(amountInPenceValue).toBe('345');
      });
    });

    describe('when market is closed', () => {
      beforeEach(() => {
        renderWithTheme(<ShareOrderPage {...defaultProps} isMarketOpen={false} />);
      });

      it('renders buy limit order fields', async () => {
        expect(await screen.getByRole('button', { name: 'marketOrder' })).toBeDisabled();
      });
    });
  });
});
