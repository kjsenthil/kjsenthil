/* eslint-disable import/prefer-default-export, import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../src/themes/mui';

// TODO: extract into a namespaced package in the mono-repo
export const renderWithTheme = (component: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

export * from '@testing-library/react';
