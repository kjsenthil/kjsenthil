import { renderWithProviders, screen } from '@tsw/test-util';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as reducer from '../../../services/auth/reducers';
import SelectGoalsPage from './SelectGoalsPage';

describe('SelectGoalsPage', () => {
  const store: Store = configureStore({
    reducer: { auth: reducer.authSlice },
  });

  test('SelectGoalsPage titles has been successfully rendered', () => {
    renderWithProviders(<SelectGoalsPage />, store);

    expect(screen.getByText('Select a goal')).toBeInTheDocument();
  });
});
