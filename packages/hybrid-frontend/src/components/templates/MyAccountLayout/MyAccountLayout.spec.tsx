import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import MyAccountLayout from './MyAccountLayout';
import * as hooks from '../../../hooks';
import { formatCurrency } from '../../../utils/formatters';

jest.mock('../../organisms', () => ({
  HeaderMenu: () => <div data-testid="header" />,
  Footer: () => <div data-testid="footer" />,
}));

const basicInfo = {
  isLoading: false,
  firstName: 'Ava',
  lastName: 'Garcia',
  totalInvested: 148238.52,
  totalGainLoss: 7632.04,
};

describe('MyAccountLayout', () => {
  let useBasicInfoSpy: jest.SpyInstance;
  beforeEach(() => {
    useBasicInfoSpy = jest.spyOn(hooks, 'useBasicInfo').mockReturnValue(basicInfo);
  });

  describe('without heading', () => {
    beforeEach(() => {
      renderWithTheme(
        <MyAccountLayout>
          <div data-testid="some-child-element" />
        </MyAccountLayout>
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
  });

  describe('with heading', () => {
    it('renders with heading', async () => {
      const heading = ({ firstName, totalInvested, totalGainLoss }: hooks.BasicInfo) => ({
        primary: `You have ${formatCurrency(totalInvested)} `,
        secondary: `Hi ${firstName}, `,
        tertiary: `${formatCurrency(totalGainLoss)} total gain`,
      });

      renderWithTheme(
        <MyAccountLayout headerProps={{ profileName: 'Ava' }} heading={heading}>
          <div data-testid="some-child-element" />
        </MyAccountLayout>
      );

      expect(useBasicInfoSpy).toHaveBeenCalledTimes(1);
      const pageHeading = await screen.findByTestId('page-heading');

      expect(pageHeading.textContent).toMatchInlineSnapshot(
        `"Hi Ava, You have £148,238.52 £7,632.04 total gain"`
      );

      expect(pageHeading).toBeInTheDocument();
    });
  });
});
