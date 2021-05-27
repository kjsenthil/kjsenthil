import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { action } from '@storybook/addon-actions';
import theme from '../src/themes/mui';
import { configureStore } from '@reduxjs/toolkit';
import { mockClientResponse, mockInvestSummaryResponse } from '../src/services/myAccount/mocks';

const mockStore = configureStore({
  reducer: {
    client: () => mockClientResponse,
    investmentSummary: () => mockInvestSummaryResponse,
    projections: () => ({
      projections: { projections: undefined },
    }),
  },
});

/**
 * Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
 * This global object isn't set in storybook context, requiring you to override it
 * to empty functions (no-op), so Gatsby Link doesn't throw any errors.
 */
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};

// Prevents "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/';

/**
 * Navigating through a Gatsby app using gatsby-link or any other Gatsby component will use the `___navigate` method.
 * In Storybook it makes more sense to log an action than doing an actual navigate.
 * @see https://github.com/storybookjs/storybook/tree/master/addons/actions
 */
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

// Global decorator to make Material UI theme available to all components
export const decorators = [
  (Story) => (
    <Provider store={mockStore}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Story />
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  ),
];
