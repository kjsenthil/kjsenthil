/* eslint-disable import/prefer-default-export, import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

let theme: Record<string, unknown> = {};

export const setTheme = (customTheme: Record<string, unknown>) => {
  theme = customTheme;
};

export const renderWithTheme = (component: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

export * from '@testing-library/react';
