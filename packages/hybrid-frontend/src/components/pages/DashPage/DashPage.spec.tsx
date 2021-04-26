import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import DashPage from './DashPage';

describe('DashPage', () => {
  beforeEach(() => {
    renderWithTheme(<DashPage />);
  });

  test('DashPage title has been successfully rendered', () => {
    expect(screen.getByText('DashBoard Page')).toBeInTheDocument();
  });
});
