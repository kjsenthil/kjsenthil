import React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import PinLogin from './PinLogin';

describe('LoginForm', () => {
  const onSubmit = jest.fn();
  let field1: HTMLElement;
  let field2: HTMLElement;
  let field3: HTMLElement;

  beforeEach(() => {
    renderWithTheme(<PinLogin onPinSubmit={onSubmit} errorMessage="" successMessage="" />);
    field1 = screen.getByTestId('form-input-field-pin-1');
    field2 = screen.getByTestId('form-input-field-pin-2');
    field3 = screen.getByTestId('form-input-field-pin-3');
  });

  test('Renders the 3 pin fields in document', () => {
    expect(field1).toBeInTheDocument();
    expect(field2).toBeInTheDocument();
    expect(field3).toBeInTheDocument();
  });

  test('Calls onSubmit with pins entered', async () => {
    const field1Val = field1.getAttribute('label')?.substr(0, 1);
    const field2Val = field2.getAttribute('label')?.substr(0, 1);
    const field3Val = field3.getAttribute('label')?.substr(0, 1);

    fireEvent.change(field1.children[0], { target: { value: field1Val } });
    fireEvent.change(field2.children[0], { target: { value: field2Val } });
    fireEvent.change(field3.children[0], { target: { value: field3Val } });

    const updateButton = await screen.findByRole('button');
    fireEvent.click(updateButton);

    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith([
      { position: Number(field1Val), value: Number(field1Val) },
      { position: Number(field2Val), value: Number(field2Val) },
      { position: Number(field3Val), value: Number(field3Val) },
    ]);
  });
});
