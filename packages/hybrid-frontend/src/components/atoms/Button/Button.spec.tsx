import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('button', () => {
  test('Renders a primary button', () => {
    const testLabel = 'Some label';
    render(<Button>{testLabel}</Button>);
    expect(screen.getByText(testLabel)).toBeInTheDocument();
  });
});
