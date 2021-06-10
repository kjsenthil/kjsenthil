import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('NotFound title has been successfully rendered', () => {
    renderWithTheme(<NotFoundPage />);

    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });

  test('NotFound sub header has been successfully rendered', () => {
    renderWithTheme(<NotFoundPage />);

    expect(screen.getByText('The page you requested cannot be found')).toBeInTheDocument();
  });
});
