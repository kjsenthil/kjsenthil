import * as React from 'react';
import { renderWithTheme, fireEvent, screen } from '@tsw/test-util';
import AccountTypeSelection from './AccountTypeSelection';
import { AccountType } from '../../../constants';

describe('AccountTypeSelection', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    renderWithTheme(<AccountTypeSelection onSubmit={mockOnSubmit} />);
  });

  test("The submit button can't be clicked if no account types are selected", () => {
    const submitButton = screen.getByRole('button', {
      name: 'Select',
    });

    expect(submitButton).toBeDisabled();

    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('The appropriate account type is selected when its card is clicked', () => {
    const accountTypeCards = screen.getAllByTestId('account-type-card');
    const isaAccountTypeCard = accountTypeCards[0];
    const giaAccountTypeCard = accountTypeCards[1];

    const isaClickableComponent = screen.getByText('ISA');
    const giaClickableComponent = screen.getByText('GIA');
    const submitButton = screen.getByRole('button', {
      name: 'Select',
    });

    // Select the ISA card
    fireEvent.click(isaClickableComponent);
    expect(isaAccountTypeCard.getAttribute('class')).toContain('MuiPaper-elevation1');
    expect(giaAccountTypeCard.getAttribute('class')).toContain('MuiPaper-elevation3');

    // Submit the ISA account type
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenLastCalledWith(AccountType.ISA);

    // Select the GIA card
    fireEvent.click(giaClickableComponent);
    expect(isaAccountTypeCard.getAttribute('class')).toContain('MuiPaper-elevation3');
    expect(giaAccountTypeCard.getAttribute('class')).toContain('MuiPaper-elevation1');

    // Submit the GIA account type
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenLastCalledWith(AccountType.GIA);
  });
});
