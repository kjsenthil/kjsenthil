import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
  loginButton: {
    textTransform: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

const HeaderMenu: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" data-testid="header-menu">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Bestinvest
        </Typography>
        <Button className={classes.loginButton} color="inherit">
          Log in
        </Button>
        <IconButton edge="end" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
