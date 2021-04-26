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
    field1 = screen.getByDisplayValue(2);
    field2 = screen.getByDisplayValue(4);
    field3 = screen.getByDisplayValue(6);
  });

  test('Renders the 3 pin fields in document', () => {
    expect(field1).toBeInTheDocument();
    expect(field2).toBeInTheDocument();
    expect(field3).toBeInTheDocument();
  });

  test('Calls onSubmit with pins entered', async () => {
    const field1Val = 2;
    const field2Val = 4;
    const field3Val = 6;

    fireEvent.change(field1, { target: { value: field1Val } });
    fireEvent.change(field2, { target: { value: field2Val } });
    fireEvent.change(field3, { target: { value: field3Val } });

    const updateButton = await screen.findByRole('button');
    fireEvent.click(updateButton);

    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith([
      { position: field1Val, value: field1Val },
      { position: field2Val, value: field2Val },
      { position: field3Val, value: field3Val },
    ]);
  });
});
