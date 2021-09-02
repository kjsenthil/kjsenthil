import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { fireEvent } from '@testing-library/react';
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

jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  useMediaQuery: () => true,
}));

describe('HeaderMenu in desktop view with experimental features enabled', () => {
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

  it('The coach signpost should be visible in the subheader', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled />);

    expect(result.getByText('YOUR COACH')).toBeVisible();
    expect(result.getByText('Book an appointment')).toBeVisible();
  });

  it('Clicking "Book an appointment" should toggle displaying the coaching modal', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled />);

    expect(result.queryByText('Speak to a coach')).not.toBeInTheDocument();

    fireEvent.click(result.getByText('Book an appointment'));

    expect(result.queryByText('Speak to a coach')).toBeInTheDocument();
    expect(result.getByRole('img')).toHaveAttribute('src', 'coachPortrait.png');
    expect(result.getByRole('button', { name: /Book an appointment/i })).toBeVisible();
  });
});

describe('HeaderMenu in desktop view with experimental features disabled', () => {
  it('renders the header menu view without experimental features', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled={false} />);

    expect(result.container).toMatchSnapshot();
  });

  it('The link back to MyAccounts should not be visible in the subheader', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled={false} />);
    const myAccountsLink = result.queryByRole('link', { name: /Back to old Bestinvest/i });

    expect(myAccountsLink).not.toBeInTheDocument();
  });

  it('The coach signpost should not be visible in the subheader', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled={false} />);

    expect(result.queryByText('YOUR COACH')).not.toBeInTheDocument();
    expect(result.queryByText('Book an appointment')).not.toBeInTheDocument();
  });

  it('The MyAccounts login button should be visible in the subheader', async () => {
    const { result } = renderWithTheme(<HeaderMenu {...props} isExpFeatureFlagEnabled={false} />);
    const myAccountsButton = result.getByRole('link', { name: /My Accounts Login/i });

    expect(myAccountsButton).toBeVisible();
    expect(myAccountsButton).toHaveAttribute('href', 'https://google.com');
  });
});
