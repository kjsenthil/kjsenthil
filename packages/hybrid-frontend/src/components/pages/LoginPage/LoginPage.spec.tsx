import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as reducer from '../../../services/auth/reducers';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  const store: Store = configureStore({
    reducer: { auth: reducer.authSlice },
  });

  it('has Login button', () => {
    renderWithProviders(<LoginPage />, store);

    expect(screen.getByText('Log in')).toBeInTheDocument();
  });
});
