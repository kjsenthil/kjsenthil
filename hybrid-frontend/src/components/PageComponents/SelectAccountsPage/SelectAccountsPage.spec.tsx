import { render, screen } from '@testing-library/react';
import React from 'react';
import SelectAccountsPage from './SelectAccountsPage';

describe('SelectAccountsPage', () => {
  beforeEach(() => {
    render(<SelectAccountsPage />);
  });

  test('SelectAccountsPage titles has been successfully rendered', () => {
    expect(screen.getByText('SELECT AN ACCOUNT TYPE')).toBeInTheDocument();
  });
});
