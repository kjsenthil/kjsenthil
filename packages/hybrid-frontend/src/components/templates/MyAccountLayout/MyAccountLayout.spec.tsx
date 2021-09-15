import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { renderWithProviders, screen } from '@tsw/test-util';
import { CurrencyPresentationVariant, formatCurrency } from '@tswdts/react-components';
import { featureToggleSlice as featureToggleReducer } from '../../../services/featureToggle/reducers';
import MyAccountLayout from './MyAccountLayout';

jest.mock('@tswdts/react-components', () => ({
  ...jest.requireActual('@tswdts/react-components'),
  __esModule: true,
  LinearProgress: () => <div data-testid="linear-progress-bar" />,
  HeaderMenu: () => <div data-testid="header" />,
  Footer: () => <div data-testid="footer" />,
}));

jest.mock('@reach/router', () => ({
  useLocation: () => ({ pathname: '/' }),
}));

const basicInfo = {
  isLoading: false,
  firstName: 'Ava',
  lastName: 'Garcia',
  dateOfBirth: new Date(1984, 1, 1),
  clientAge: 37,
  totalInvested: 148238.52,
  totalGainLoss: 7632.04,
  totalInvestableCash: 51520.22,
};

describe('MyAccountLayout', () => {
  const store = configureStore({
    reducer: {
      featureToggle: featureToggleReducer,
    },
  });

  describe('without heading', () => {
    beforeEach(() => {
      renderWithProviders(
        <MyAccountLayout basicInfo={basicInfo}>
          <div data-testid="some-child-element" />
        </MyAccountLayout>,
        store
      );
    });

    it('does not render heading', () => {
      expect(screen.queryByTestId('page-heading')).not.toBeInTheDocument();
    });

    it('renders with child elements', async () => {
      expect(await screen.findByTestId('some-child-element')).toBeInTheDocument();
    });

    it('renders with header', async () => {
      expect(await screen.findByTestId('header')).toBeInTheDocument();
    });

    it('renders with footer', async () => {
      expect(await screen.findByTestId('footer')).toBeInTheDocument();
    });

    it('renders coach card successfully', () => {
      expect(screen.getByText('Speak to a coach')).toBeInTheDocument();
    });
  });

  describe('with heading', () => {
    it('renders with heading', async () => {
      const { firstName, totalInvested, totalGainLoss } = basicInfo;
      const heading = {
        primary: `You have ${formatCurrency(
          totalInvested,
          CurrencyPresentationVariant.ACTUAL_TOPLINE
        )} `,
        secondary: `Hi ${firstName}, `,
        tertiary: `${formatCurrency(
          totalGainLoss,
          CurrencyPresentationVariant.ACTUAL_TOPLINE
        )} total gain`,
      };

      renderWithProviders(
        <MyAccountLayout heading={heading} basicInfo={basicInfo}>
          <div data-testid="some-child-element" />
        </MyAccountLayout>,
        store
      );

      const pageHeading = await screen.findByTestId('page-heading');

      expect(pageHeading.textContent).toMatchInlineSnapshot(
        `"Hi Ava, You have £148,238 £7,632 total gain"`
      );

      expect(pageHeading).toBeInTheDocument();
    });
  });

  describe('with loading state', () => {
    const basicInfoIsLoading = {
      ...basicInfo,
      isLoading: true,
    };

    it('renders a loading progess bar', async () => {
      renderWithProviders(
        <MyAccountLayout basicInfo={basicInfoIsLoading}>
          <div data-testid="some-child-element" />
        </MyAccountLayout>,
        store
      );
      expect(await screen.findByTestId('linear-progress-bar')).toBeInTheDocument();
    });
  });
});
