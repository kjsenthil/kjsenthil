import { useMediaQuery } from '@material-ui/core';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../../../services/auth';
import {
  Toolbar,
  Button,
  Grid,
  Menu,
  MenuItem,
  Icon,
  Box,
  Typography,
  Spacer,
  MenuIcon,
  IconButton,
  Link,
} from '../../atoms';
import NavLink from '../../molecules/NavLink';
import { LogoImage, StyledAppBar } from './HeaderMenu.styles';

export interface HeaderMenuProps {
  profileName: string;
}

const HeaderMenu = ({ profileName }: HeaderMenuProps) => {
  const dispatch = useDispatch();

  const isLargerScreen = useMediaQuery('(min-width: 800px)');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const navigateLifePlan = () => navigate('/my-account/life-plan');
  const navigateAccounts = () => navigate('/my-account/accounts');

  const navigateHome = () => {
    navigate('/my-account/');
  };

  return (
    <Box data-test-id="header-menu">
      <StyledAppBar position="relative" data-testid="header-menu" color="inherit" elevation={0}>
        <Toolbar variant="dense">
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} md={8}>
              <Grid container justify="space-evenly" alignItems="center">
                <Grid item xs={4}>
                  <Link onClick={navigateHome}>
                    <LogoImage />
                  </Link>
                </Grid>

                <Spacer x={3} />

                {!isLargerScreen && (
                  <Grid item xs={5}>
                    <Grid container justify="flex-end">
                      <IconButton
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        onClick={handleMenuClick}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={navigateHome}>Home</MenuItem>
                        <MenuItem onClick={navigateAccounts}>Investments</MenuItem>
                        <MenuItem onClick={navigateLifePlan}>Life Plan</MenuItem>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                      </Menu>
                    </Grid>
                  </Grid>
                )}

                {isLargerScreen && (
                  <>
                    <Grid item>
                      <NavLink onClick={navigateHome}>
                        <Typography variant="sh4" color="grey">
                          Home
                        </Typography>
                      </NavLink>
                    </Grid>
                    <Grid item>
                      <NavLink onClick={() => navigate('/my-account/accounts')}>
                        <Typography variant="sh4" color="grey">
                          Investments
                        </Typography>
                      </NavLink>
                    </Grid>
                    <Grid item>
                      <NavLink onClick={navigateLifePlan}>
                        <Typography variant="sh4" color="grey">
                          Life Plan
                        </Typography>
                      </NavLink>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>

            {isLargerScreen && (
              <Grid item xs={12} md={4}>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Grid container>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        variant={undefined}
                        color="primary"
                        onClick={handleProfileMenuClick}
                        endIcon={<Icon name="arrowHeadDown" />}
                      >
                        {profileName}
                      </Button>
                    </Grid>
                    <Menu
                      id="simple-menu"
                      anchorEl={profileAnchorEl}
                      keepMounted
                      open={Boolean(profileAnchorEl)}
                      onClose={handleProfileMenuClose}
                    >
                      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default HeaderMenu;
