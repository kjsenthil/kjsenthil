import { render, screen } from '@testing-library/react';
import React from 'react';
import SelectAccountsPage from './SelectAccountsPage';

describe('SelectAccountsPage', () => {
  beforeEach(() => {
    render(<SelectAccountsPage />);
  });

  test('SelectAccountsPage titles has been successfully rendered', () => {
    expect(screen.getByText('SelectAccountsPage')).toBeInTheDocument();
    expect(screen.getByText('Back to Login')).toBeInTheDocument();
    expect(screen.getByText('Goto Goal')).toBeInTheDocument();
  });
});
