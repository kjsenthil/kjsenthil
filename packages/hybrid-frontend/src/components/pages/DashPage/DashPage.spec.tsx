import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { projectionsSlice as projectionsReducer } from '../../../services/projections';
import DashPage from './DashPage';
import { mockClientResponse } from '../../../services/myAccount/mocks';

jest.mock('../../templates/MyAccountLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

describe('DashPage', () => {
  const store = configureStore({
    reducer: {
      projections: projectionsReducer,
      client: () => mockClientResponse,
    },
  });

  it('renders titles successfully', async () => {
    renderWithProviders(<DashPage />, store);

    expect(screen.getByText('XO projection spike')).toBeInTheDocument();
  });
});
