import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import MyAccountLayout from './MyAccountLayout';

import * as reducer from '../../../services/auth/reducers';

jest.mock('../../organisms', () => ({
  HeaderMenu: () => <div data-testid="header" />,
  Footer: () => <div data-testid="footer" />,
}));

describe('MyAccountLayout', () => {
  const store: Store = configureStore({
    reducer: { auth: reducer.authSlice },
  });

  describe('without heading', () => {
    beforeEach(() => {
      renderWithProviders(
        <MyAccountLayout>
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
  });

  describe('with heading', () => {
    it('renders with heading', async () => {
      const heading = {
        primary: `You have £148,238.52 `,
        secondary: 'Hi Ava, ',
        tertiary: '£7,632.04 total gain',
      };
      renderWithProviders(
        <MyAccountLayout heading={heading}>
          <div data-testid="some-child-element" />
        </MyAccountLayout>,
        store
      );

      const pageHeading = await screen.findByTestId('page-heading');

      expect(pageHeading.textContent).toMatchInlineSnapshot(
        `"Hi Ava, You have £148,238.52 £7,632.04 total gain"`
      );
      expect(pageHeading).toBeInTheDocument();
    });
  });
});
