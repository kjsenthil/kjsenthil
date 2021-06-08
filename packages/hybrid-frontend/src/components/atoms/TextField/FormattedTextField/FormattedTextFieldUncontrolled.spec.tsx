import * as React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import FormattedTextFieldUncontrolled from './FormattedTextFieldUncontrolled';

describe('FormattedTextFieldUncontrolled', () => {
  // A formatter that always adds '!' to the end of the input
  const formatter = (input: string): string => (input ? `${input}!` : '');

  it('renders correctly', () => {
    renderWithTheme(<FormattedTextFieldUncontrolled placeholder="input" formatter={formatter} />);

    const component = screen.getByPlaceholderText('input');
    expect(component).toBeVisible();

    // Let's trigger some input changes...
    fireEvent.change(component, {
      target: {
        value: 'hello',
      },
    });
    expect(screen.getByDisplayValue('hello!')).toBeVisible();
  });
});
