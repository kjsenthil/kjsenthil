import React from 'react';
import Grid from '@material-ui/core/Grid';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      {children}
    </Grid>
  </Grid>
);

export default Layout;
