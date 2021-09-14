import * as React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import RadioFormInput from './RadioFormInput';

describe('RadioFormInput', () => {
  test('The component renders correctly', () => {
    const inputProps = {
      name: '',
      label: '',
      isCurrency: false,
      value: '',
      error: '',
      onChange: () => {},
    };

    renderWithTheme(
      <RadioFormInput
        radioLabel="Specific units/shares"
        radioValue="shares"
        inputProps={inputProps}
      />
    );

    const radio = screen.getByTestId('radio-shares') as HTMLInputElement;
    fireEvent.click(radio);
    expect(radio.value).toBe('shares');
    expect(radio.checked).toBe(true);
    expect(screen.getByText('Specific units/shares')).toBeVisible();
  });
});
