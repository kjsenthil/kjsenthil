import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Container, digitalHybridTheme } from '@tswdts/react-components';

interface LayoutProps {
  children: React.ReactChild;
}

const ProvisionalLayout = ({ children }: LayoutProps) => (
  // to maintain styled-components as the priority that overrides MUI's themes
  // MUI classes must be injested in <head> first, then styled-components
  // https://material-ui.com/guides/interoperability/#styled-components
  <StylesProvider>
    <MuiThemeProvider theme={digitalHybridTheme}>
      <ThemeProvider theme={digitalHybridTheme}>
        <CssBaseline />
        <Container maxWidth={false} disableGutters>
          {children}
        </Container>
      </ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

export default ProvisionalLayout;
