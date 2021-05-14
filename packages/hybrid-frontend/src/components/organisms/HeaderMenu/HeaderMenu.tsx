import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../../services/auth';
import { AppBar, Toolbar, Typography, IconButton, MenuIcon, Button } from '../../atoms';
import { ACTIVE_ENV } from '../../../config';

const MenuToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const HeaderMenu = () => {
  // prettier-ignore
  const environment = ACTIVE_ENV ? (
    <Typography variant="sh1" color='white'>
      [
      {ACTIVE_ENV}
      ]
    </Typography>
  ) : null;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <AppBar elevation={0} position="static" data-testid="header-menu">
        <MenuToolBar>
          <div>
            <IconButton edge="end" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </div>

          <Typography variant="h5" color="white">
            Digital Hybrid
          </Typography>
          {environment}

          <Button data-testid="logout" variant="contained" color="primary" onClick={logoutHandler}>
            Log out
          </Button>
        </MenuToolBar>
      </AppBar>
    </>
  );
};

export default HeaderMenu;
