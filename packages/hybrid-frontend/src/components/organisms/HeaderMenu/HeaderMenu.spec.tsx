import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import HeaderMenu from './HeaderMenu';
import * as reducer from '../../../services/auth/reducers';

describe('HeaderMenu', () => {
  const store: Store = configureStore({
    reducer: { auth: reducer.authSlice },
  });

  beforeEach(() => {
    renderWithProviders(<HeaderMenu profileName="Profile Name" />, store);
  });

  it('renders the header menu', async () => {
    expect(await screen.findByTestId('header-menu')).toBeInTheDocument();
  });
});
