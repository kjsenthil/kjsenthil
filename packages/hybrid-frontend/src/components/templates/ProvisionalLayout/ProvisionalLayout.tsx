import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../../../themes/mui';
import { Container } from '../../atoms';

interface LayoutProps {
  children: React.ReactNode;
}

const ProvisionalLayout = ({ children }: LayoutProps) => (
  // to maintain styled-components as the priority that overrides MUI's themes
  // MUI classes must be injested in <head> first, then styled-components
  // https://material-ui.com/guides/interoperability/#styled-components
  <StylesProvider>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={false} disableGutters>
          {children}
        </Container>
      </ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

export default ProvisionalLayout;
