import React from 'react';
import { render, screen } from '@testing-library/react';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton', () => {
  test('Renders a primary button', () => {
    const testLabel = 'Some label';
    render(<PrimaryButton label={testLabel} />);
    expect(screen.getByText(testLabel)).toBeInTheDocument();
  });
});
