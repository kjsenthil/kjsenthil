import * as React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import FormattedTextFieldControlled from './FormattedTextFieldControlled';

describe('FormattedTextFieldControlled', () => {
  // A formatter that always adds '!' to the end of the input
  const formatter = (input: string): string => (input ? `${input}!` : '');

  const ControlledComponent = () => {
    const [value, setValue] = React.useState('');

    return (
      <FormattedTextFieldControlled
        placeholder="input"
        formatter={formatter}
        value={value}
        setValue={setValue}
      />
    );
  };

  it('renders correctly', () => {
    renderWithTheme(<ControlledComponent />);

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
