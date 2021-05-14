import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import HeaderMenu from './HeaderMenu';
import * as reducer from '../../../services/auth/reducers';

const OLD_ENV = process.env;

describe('HeaderMenu', () => {
  const store: Store = configureStore({
    reducer: { auth: reducer.authSlice },
  });

  beforeEach(() => {
    process.env = { ...OLD_ENV };
    renderWithProviders(<HeaderMenu />, store);
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('renders the header menu', async () => {
    expect(await screen.findByTestId('header-menu')).toBeInTheDocument();
  });
});
