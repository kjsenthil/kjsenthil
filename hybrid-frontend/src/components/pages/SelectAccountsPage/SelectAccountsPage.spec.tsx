import React from 'react';
import { renderWithTheme, screen } from '../../../../test-utils/testing-library'; // should be fixed by moving this part out into a separate namespaced package
import SelectAccountsPage from './SelectAccountsPage';

describe('SelectAccountsPage', () => {
  beforeEach(() => {
    renderWithTheme(<SelectAccountsPage />);
  });

  test('SelectAccountsPage titles has been successfully rendered', () => {
    expect(screen.getByText('Select an account type')).toBeInTheDocument();
  });
});
