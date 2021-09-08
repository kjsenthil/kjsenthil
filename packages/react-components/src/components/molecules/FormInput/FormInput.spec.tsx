import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
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
});
