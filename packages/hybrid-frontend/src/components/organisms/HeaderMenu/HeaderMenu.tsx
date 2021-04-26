import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, IconButton, MenuIcon } from '../../atoms';

const MenuToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const HeaderMenu: React.FC = () => {
  // prettier-ignore
  const environment = process.env.GATSBY_ACTIVE_ENV ? (
    <Typography variant="sh1" color='white'>
      [
      {process.env.GATSBY_ACTIVE_ENV}
      ]
    </Typography>
  ) : null;

  return (
    <>
      <AppBar elevation={0} position="static" data-testid="header-menu">
        <MenuToolBar>
          <Typography variant="h5" color="white">
            Digital Hybrid
          </Typography>
          {environment}
          <div>
            <IconButton edge="end" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </div>
        </MenuToolBar>
      </AppBar>
    </>
  );
};

export default HeaderMenu;
