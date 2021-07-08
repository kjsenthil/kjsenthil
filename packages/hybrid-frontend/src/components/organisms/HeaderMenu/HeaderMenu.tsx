import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { ACTIVE_ENV, MYACCOUNTS_HOME_URL } from '../../../config';
import {
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Toolbar,
  Button,
  Grid,
  Menu,
  MenuItem,
  Drawer,
  Icon,
  Box,
  Typography,
  MenuIcon,
  IconButton,
  Link,
  Switcher,
  Divider,
} from '../../atoms';
import { NavLink, SubHeader } from '../../molecules';
import {
  SwitcherLabel,
  LogoImage,
  StyledAppBar,
  CashText,
  DrawerContainer,
} from './HeaderMenu.styles';
import Spacer from '../../atoms/Spacer/Spacer';

type LinkWithSwitch = {
  onClick: (isEnabled: boolean) => void;
  type: 'switch';
};

type LinkWithPath = {
  path: string;
  type?: 'link';
};

type LinkType = LinkWithSwitch | LinkWithPath;

type LinkData = {
  name: string;
  shouldShowInMainMenu?: boolean;
  shouldShowInDrawer?: boolean;
  shouldShowInDropdownMenu?: boolean;
  color?: 'primary' | 'error';
  icon?: React.ReactElement;
} & LinkType;

export interface HeaderMenuProps {
  homePath: string;
  links: Array<LinkData>;
  expFeatureSwitch: (isEnabled: boolean) => void;
  isExpFeatureFlagEnabled?: boolean;
  currentUrl: string;
  cash: string;
}

