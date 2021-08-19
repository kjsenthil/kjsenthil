import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Button from './Button';

describe('Button', () => {
  const testLabel = 'Some label';

  it('renders a button with passed children', () => {
    renderWithTheme(<Button>{testLabel}</Button>);
    expect(screen.getByText(testLabel)).toBeInTheDocument();
  });

  it('renders with a loader instead of a label', () => {
    renderWithTheme(<Button isLoading>{testLabel}</Button>);
    expect(screen.getByRole('progressbar')).toBeVisible();
    expect(screen.queryByText(testLabel)).toBeNull();
  });
});
