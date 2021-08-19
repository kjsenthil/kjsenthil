import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import userEvent from '@testing-library/user-event';

import TextField from './TextField';

describe('TextField', () => {
  test('renders an input field', () => {
    renderWithTheme(<TextField value="Default value" />);
    expect(screen.getByRole('textbox')).toHaveProperty('value', 'Default value');
  });

  test('responds to onChange for each letter', () => {
    const onChange = jest.fn();
    renderWithTheme(<TextField value="Default value" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'Test');
    expect(onChange).toHaveBeenCalledTimes(4);
  });
});
