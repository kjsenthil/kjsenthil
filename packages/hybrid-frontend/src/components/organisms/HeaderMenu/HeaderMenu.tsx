import { useMediaQuery } from '@material-ui/core';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ACTIVE_ENV, MYACCOUNTS_HOME_URL } from '../../../config';
import { FeatureFlagNames } from '../../../constants';
import { useFeatureFlagToggle } from '../../../hooks';

import { logout } from '../../../services/auth';
import { setFeatureToggleFlag } from '../../../services/featureToggle';
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
  Switcher,
  FormControlLabel,
  Divider,
} from '../../atoms';
import { NavLink, SubHeader } from '../../molecules';
import { LogoImage, StyledAppBar } from './HeaderMenu.styles';
import { NavPaths } from '../../../config/paths';

export interface HeaderMenuProps {
  profileName: string;
}

const HeaderMenu = ({ profileName }: HeaderMenuProps) => {
  const dispatch = useDispatch();
  const expFeatureFlag = useFeatureFlagToggle(FeatureFlagNames.EXP_FEATURE);
  const isLargerScreen = useMediaQuery('(min-width: 800px)');

  const isNonProd = ACTIVE_ENV !== 'production';

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

  const navigateLifePlan = () => navigate(NavPaths.LIFE_PLAN_PAGE);

  const navigateAccounts = () => navigate(NavPaths.ACCOUNTS_PAGE);

  const navigateHome = () => {
    navigate(NavPaths.HOME_PAGE);
  };

  const switchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFeatureToggleFlag({ name: FeatureFlagNames.EXP_FEATURE, isEnabled: evt.target.checked })
    );
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
                      <NavLink onClick={navigateAccounts}>
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

        <Divider />

        <SubHeader>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              {isNonProd && (
                <FormControlLabel
                  control={
                    <Box mr={1}>
                      <Switcher
                        size="small"
                        withInnerLabel
                        checked={expFeatureFlag?.isEnabled}
                        onClick={switchHandler}
                      />
                    </Box>
                  }
                  label="Experimental Features"
                />
              )}
            </Grid>

            <Grid item>
              <Button color="secondary" href={MYACCOUNTS_HOME_URL}>
                My Accounts Login
              </Button>
            </Grid>
          </Grid>
        </SubHeader>
      </StyledAppBar>
    </Box>
  );
};

export default HeaderMenu;
