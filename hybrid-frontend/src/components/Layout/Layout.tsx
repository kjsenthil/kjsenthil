import React from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from '../../material-ui/theme';
import useGlobalContext from '../../hooks/GlobalContextHooks/useGlobalContext';
import useExDataLoading from '../../hooks/GlobalContextHooks/useExDataLoading';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLoading } = useGlobalContext();
  useExDataLoading();
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {isLoading && <CircularProgress />}
        {children}
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
