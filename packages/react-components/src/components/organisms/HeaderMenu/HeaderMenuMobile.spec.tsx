import React from 'react';
import { renderWithTheme, fireEvent, screen } from '@tsw/test-util';
import { navigate } from 'gatsby';
import { useMediaQuery } from '../../atoms';
import HeaderMenu from './HeaderMenu';

jest.mock('../../atoms', () => {
  const originalModule = jest.requireActual('../../atoms');

  return {
    ...originalModule,
    useMediaQuery: jest.fn(),
  };
});

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

const props = {
  homePath: '/',
  currentUrl: '/investments',
  switchHandler: () => {},
  coachImages,
  navigate,
  links: [
    {
      name: 'Investments',
      path: '/investments',
      shouldShowInDrawer: true,
      shouldShowInMainMenu: true,
      type: 'link',
      coachImages,
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

describe('Header Menu in Mobile', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue('sm');
  });

  it('renders the header menu (with experimental features)', () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled />);

    expect(result.container).toMatchSnapshot();
  });

  it('The link back to MyAccounts should be visible in the subheader', () => {
    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" isExpFeatureFlagEnabled {...props} />
    );
    const myAccountsLink = result.getByRole('link', { name: /Back to old Bestinvest/i });

    expect(myAccountsLink).toBeVisible();
    expect(myAccountsLink).toHaveAttribute('href', 'https://google.com');
  });

  it('The coach signpost should only be visible once the menu has been expanded', () => {
    const { result } = renderWithTheme(<HeaderMenu isExpFeatureFlagEnabled {...props} />);

    expect(result.getByText('YOUR COACH')).not.toBeVisible();
    expect(result.getByText('Book an appointment')).not.toBeVisible();

    fireEvent.click(result.getByRole('button', { name: 'menu' }));

    expect(result.getByText('YOUR COACH')).toBeVisible();
    expect(result.getByText('Book an appointment')).toBeVisible();
  });

  it('When the menu is expanded, clicking "Book an appointment" should not display the coaching modal, but should take the user to the appointments page', () => {
    const { result } = renderWithTheme(<HeaderMenu isExpFeatureFlagEnabled {...props} />);

    fireEvent.click(result.getByRole('button', { name: 'menu' }));

    expect(result.queryByText('Speak to a coach')).not.toBeInTheDocument();

    fireEvent.click(result.getByText('Book an appointment'));

    expect(result.queryByText('Speak to a coach')).not.toBeInTheDocument();
    expect(result.queryByRole('img')).not.toBeInTheDocument();

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('https://online.bestinvest.co.uk/bestinvest-plus#/');
  });

  it('should display a menu icon when menu is closed', () => {
    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" isExpFeatureFlagEnabled {...props} />
    );
    expect(result.getByLabelText('menu')).toBeVisible();
  });

  it('should display a close icon when menu is open', () => {
    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" isExpFeatureFlagEnabled {...props} />
    );
    fireEvent.click(
      result.getByRole('button', {
        name: /menu/i,
      })
    );

    expect(result.getByLabelText('close menu')).toBeVisible();
  });

  it('should not display child links of Nav Links', () => {
    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" isExpFeatureFlagEnabled {...props} />
    );

    expect(result.queryByText('Stocks & Shares ISA')).not.toBeInTheDocument();
    expect(result.queryByText('Investment accounts')).not.toBeInTheDocument();
  });

  it('should display child links of Nav Links when the arrow menu button is clicked', () => {
    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" isExpFeatureFlagEnabled {...props} />
    );

    fireEvent.click(
      result.getByRole('button', {
        name: /menu/i,
      })
    );

    fireEvent.click(screen.getByLabelText('open Investments menu'));

    expect(result.queryByText('Stocks & Shares ISA')).toBeInTheDocument();
    expect(result.queryByText('Investment accounts')).toBeInTheDocument();
  });

  it('should display a green icon when phone lines are open', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date(`2021-08-24T13:01:58.135Z`).valueOf()); // Tuesday

    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" isExpFeatureFlagEnabled {...props} />
    );

    fireEvent.click(
      result.getByRole('button', {
        name: /menu/i,
      })
    );

    expect(result.queryByTestId('circle-phoneline-icon')).toHaveStyle('background-color: #3dd598');
  });

  it('should display the phone number when the phone line open', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date(`2021-08-24T13:01:58.135Z`).valueOf()); // Tuesday

    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" isExpFeatureFlagEnabled {...props} />
    );

    fireEvent.click(
      result.getByRole('button', {
        name: /menu/i,
      })
    );

    expect(result.queryByText('We are open, call us: 020 7189 9999')).toBeInTheDocument();
    expect(result.queryByText('We are currently unavailable')).not.toBeInTheDocument();
  });

  it('should display unavailability text when the phone line closed', () => {
    Date.now = jest.fn().mockImplementation(() => new Date('2021-08-21T11:01:58.135Z').valueOf()); // Saturday

    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" isExpFeatureFlagEnabled {...props} />
    );

    fireEvent.click(
      result.getByRole('button', {
        name: /menu/i,
      })
    );

    expect(result.queryByText('We are currently unavailable')).toBeInTheDocument();
    expect(result.queryByText('We are open, call us: 020 7189 9999')).not.toBeInTheDocument();
  });

  it('should display a red icon when phone lines are closed - Weekend', () => {
    Date.now = jest.fn().mockImplementation(() => new Date('2021-08-21T11:01:58.135Z').valueOf()); // Saturday

    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" isExpFeatureFlagEnabled {...props} />
    );

    fireEvent.click(
      result.getByRole('button', {
        name: /menu/i,
      })
    );

    expect(result.queryByTestId('circle-phoneline-icon')).toHaveStyle('background-color: #eb3a17');
  });

  it('should display a red icon when phone lines are closed - Weekday, after 6pm', () => {
    Date.now = jest.fn().mockImplementation(() => new Date('2021-08-24T18:30:58.135Z').valueOf()); // Saturday

    const { result } = renderWithTheme(
      <HeaderMenu myAccountsUrl="https://google.com" isExpFeatureFlagEnabled {...props} />
    );

    fireEvent.click(
      result.getByRole('button', {
        name: /menu/i,
      })
    );

    expect(result.queryByTestId('circle-phoneline-icon')).toHaveStyle('background-color: #eb3a17');
  });
});
