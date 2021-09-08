import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import OldHeaderMenu from './OldHeaderMenu';
import { useMediaQuery } from '../../../atoms';

jest.mock('../../../atoms', () => {
  const originalModule = jest.requireActual('../../../atoms');

  return {
    ...originalModule,
    useMediaQuery: jest.fn(),
  };
});

const props = {
  homePath: '/',
  currentUrl: '/investments',
  cash: '',
  isNonProd: false,
  switchHandler: () => {},
  links: [
    {
      name: 'Investments',
      path: '/investments',
      shouldShowInDrawer: true,
      shouldShowInMainMenu: true,
    },
    { name: 'Life plan', shouldShowInMainMenu: true, shouldShowInDrawer: true, path: '/life-plan' },
    {
      name: 'Profile',
      shouldShowInMainMenu: false,
      shouldShowInDrawer: true,
      path: '/profile',
    },
  ],
};

describe('OldHeaderMenu', () => {
  describe('HeaderMenu in desktop view', () => {
    beforeEach(() => {
      (useMediaQuery as jest.Mock).mockReturnValue('md');
    });
    it('renders the header menu view without experimental features', () => {
      const { result } = renderWithTheme(
        <OldHeaderMenu
          myAccountsUrl="https://google.com"
          {...props}
          isExpFeatureFlagEnabled={false}
        />
      );

      expect(result.container).toMatchSnapshot();
    });

    it('should display the add cash and invest buttons', () => {
      const { result } = renderWithTheme(
        <OldHeaderMenu myAccountsUrl="https://google.com" {...props} />
      );

      expect(result.queryByText('Add cash')).toBeInTheDocument();
      expect(result.queryByText('Invest')).toBeInTheDocument();
    });

    it('The link back to MyAccounts should not be visible in the subheader', () => {
      const { result } = renderWithTheme(
        <OldHeaderMenu
          myAccountsUrl="https://google.com"
          {...props}
          isExpFeatureFlagEnabled={false}
        />
      );
      const myAccountsLink = result.queryByRole('link', { name: /Back to old Bestinvest/i });

      expect(myAccountsLink).not.toBeInTheDocument();
    });

    it('The MyAccounts login button should be visible in the subheader', () => {
      const { result } = renderWithTheme(
        <OldHeaderMenu
          {...props}
          myAccountsUrl="https://google.com"
          isExpFeatureFlagEnabled={false}
        />
      );
      const myAccountsButton = result.getByRole('link', { name: /My Accounts Login/i });

      expect(myAccountsButton).toBeVisible();
      expect(myAccountsButton).toHaveAttribute('href', 'https://google.com');
    });
  });

  describe('HeaderMenu in mobile view', () => {
    beforeEach(() => {
      (useMediaQuery as jest.Mock).mockReturnValue('sm');
    });
    it('renders the header menu view without experimental features', () => {
      const { result } = renderWithTheme(
        <OldHeaderMenu
          myAccountsUrl="https://google.com"
          {...props}
          isExpFeatureFlagEnabled={false}
        />
      );

      expect(result.container).toMatchSnapshot();
    });

    it('The link back to MyAccounts not should be visible in the subheader', () => {
      const { result } = renderWithTheme(
        <OldHeaderMenu
          myAccountsUrl="https://google.com"
          {...props}
          isExpFeatureFlagEnabled={false}
        />
      );
      const myAccountsLink = result.queryByRole('link', { name: /Back to old Bestinvest/i });

      expect(myAccountsLink).not.toBeInTheDocument();
    });
  });
});
