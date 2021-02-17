import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
  appBar: {
    marginBottom: '2rem',
  },
  title: {
    flexGrow: 1,
  },
}));

const HeaderMenu: React.FC = () => {
  const classes = useStyles();

  // prettier-ignore
  const environment = process.env.GATSBY_ACTIVE_ENV ? (
    <Typography variant="subtitle1" className={classes.title}>
      [
      {process.env.GATSBY_ACTIVE_ENV}
      ]
    </Typography>
  ) : null;

  return (
    <AppBar className={classes.appBar} elevation={0} position="static" data-testid="header-menu">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Digital Hybrid
        </Typography>
        {environment}
        <IconButton edge="end" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
