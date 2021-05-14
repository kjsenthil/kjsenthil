import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';

let MuiTheme: Record<string, unknown>;

export const setTheme = (theme: Record<string, unknown>) => {
  MuiTheme = theme;
};

const getTheme = () => {
  if (!MuiTheme) {
    throw new Error('You need to setTheme before any test is run');
  }

  return MuiTheme;
};

const withTheme = (component: React.ReactNode) => {
  const theme = getTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </MuiThemeProvider>
  );
};

export default withTheme;
