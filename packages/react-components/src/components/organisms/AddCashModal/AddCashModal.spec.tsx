import * as React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import AddCashModal, { AddCashModalProps } from './AddCashModal';

jest.mock('../../atoms/Tooltip', () => ({
  __esModule: true,
  default: ({ children, title }) => (
    <>
      <div>{title}</div>
      <div>{children}</div>
    </>
  ),
}));

describe('AddCashModal', () => {
  const defaultAddCashModalProps: AddCashModalProps = {
    title: 'Add Cash',
    subTitle: 'STOCK & SHARE ISA',
    accountType: 'ISA',
    isOpen: true,
    minAmount: 0,
    maxAmount: 100,
    onClose: () => false,
  };

  test('component renders with expected add cash data', () => {
    renderWithTheme(<AddCashModal {...defaultAddCashModalProps} />);
    const expectedTexts = [
      'Add Cash',
      "We'll debit the amount from your bank account immediately and save it in your ISA",
      'How much would you like to add to your account?',
    ];
    expectedTexts.forEach((expectedString) =>
      expect(screen.getByText(expectedString, { exact: false })).toBeVisible()
    );
  });

  test('component render and click button with minimum validation error', () => {
    renderWithTheme(<AddCashModal {...defaultAddCashModalProps} />);
    fireEvent(
      screen.getByText('Continue'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(screen.getByText('Minimum amount is £1.00')).toBeVisible();
  });

  test('component render and click button with maximum validation error', () => {
    renderWithTheme(<AddCashModal {...defaultAddCashModalProps} />);
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: '230' } });
    fireEvent(
      screen.getByText('Continue'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(screen.getByText('Maximum amount is £100')).toBeVisible();
  });

  test('component render and click button with valid value', () => {
    renderWithTheme(<AddCashModal {...defaultAddCashModalProps} />);
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: '99' } });
    fireEvent(
      screen.getByText('Continue'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const errorLabel = screen.queryByRole('alert');
    expect(errorLabel).toBeNull();
  });
});
