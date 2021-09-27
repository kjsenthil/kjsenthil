import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import NumberedProgress from './NumberedProgress';

describe('NumberedProgress', () => {
  it('renders the current question number and total number of questions', () => {
    renderWithTheme(<NumberedProgress progress="1" total="16" />);
    expect(screen.getByText('1 of 16')).toBeVisible();
  });
});
