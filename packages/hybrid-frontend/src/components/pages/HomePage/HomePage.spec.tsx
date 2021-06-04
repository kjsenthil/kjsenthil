import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { useStaticQuery } from 'gatsby';
import HomePage from './HomePage';
import { authSlice as authReducer } from '../../../services/auth/reducers';
import investmentSummaryReducer from '../../../services/myAccount/reducers/investmentSummarySlice';
import { performanceSlice as performanceReducer } from '../../../services/performance/reducers';
import { goalsSlice as goalsReducer } from '../../../services/goal/reducers';
import { projectionsSlice as projectionsReducer } from '../../../services/projections';
import { mockClientResponse } from '../../../services/myAccount/mocks';

jest.mock('../../templates/MyAccountLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

jest.mock('gatsby-image', () => ({
  __esModule: true,
  default: () => <img alt="life plan" />,
}));

describe('HomePage', () => {
  beforeEach(() => {
    (useStaticQuery as jest.Mock).mockImplementation(() => ({
      lifePlan: {
        childImageSharp: {
          fluid: 'Some image',
        },
      },
    }));
  });

  const store = configureStore({
    reducer: {
      auth: authReducer,
      investmentSummary: investmentSummaryReducer,
      performance: performanceReducer,
      projections: projectionsReducer,
      client: () => mockClientResponse,
      goals: goalsReducer,
    },
  });

  it('renders titles successfully', () => {
    renderWithProviders(<HomePage />, store);

    expect(screen.getByText('Past performance')).toBeInTheDocument();
  });
});