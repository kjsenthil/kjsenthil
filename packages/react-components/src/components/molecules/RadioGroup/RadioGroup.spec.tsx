import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import RadioGroup from './RadioGroup';
import { FormControlLabel, Radio } from '../../atoms';

describe('RadioGroup', () => {
  test('The component renders correctly', () => {
    renderWithTheme(
      <RadioGroup row label="Test Label">
        <FormControlLabel value="Option 1" control={<Radio />} label="Option 1" />
        <FormControlLabel value="Option 2" control={<Radio />} label="Option 2" />
      </RadioGroup>
    );

    expect(screen.getByText('Test Label')).toBeVisible();
    expect(screen.getByText('Option 1')).toBeVisible();
    expect(screen.getByText('Option 2')).toBeVisible();
  });
});
