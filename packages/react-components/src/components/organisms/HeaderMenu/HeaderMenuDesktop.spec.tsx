import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { fireEvent, screen } from '@testing-library/react';
import { navigate } from 'gatsby';
import HeaderMenu, { HeaderMenuProps } from './HeaderMenu';

jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  navigate: jest.fn(),
}));

const coachImages = {
  coachPortrait: {
    childImageSharp: {
      fluid: {
        aspectRatio: 0.65,
        src: 'coachPortrait.png',
        srcSet:
          '/coachPortrait.png 25w,/coachPortrait.png 50w,/coachPortrait.png 100w,coachPortrait.png 150w,/coachPortrait.png 200w,/coachPortrait.png 300w',
        sizes: '(max-width: 100px) 100vw, 100px',
      },
    },
  },
  coachIcon: {
    childImageSharp: {
      fluid: {
        aspectRatio: 0.65,
        src: 'coachIcon.png',
        srcSet:
          '/coachIcon.png 25w,/coachIcon.png 50w,/coachIcon.png 100w,coachIcon.png 150w,/coachIcon.png 200w,/coachIcon.png 300w',
        sizes: '(max-width: 100px) 100vw, 100px',
      },
    },
  },
};

const props: HeaderMenuProps = {
  homePath: '/',
  currentUrl: '/investments',
  switchHandler: () => {},
  coachImages,
  toggleCalendlyModal: jest.fn(),
  toggleCoachPopover: jest.fn(),
  showCoachPopover: false,
  navigate,
  links: [
    {
      name: 'Investments',
      path: '/investments',
      shouldShowInDrawer: true,
      shouldShowInMainMenu: true,
      type: 'link',
      childLinks: [
        {
          name: 'Stocks & Shares ISA',
          path: '/stocks-shares-isa',
        },
        {
          name: 'Investment accounts',
          path: '/investment-accounts',
        },
      ],
    },
    { name: 'Life plan', shouldShowInMainMenu: true, shouldShowInDrawer: true, path: '/life-plan' },
    { name: 'Documents', shouldShowInMainMenu: true, shouldShowInDrawer: true, path: '/documents' },
    {
      name: 'Help & Support',
      shouldShowInMainMenu: true,
      shouldShowInDrawer: true,
      path: '/help-and-support',
    },
    {
      name: 'Profile',
      shouldShowInMainMenu: false,
      shouldShowInDrawer: true,
      path: '/profile',
      type: 'link',
      childLinks: [
        {
          name: 'Logout',
          path: '/logout',
        },
      ],
    },
  ],
};

describe('HeaderMenu in desktop view', () => {
  it('should not display child links of Nav Links', () => {
    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" {...props} />
    );

    expect(result.queryByText('Stocks & Shares ISA')).not.toBeInTheDocument();
    expect(result.queryByText('Investment accounts')).not.toBeInTheDocument();
  });

  it('should display child links of Nav Links when the arrow menu button is clicked', () => {
    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" {...props} />
    );

    fireEvent.click(screen.getByLabelText('open Investments menu'));

    expect(result.queryByText('Stocks & Shares ISA')).toBeInTheDocument();
    expect(result.queryByText('Investment accounts')).toBeInTheDocument();
  });

  it('should display the correct icons', () => {
    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" {...props} />
    );

    expect(result.getByLabelText('list')).toBeInTheDocument();
    expect(result.getByLabelText('search')).toBeInTheDocument();
    expect(result.getByLabelText('shopping-cart')).toBeInTheDocument();
    expect(result.getByLabelText('profile')).toBeInTheDocument();
  });

  it('should display the profile menu when the profile icon is clicked', () => {
    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" {...props} />
    );

    fireEvent.click(result.getByLabelText('profile'));

    expect(result.queryByText('Logout')).toBeInTheDocument();
  });

  it('should display the add cash and invest buttons', () => {
    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" {...props} />
    );

    expect(result.queryByText('Add cash')).toBeInTheDocument();
    expect(result.queryByText('Invest')).toBeInTheDocument();
  });

  test('the link back to MyAccounts should be visible in the subheader', () => {
    const { result } = renderWithTheme(
      <HeaderMenu {...props} myAccountsUrl="https://google.com" isExpFeatureFlagEnabled />
    );
    const myAccountsLink = result.getByRole('link', { name: /Back to old Bestinvest/i });

    expect(myAccountsLink).toBeVisible();
    expect(myAccountsLink).toHaveAttribute('href', 'https://google.com');
  });

  test('coach signpost is visible in the subheader', () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled />);

    expect(result.getByText('YOUR COACH')).toBeVisible();
    expect(result.getByText('Book an appointment')).toBeVisible();
  });

  it('should toggle displaying the coaching modal when "Book an appointment" is clicked', () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled />);

    fireEvent.click(result.getByText('Book an appointment'));

    expect(props.toggleCoachPopover).toHaveBeenCalledTimes(1);
  });

  it('should display the "Speak to a coach" modal when showCoachModal is true', () => {
    const { result } = renderWithTheme(
      <HeaderMenu {...props} isExpFeatureFlagEnabled showCoachPopover />
    );

    expect(result.getByText('Speak to a coach')).toBeInTheDocument();
  });
});
