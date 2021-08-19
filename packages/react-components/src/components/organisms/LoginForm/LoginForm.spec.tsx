import React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const onSubmit = jest.fn();
  let usernameField: HTMLElement;
  let passwordField: HTMLElement;

  beforeEach(() => {
    renderWithTheme(<LoginForm onSubmit={onSubmit} errorMessage="" successMessage="" />);
    usernameField = screen.getByLabelText('Username');
    passwordField = screen.getByLabelText('Password');
  });

  test('Renders the username and password fields', () => {
    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  test('Calls onSubmit with the username and password entered', async () => {
    const someUsername = 'jamessmith';
    const somePassword = 'password123';

    fireEvent.change(usernameField, { target: { value: someUsername } });
    fireEvent.change(passwordField, { target: { value: somePassword } });

    const updateButton = await screen.findByRole('button');
    fireEvent.click(updateButton);

    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith({
      username: someUsername,
      password: somePassword,
    });
  });

  test('Renders an error message', () => {
    const errorMessage = 'Some error message';
    renderWithTheme(
      <LoginForm onSubmit={onSubmit} errorMessage={errorMessage} successMessage="" />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('Renders a success message', () => {
    const successMessage = 'Some success message';
    renderWithTheme(
      <LoginForm onSubmit={onSubmit} errorMessage="" successMessage={successMessage} />
    );
    expect(screen.getByText(successMessage)).toBeInTheDocument();
  });
});
