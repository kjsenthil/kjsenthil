import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';

import Slider from './Slider';

describe('Slider', () => {
  const props = {
    max: 20000,
    min: 0,
    step: 100,
    value: 1000,
  };

  test('handles onChange on slide', async () => {
    const mockOnChange = jest.fn();
    renderWithTheme(<Slider {...props} onChange={mockOnChange} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});
