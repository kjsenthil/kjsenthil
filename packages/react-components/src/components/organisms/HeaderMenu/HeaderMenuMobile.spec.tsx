import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { fireEvent } from '@testing-library/react';
import { navigate } from 'gatsby';
import HeaderMenu from './HeaderMenu';

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
  cash: '£101,100.00',
  homePath: '/',
  currentUrl: '/investment',
  expFeatureSwitch: () => {},
  links: [
    {
      name: 'Investment',
      path: '/investment',
    },
    { name: 'Life plan', path: '/life-plan' },
    { name: 'Logout', path: '/logout', shouldShowInDrawer: true },
  ],
  isNonProd: true,
  myAccountsUrl: 'https://google.com',
  coachImages,
};

jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  navigate: jest.fn(),
}));

describe('HeaderMenu in mobile view with experimental features enabled', () => {
  it('renders the header menu view with experimental features', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled />);

    expect(result.container).toMatchSnapshot();
  });

  it('The link back to MyAccounts should be visible in the subheader', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled />);
    const myAccountsLink = result.getByRole('link', { name: /Back to old Bestinvest/i });

    expect(myAccountsLink).toBeVisible();
    expect(myAccountsLink).toHaveAttribute('href', 'https://google.com');
  });

  it('The coach signpost should only be visible once the menu has been expanded', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled />);

    expect(result.getByText('YOUR COACH')).not.toBeVisible();
    expect(result.getByText('Book an appointment')).not.toBeVisible();

    fireEvent.click(result.getByRole('button', { name: 'menu' }));

    expect(result.getByText('YOUR COACH')).toBeVisible();
    expect(result.getByText('Book an appointment')).toBeVisible();
  });

  it('When the menu is expanded, clicking "Book an appointment" should not display the coaching modal, but should take the user to the appointments page', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled />);

    fireEvent.click(result.getByRole('button', { name: 'menu' }));

    expect(result.queryByText('Speak to a coach')).not.toBeInTheDocument();

    fireEvent.click(result.getByText('Book an appointment'));

    expect(result.queryByText('Speak to a coach')).not.toBeInTheDocument();
    expect(result.queryByRole('img')).not.toBeInTheDocument();

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('https://online.bestinvest.co.uk/bestinvest-plus#/');
  });
});

describe('HeaderMenu in mobile view with experimental features disabled', () => {
  it('renders the header menu view without experimental features', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled={false} />);

    expect(result.container).toMatchSnapshot();
  });

  it('The link back to MyAccounts not should be visible in the subheader', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled={false} />);
    const myAccountsLink = result.queryByRole('link', { name: /Back to old Bestinvest/i });

    expect(myAccountsLink).not.toBeInTheDocument();
  });

  it('The coach signpost should not be visible, even when the menu has been expanded', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled={false} />);

    expect(result.queryByText('YOUR COACH')).not.toBeInTheDocument();
    expect(result.queryByText('Book an appointment')).not.toBeInTheDocument();

    fireEvent.click(result.getByRole('button', { name: 'menu' }));

    expect(result.queryByText('YOUR COACH')).not.toBeInTheDocument();
    expect(result.queryByText('Book an appointment')).not.toBeInTheDocument();
  });

  it('The "Add cash" and "Invest" buttons should be visible in the subheader', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled={false} />);
    const addCashButton = result.getByRole('button', { name: /Add cash/i });
    const investButton = result.getByRole('button', { name: /Invest/i });

    expect(addCashButton).toBeVisible();
    expect(investButton).toBeVisible();
  });
});
