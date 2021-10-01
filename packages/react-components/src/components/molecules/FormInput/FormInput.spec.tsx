import React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import FormInput from './FormInput';

jest.mock('../../atoms', () => {
  const originalModule = jest.requireActual('../../atoms');

  return {
    ...originalModule,
    Icon: ({ name }) => <div title={name} />,
  };
});

/* eslint-disable jsx-a11y/control-has-associated-label */
describe('FormInput', () => {
  const label = 'Text';

  it('renders a label', () => {
    renderWithTheme(<FormInput name="text" label={label} value="" />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders a currency field', () => {
    renderWithTheme(<FormInput isCurrency label="Value" name="text" />);
    expect(screen.getByPlaceholderText('Value')).toHaveAttribute('type', 'number');
    expect(screen.getByTitle('britishPound')).toBeInTheDocument();
  });

  describe('Form input as text field', () => {
    it('renders a text field', () => {
      renderWithTheme(<FormInput label={label} name="text" value="Text Value" />);
      expect(screen.getByRole('textbox')).toHaveProperty('value', 'Text Value');
    });
  });

  describe('Form input as password field', () => {
    it('renders a password field', () => {
      renderWithTheme(<FormInput isPassword label="Value" name="text" />);
      expect(screen.getByPlaceholderText('Value')).toHaveAttribute('type', 'password');
    });

    it('password visibility can be toggled', () => {
      renderWithTheme(<FormInput isPassword label="Value" name="text" />);
      expect(screen.getByRole('button', { name: 'toggle password visibility' })).toBeVisible();
      fireEvent.click(screen.getByRole('button', { name: 'toggle password visibility' }));
      expect(screen.getByPlaceholderText('Value')).toHaveAttribute('type', 'text');
    });

    it('invalid password renders info text', () => {
      renderWithTheme(<FormInput isPassword label="password" name="text" info="invalid" />);
      const component = screen.getByPlaceholderText('password');
      fireEvent.change(component, {
        target: {
          value: 'pass',
        },
      });
      expect(screen.queryByText('invalid')).toBeVisible();
    });

    it('valid password does not render info text', () => {
      renderWithTheme(<FormInput isPassword label="password" name="text" info="invalid" />);
      const component = screen.getByPlaceholderText('password');
      fireEvent.change(component, {
        target: {
          value: 'passW0rd1234',
        },
      });
      expect(screen.queryByText('invalid')).toBeNull();
    });
  });
});
