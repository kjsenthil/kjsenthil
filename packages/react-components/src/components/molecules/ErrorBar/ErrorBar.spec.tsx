import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ErrorBar from './ErrorBar';

describe('ErrorBar', () => {
  test('Renders ErrorBar case', () => {
    renderWithTheme(<ErrorBar errorMessage="Error!" />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });
});
