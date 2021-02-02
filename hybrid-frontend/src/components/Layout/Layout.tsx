import React from 'react';
import Grid from '@material-ui/core/Grid';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from '../../material-ui/theme';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default Layout;
