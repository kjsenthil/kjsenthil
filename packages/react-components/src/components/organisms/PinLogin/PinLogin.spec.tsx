import React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';
import * as randomPinIndices from '../../../services/auth/utils/randomPinIndices';
import PinLogin from './PinLogin';

jest.mock('../../../services/auth/utils/randomPinIndices');

describe('LoginForm', () => {
  const onSubmit = jest.fn();
  let field1: HTMLInputElement;
  let field2: HTMLInputElement;
  let field3: HTMLInputElement;

  beforeEach(async () => {
    jest.resetAllMocks();
    (randomPinIndices.default as jest.Mock).mockReturnValue([
      { position: 1, value: undefined },
      { position: 2, value: undefined },
      { position: 3, value: undefined },
    ]);
    renderWithTheme(<PinLogin onPinSubmit={onSubmit} />);
    field1 = screen.getByLabelText('1st') as HTMLInputElement;
    field2 = screen.getByLabelText('2nd') as HTMLInputElement;
    field3 = screen.getByLabelText('3rd') as HTMLInputElement;
  });

  it('renders the 3 pin fields in document', () => {
    expect(field1).toBeInTheDocument();
    expect(field2).toBeInTheDocument();
    expect(field3).toBeInTheDocument();
  });

  it('calls onSubmit with pins entered', async () => {
    const field1Val = '1';
    const field2Val = '2';
    const field3Val = '3';

    userEvent.type(field1, field1Val);
    userEvent.type(field2, field2Val);
    userEvent.type(field3, field3Val);

    const updateButton = await screen.findByRole('button');
    fireEvent.click(updateButton);

    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith([
      { position: Number(field1Val), value: Number(field1Val) },
      { position: Number(field2Val), value: Number(field2Val) },
      { position: Number(field3Val), value: Number(field3Val) },
    ]);
  });

  it("doesn't allow non-numeric inputs", () => {
    userEvent.type(field1, 'a');
    expect((field1 as HTMLInputElement).value).toEqual('');
  });

  it('focuses the next field after input', () => {
    expect(field1).toHaveFocus();
    userEvent.type(field1, '1');
    expect(field2).toHaveFocus();
  });
});
