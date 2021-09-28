import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import UnorderedToggleButtonGroup from '.';

describe('ToggleButton', () => {
  const values = ['left', 'center', 'right'];

  beforeEach(() => {
    renderWithTheme(
      <UnorderedToggleButtonGroup
        handleChange={() => undefined}
        values={values}
        initialValue={values[0]}
      />
    );
  });

  test('renders a toggle button group correctly', () => {
    values.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
  });
});
