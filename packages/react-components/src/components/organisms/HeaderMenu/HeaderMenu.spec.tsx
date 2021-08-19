import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import HeaderMenu from './HeaderMenu';

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
};

describe('HeaderMenu', () => {
  it('renders the header menu', async () => {
    const { result } = renderWithTheme(
      <HeaderMenu isNonProd={false} myAccountsUrl="https://google.com" {...props} />
    );
    expect(result.container).toMatchSnapshot();
  });
});
