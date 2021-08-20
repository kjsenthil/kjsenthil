import React from 'react';
import { PerformanceDataPeriod } from '@tswdts/react-components';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import LifePlanPage from './LifePlanPage';
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
    useUpdateCurrentProjectionsPrerequisites: jest.fn(),
    useAccountIds: jest.fn(() => ['20500', '20871']),
  };
});

const mockUseGoalImages = hooks.useGoalImages as jest.Mock;
const mockUseUpdateCurrentProjectionsPrerequisites = hooks.useUpdateCurrentProjectionsPrerequisites as jest.Mock;

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
      goalCurrentProjections: () => ({
        status: 'success',
        data: {
          desiredOutflow: 245368.8,
          onTrackPercentage: 0.37483978271484375,
          affordableDrawdown: 347.0716516113281,
          affordableLumpSum: 0,
          affordableRemainingAmount: 0,
          affordableOutflow: 91973.98767700195,
          surplusOrShortfall: 153394.81232299804,
          valueAtRetirement: 0.07741928261073262,
          totalAffordableDrawdown: 91973.98767700195,
          projectedGoalAgeTotal: 73093.11048848694,
          possibleDrawdown: 347.0718785441286,
          marketUnderperform: {
            desiredOutflow: 245368.8,
            onTrackPercentage: 0.36944580078125,
            affordableDrawdown: 342.077255859375,
            affordableLumpSum: 0,
            affordableRemainingAmount: 0,
            affordableOutflow: 90650.47280273437,
            surplusOrShortfall: 154718.32719726564,
            valueAtRetirement: 0.25640099215629014,
            totalAffordableDrawdown: 90650.47280273437,
          },
          projections: mockCurrentProjectionsData,
        },
      }),
      goalTargetProjections: () => ({
        status: 'success',
        data: {
          projections: mockTargetProjectionsData,
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
    mockUseUpdateCurrentProjectionsPrerequisites.mockReturnValue({});
    renderWithProviders(<LifePlanPage />, store);
  });

  it('renders the projections chart and disclaimer', async () => {
    expect(screen.getByText('Projections Chart')).toBeInTheDocument();
    expect(
      screen.getByText('Such forecasts are not a reliable indicator of future performance')
    ).toBeInTheDocument();
  });

  it('renders goals card successfully', () => {
    expect(screen.getByText('Your important moments')).toBeInTheDocument();
  });

  it('renders coach card successfully', () => {
    expect(screen.getByText('Speak to a coach')).toBeInTheDocument();
  });
});
