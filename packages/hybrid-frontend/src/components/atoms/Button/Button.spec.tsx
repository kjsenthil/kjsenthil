import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Button from './Button';

describe('Button', () => {
  test('Renders a button with passed children', () => {
    const testLabel = 'Some label';
    renderWithTheme(<Button>{testLabel}</Button>);
    expect(screen.getByText(testLabel)).toBeInTheDocument();
  });
});
