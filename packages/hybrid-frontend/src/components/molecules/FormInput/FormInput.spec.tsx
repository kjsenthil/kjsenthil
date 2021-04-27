import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import FormInput from './FormInput';

/* eslint-disable jsx-a11y/control-has-associated-label */
describe('FormInput', () => {
  const label = 'Text';

  it('renders a label', () => {
    renderWithTheme(<FormInput name="text" label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  describe('Form input as text field', () => {
    it('renders a text field', () => {
      renderWithTheme(<FormInput label={label} name="text" defaultValue="Text Value" />);
      expect(screen.getByRole('textbox')).toHaveProperty('value', 'Text Value');
    });
  });
});
