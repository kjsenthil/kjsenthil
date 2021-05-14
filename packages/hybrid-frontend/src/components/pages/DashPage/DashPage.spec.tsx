import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as reducer from '../../../services/auth/reducers';
import DashPage from './DashPage';

jest.mock('../../../services/myAccounts', () => ({
  getMyAccountClient: jest.fn(),
}));

describe('DashPage', () => {
  const store: Store = configureStore({
    reducer: { auth: reducer.authSlice },
  });

  test('DashPage title has been successfully rendered', async () => {
    renderWithProviders(<DashPage />, store);

    expect(screen.getByText('DashBoard Page')).toBeInTheDocument();
  });
});
