import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import SelectAccountsPage from './SelectAccountsPage';

describe('SelectAccountsPage', () => {
  beforeEach(() => {
    renderWithTheme(<SelectAccountsPage />);
  });

  test('SelectAccountsPage titles has been successfully rendered', () => {
    expect(screen.getByText('Select an account type')).toBeInTheDocument();
  });
});
