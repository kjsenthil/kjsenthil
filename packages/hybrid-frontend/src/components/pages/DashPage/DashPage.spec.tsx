import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice as authReducer } from '../../../services/auth/reducers';
import { projectionsSlice as projectionsReducer } from '../../../services/projections/reducers';
import DashPage from './DashPage';

describe('DashPage', () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      projections: projectionsReducer,
    },
  });

  it('renders titles successfully', async () => {
    renderWithProviders(<DashPage />, store);

    expect(screen.getByText('XO projection spike')).toBeInTheDocument();
  });
});
