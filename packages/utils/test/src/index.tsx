/* eslint-disable import/prefer-default-export, import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';

let theme: Record<string, unknown> = {};

export const setTheme = (customTheme: Record<string, unknown>) => {
  theme = customTheme;
};

export const renderWithTheme = (component: React.ReactNode) =>
  render(
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </MuiThemeProvider>
  );

export * from '@testing-library/react';
