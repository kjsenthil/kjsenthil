import React from 'react';
import { PerformanceDataPeriod } from '@tswdts/react-components';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import LifePlanPageV1 from './LifePlanPageV1';
import {
  mockClientResponse,
  mockInvestmentSummaryResponse,
} from '../../../services/myAccount/mocks';
import mockCurrentGoalsResponse from '../../../services/goal/mocks/get-goals-success-response.json';
import mockGetPerformanceResponse from '../../../services/performance/mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';
import mockAuthSuccessState from '../../../services/auth/mocks/mock-auth-success-state.json';
import * as hooks from '../../../hooks';

jest.mock('../../templates/MyAccountLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

jest.mock('@tswdts/react-components', () => ({
  ...jest.requireActual('@tswdts/react-components'),
  __esModule: true,
  PerformanceProjectionsChart: () => <div>Projections Chart</div>,
}));

jest.mock('../../../hooks', () => {
  const originalModule = jest.requireActual('../../../hooks');

  return {
    ...originalModule,
    useGoalImages: jest.fn(),
    useUpdateSimulateProjectionsPrerequisites: jest.fn(),
    useAccountIds: jest.fn(() => ['20500', '20871']),
  };
});

const mockUseGoalImages = hooks.useGoalImages as jest.Mock;
const mockUseUpdateSimulateProjectionsPrerequisites = hooks.useUpdateSimulateProjectionsPrerequisites as jest.Mock;

const mockSimulateProjectionsData = [
  {
    upper: 20000,
    lower: 5000,
    average: 12000,
    monthNo: 1,
  },
  {
    upper: 21000,
    lower: 6000,
    average: 13000,
    monthNo: 10,
  },
];

const mockContributionData = [
  {
    value: 10000,
    monthNo: 1,
  },
  {
    value: 11000,
    monthNo: 10,
  },
];

const mockTargetProjectionsData = [
  {
    monthNo: 0,
    value: 1000,
  },
  {
    monthNo: 1,
    value: 2000,
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
      auth: () => ({
        status: 'success',
        ...mockAuthSuccessState,
      }),
      client: () => ({
        status: 'success',
        ...mockClientResponse,
      }),
      investmentSummary: () => ({
        status: 'success',
        ...mockInvestmentSummaryResponse,
      }),
      investmentAccounts: () => ({
        status: 'success',
        data: [],
      }),
      performance: () => ({
        status: 'success',
        ...mockPerformanceData,
      }),
      currentGoals: () => ({
        status: 'success',
        data: mockCurrentGoalsResponse,
      }),
      goalSimulateProjections: () => ({
        status: 'success',
        data: {
          projectionData: mockSimulateProjectionsData,
          contributionData: mockContributionData,
          goal: {
            onTrack: {
              percentage: 37.483978271484375,
              targetProjectionData: mockTargetProjectionsData,
            },
            desiredDiscountedOutflow: 245368.8,
            affordableUnDiscountedOutflowAverage: 91973.98767700195,
            shortfallSurplusAverage: 153394.81232299804,
            affordableUndiscountedOutflowUnderperform: 90650.47280273437,
            shortfallSurplusUnderperform: 154718.32719726564,
            drawdownRetirement: {
              affordable: {
                lumpSum: 0,
                remainingAmount: 0,
                drawdown: 347.0716516113281,
                totalDrawdown: 91973.98767700195,
              },
              underperform: {
                lumpSum: 0,
                remainingAmount: 0,
                drawdown: 342.077255859375,
                totalDrawdown: 90650.47280273437,
              },
            },
          },
        },
      }),
      simulatedProjections: () => ({
        status: 'idle',
        data: [],
      }),
    },
  });

  beforeEach(() => {
    mockUseGoalImages.mockReturnValue({
      lifePlan: { childImageSharp: { fluid: '' } },
      setUpNew: { childImageSharp: { fluid: '' } },
    });
    mockUseUpdateSimulateProjectionsPrerequisites.mockReturnValue({});
    renderWithProviders(<LifePlanPageV1 />, store);
  });

  it('renders the projections chart and forecasts disclaimer', async () => {
    expect(screen.getByText('Projections Chart')).toBeInTheDocument();
    expect(
      screen.getByText('Such forecasts are not a reliable indicator of future performance')
    ).toBeInTheDocument();
  });

  it('renders goals card successfully', () => {
    expect(screen.getByText('Your important moments')).toBeInTheDocument();
  });
});