const HeaderMenu = ({
  cash,
  currentUrl,
  homePath,
  links,
  expFeatureSwitch,
  isExpFeatureFlagEnabled,
}: HeaderMenuProps) => {
  const isLargerScreen = useMediaQuery('(min-width: 830px)'); // This is temperory - design will change later and breakdown better specified

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

  const switchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    expFeatureSwitch(evt.target.checked);
  };

  const renderSwitcher = (
    withInnerLabel: boolean,
    onClick: (evt: React.ChangeEvent<HTMLInputElement>) => void
  ) => (
    <Switcher
      size="small"
      withInnerLabel={withInnerLabel}
      checked={isExpFeatureFlagEnabled}
      onClick={onClick}
    />
  );

  const navigateHome = () => navigate(homePath);

  const renderMenuNavDropdownLinks = () =>
    links
      .filter((link) => link.shouldShowInDropdownMenu)
      .map((link) => (
        <MenuItem
          key={`${link.name}-MenuItem`}
          onClick={() => navigate((link as LinkWithPath).path)}
        >
          {link.name}
        </MenuItem>
      ));

  const getOnLinkClick = (link: LinkData) =>
    (link as LinkWithSwitch).onClick
      ? (link as LinkWithSwitch).onClick
      : () => navigate((link as LinkWithPath).path);

  const renderDrawerList = () => (
    <>
      {links.map((link, i) => (
        <ListItem
          key={link.name}
          divider={links.length - 1 > i}
          button={link.type !== 'switch'}
          onClick={getOnLinkClick(link)}
        >
          {!!link.icon && (
            <>
              {link.icon}
              <Spacer x={1} />
            </>
          )}
          <ListItemText>
            <Typography
              variant="sh4"
              colorShade={link.color === 'error' ? undefined : 'dark2'}
              color={link.color ?? 'primary'}
            >
              {link.name}
            </Typography>
          </ListItemText>
          {link.type === 'switch' && (
            <ListItemSecondaryAction>
              {renderSwitcher(false, (evt) => getOnLinkClick(link)(evt.target.checked))}
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
    </>
  );

  const renderMenuNavLinks = () =>
    links
      .filter((link) => link.shouldShowInMainMenu)
      .map((link) => (
        <Grid item key={`${(link as LinkWithPath).path || link.name} - menu`}>
          <NavLink
            onClick={getOnLinkClick(link)}
            selected={(link as LinkWithPath).path === currentUrl}
          >
            <Typography variant="sh4" color="grey">
              {link.name}
            </Typography>
          </NavLink>
        </Grid>
      ));

  const renderCashAndInvestActions = (forSubMenu: boolean = true) => {
    const ButtonWrapper = ({ children }: { children: React.ReactElement }) =>
      forSubMenu ? (
        <Grid item container justify="flex-end" spacing={2} wrap="nowrap">
          {children}
        </Grid>
      ) : (
        children
      );
    return (
      <>
        <Grid item xs={6}>
          <CashText align={forSubMenu ? 'left' : 'right'}>
            <Typography variant="sh4">{cash}</Typography>
            <Typography variant="b3">cash ready to invest</Typography>
          </CashText>
        </Grid>

        <ButtonWrapper>
          <>
            <Grid item>
              <Button
                color="primary"
                wrap="nowrap"
                startIcon={<Icon name="cross" />}
                variant="outlined"
              >
                Add cash
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" startIcon={<Icon name="statistics" />} variant="contained">
                Invest
              </Button>
            </Grid>
          </>
        </ButtonWrapper>
      </>
    );
  };

  return (
    <Box data-test-id="header-menu">
      <StyledAppBar position="relative" data-testid="header-menu" color="inherit" elevation={0}>
        <Toolbar variant="dense">
          <Grid container justify="space-between" alignItems="center">
            <Grid container justify="space-between" direction="row" alignItems="center">
              <Grid item xs={2}>
                <Link onClick={navigateHome}>
                  <LogoImage />
                </Link>
              </Grid>

              {isLargerScreen ? (
                <Grid item container direction="row" justify="space-between" xs={10} wrap="nowrap">
                  <Grid item container justify="flex-start" wrap="nowrap">
                    {renderMenuNavLinks()}
                  </Grid>
                  <Grid
                    item
                    container
                    spacing={2}
                    justify="flex-end"
                    alignItems="center"
                    wrap="nowrap"
                    display="contents"
                  >
                    {renderCashAndInvestActions(false)}
                    <Grid item>
                      <Divider orientation="vertical" y={4} />
                    </Grid>
                    <Grid item>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        variant={undefined}
                        color="primary"
                        onClick={handleProfileMenuClick}
                        endIcon={<Icon name="arrowHeadDown" />}
                      >
                        <Icon name="account" />
                      </Button>
                      <Menu
                        anchor="right"
                        id="simple-menu"
                        anchorEl={profileAnchorEl}
                        keepMounted
                        open={Boolean(profileAnchorEl)}
                        onClose={handleProfileMenuClose}
                        wrap="nowrap"
                      >
                        {renderMenuNavDropdownLinks()}
                      </Menu>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={9}>
                  <Grid container justify="flex-end">
                    <IconButton
                      edge="start"
                      color="primary"
                      aria-label="menu"
                      onClick={handleMenuClick}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Drawer
                      anchor="right"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <DrawerContainer>
                        <List>{renderDrawerList()}</List>
                      </DrawerContainer>
                    </Drawer>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Toolbar>

        <Divider />

        <SubHeader>
          {isLargerScreen ? (
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                {isNonProd && (
                  <SwitcherLabel
                    labelPlacement="start"
                    control={<Box ml={1}>{renderSwitcher(true, switchHandler)}</Box>}
                    label="Experimental Features"
                  />
                )}
              </Grid>

              <Grid item>
                <Button color="primary" variant="outlined" href={MYACCOUNTS_HOME_URL}>
                  My Accounts Login
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item container wrap="nowrap" justify="space-between" alignItems="center">
              {renderCashAndInvestActions(true)}
            </Grid>
          )}
        </SubHeader>
      </StyledAppBar>
    </Box>
  );
};

export default HeaderMenu;
