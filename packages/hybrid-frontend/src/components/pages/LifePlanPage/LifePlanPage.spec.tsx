import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import LifePlanPage from './LifePlanPage';
import { mockClientResponse, mockInvestSummaryResponse } from '../../../services/myAccount/mocks';
import mockCurrentGoalsResponse from '../../../services/goal/mocks/get-goals-success-response.json';
import mockGetPerformanceResponse from '../../../services/performance/mocks/mock-get-performance-contact-sucess-response-simple.json';
import { PerformanceDataPeriod } from '../../../services/performance/constants';

jest.mock('../../templates/MyAccountLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

jest.mock('../../organisms/PerformanceProjectionsChart/PerformanceProjectionsChart', () => ({
  __esModule: true,
  default: () => <div>Projections Chart</div>,
}));

const mockCurrentProjectionsData = [
  {
    contributionLine: 10000,
    upperBound: 20000,
    lowerBound: 5000,
    projectedValue: 12000,
    month: 1,
  },
  {
    contributionLine: 11000,
    upperBound: 21000,
    lowerBound: 6000,
    projectedValue: 13000,
    month: 10,
  },
];

const mockTargetProjectionsData = [
  {
    month: 0,
    projectedValue: 1000,
  },
  {
    month: 1,
    projectedValue: 2000,
  },
];

const mockPerformanceData = {
  ...mockGetPerformanceResponse,
  performanceDataPeriod: PerformanceDataPeriod['5Y'],
  error: undefined,
};

describe('LifePlanPage', () => {
  const store = configureStore({
    reducer: {
      client: () => ({
        status: 'success',
        ...mockClientResponse,
      }),
      investmentSummary: () => ({
        status: 'success',
        ...mockInvestSummaryResponse,
      }),
      performance: () => ({
        status: 'success',
        ...mockPerformanceData,
      }),
      currentGoals: () => ({
        status: 'success',
        data: mockCurrentGoalsResponse,
      }),
      goalCurrentProjections: () => ({
        status: 'success',
        data: {
          projections: mockCurrentProjectionsData,
        },
      }),
      goalTargetProjections: () => ({
        status: 'success',
        data: {
          projections: mockTargetProjectionsData,
        },
      }),
    },
  });

  beforeEach(() => {
    renderWithProviders(<LifePlanPage />, store);
  });

  it('renders the projections chart and disclaimer', async () => {
    expect(screen.getByText('Projections Chart')).toBeInTheDocument();
    expect(
      screen.getByText('Such forecasts are not a reliable indicator of future performance')
    ).toBeInTheDocument();
  });

  it('renders goals card successfully', async () => {
    expect(screen.getByText('Your important moments')).toBeInTheDocument();
    expect(screen.getByText('Coming soon')).toBeInTheDocument();
  });
});
