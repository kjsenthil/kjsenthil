import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { CircularProgress, Container } from '../../atoms';
import theme from '../../../themes/mui';
import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import useExDataLoading from '../../../hooks/GlobalContextHooks/useExDataLoading';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLoading } = useGlobalContext();
  useExDataLoading();
  return (
    // to maintain styled-components as the priority that overrides MUI's themes
    // MUI classes must be injested in <head> first, then styled-components
    // https://material-ui.com/guides/interoperability/#styled-components
    <StylesProvider>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            {isLoading && <CircularProgress />}
            {children}
          </Container>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default Layout;
