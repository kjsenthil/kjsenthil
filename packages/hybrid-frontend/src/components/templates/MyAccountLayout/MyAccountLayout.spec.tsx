import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import MyAccountLayout from './MyAccountLayout';
import * as reducer from '../../../services/auth/reducers';

describe('MyAccountLayout', () => {
  const store: Store = configureStore({
    reducer: { auth: reducer.authSlice },
  });

  test('Renders with child elements', async () => {
    renderWithProviders(
      <MyAccountLayout>
        <div data-testid="some-child-element" />
      </MyAccountLayout>,
      store
    );

    expect(await screen.findByTestId('some-child-element')).toBeInTheDocument();
  });
});
