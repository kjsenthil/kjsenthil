import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';

import Select from './Select';

describe('Select', () => {
  test('renders an select input', () => {
    renderWithTheme(
      <Select>
        <option>Select</option>
      </Select>
    );
    expect(screen.getByRole('combobox').innerHTML).toStrictEqual('<option>Select</option>');
  });
});
