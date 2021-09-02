import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import AddCashCard, { AddCashCardProps } from './AddCashCard';

jest.mock('../../atoms/Tooltip', () => ({
  __esModule: true,
  default: ({ children, title }) => (
    <>
      <div>{title}</div>
      <div>{children}</div>
    </>
  ),
}));

describe('AddCashCard', () => {
  const defaultAddCashCardProps: AddCashCardProps = {
    selectedAccountName: 'isa',
    openModal: () => false,
  };

  test('component renders with expected add cash data', () => {
    renderWithTheme(<AddCashCard {...defaultAddCashCardProps} />);
    const expectedTexts = [
      'Use a personal debit card to add cash to your',
      'isa account',
      'Transfer cash from another provider',
    ];
    expectedTexts.forEach((expectedString) =>
      expect(screen.getByText(expectedString, { exact: false })).toBeVisible()
    );
  });
});
