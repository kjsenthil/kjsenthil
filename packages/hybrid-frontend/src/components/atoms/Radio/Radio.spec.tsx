import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '.';

describe('Radio', () => {
  let radioButtons: NodeListOf<HTMLInputElement>;

  beforeEach(() => {
    renderWithTheme(
      <RadioGroup aria-label="position" name="Gender" defaultValue="female">
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    );

    radioButtons = document.getElementsByName('Gender') as NodeListOf<HTMLInputElement>;
  });

  test('marks the first radio button as checked by default', () => {
    expect(radioButtons[0]?.checked).toBe(true);
  });

  test('toggles the checked radio button on click', () => {
    radioButtons[1]?.click();
    expect(radioButtons[0]?.checked).toBe(false);
    expect(radioButtons[1]?.checked).toBe(true);
  });
});
