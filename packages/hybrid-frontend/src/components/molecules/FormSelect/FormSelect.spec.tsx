import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import FormSelect from './FormSelect';

/* eslint-disable jsx-a11y/control-has-associated-label */
describe('FormSelect', () => {
  const label = 'Select';

  it('renders a label', () => {
    renderWithTheme(<FormSelect name="select" label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  describe('Form input as select', () => {
    const children = (
      <>
        <option value="" />
        <option value="1">Open 1</option>
        <option value="2">Open 2</option>
      </>
    );

    it('renders a select dropdown with options', () => {
      renderWithTheme(
        <FormSelect label={label} name="options" defaultValue="1">
          {children}
        </FormSelect>
      );
      const combobox = screen.getAllByRole('option');
      expect(combobox[1].getAttribute('value')).toBe('1');
      expect(combobox[2].getAttribute('value')).toBe('2');
    });
  });
});
