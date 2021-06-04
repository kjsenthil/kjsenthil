import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import LifePlanPage from './LifePlanPage';
import investmentSummaryReducer from '../../../services/myAccount/reducers/investmentSummarySlice';
import { mockClientResponse } from '../../../services/myAccount/mocks';
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

const mockProjectionsData = [
  {
    actual: 10000,
    high: 20000,
    low: 5000,
    medium: 12000,
    year: 0,
  },
  {
    actual: 11000,
    high: 21000,
    low: 6000,
    medium: 13000,
    year: 1,
  },
];

const mockPerformanceData = {
  performance: mockGetPerformanceResponse,
  performanceDataPeriod: PerformanceDataPeriod['5Y'],
  performanceError: undefined,
  status: 'idle',
};

describe('LifePlanPage', () => {
  const store = configureStore({
    reducer: {
      client: () => mockClientResponse,
      investmentSummary: investmentSummaryReducer,
      performance: () => mockPerformanceData,
      projections: () => ({
        projections: {
          projections: mockProjectionsData,
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
