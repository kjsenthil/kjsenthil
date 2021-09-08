import { navigate } from 'gatsby';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  Icon,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuIcon,
  MenuItem,
  Switcher,
  Toolbar,
  Typography,
  useMediaQuery,
} from '../../../atoms';
import { NavLink, SubHeader } from '../../../molecules';
import {
  CashText,
  DrawerContainer,
  LogoImage,
  StyledAppBar,
  SwitcherLabel,
} from './OldHeaderMenu.styles';
import Spacer from '../../../atoms/Spacer/Spacer';

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
  shouldDisplayInNonProdOnly?: boolean;
  color?: 'primary' | 'error';
  icon?: React.ReactElement;
} & LinkType;

export interface OldHeaderMenuProps {
  homePath: string;
  links: Array<LinkData>;
  switchHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isExpFeatureFlagEnabled?: boolean;
  currentUrl: string;
  cash: string;
  isNonProd: boolean;
  myAccountsUrl: string;
}

const OldHeaderMenu = ({
  cash,
  currentUrl,
  homePath,
  links,
  switchHandler,
  isExpFeatureFlagEnabled,
  isNonProd,
  myAccountsUrl,
}: OldHeaderMenuProps) => {
  const isLargerScreen = useMediaQuery('(min-width: 830px)'); // This is temperory - design will change later and breakdown better specified

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

  const renderSwitcher = (withInnerLabel: boolean, onClick: (evt) => void) => (
    <Switcher
      size="small"
      withInnerLabel={withInnerLabel}
      checked={isExpFeatureFlagEnabled}
      onClick={onClick}
    />
  );

  const navigateHome = () => navigate(homePath);

  const filterForEnv = (link: LinkData) =>
    link.shouldDisplayInNonProdOnly === undefined || link.shouldDisplayInNonProdOnly === isNonProd;
  const renderMenuNavDropdownLinks = () =>
    links
      .filter((link) => link.shouldShowInDropdownMenu && filterForEnv(link))
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
      {links.filter(filterForEnv).map((link, i) => (
        <ListItem
          key={link.name}
          divider={links.length - 1 > i}
          onClick={getOnLinkClick(link) as any}
          button={link.type === 'switch' ? false : undefined}
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
        <Grid item container justifyContent="flex-end" spacing={2} wrap="nowrap">
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
            <Typography variant="b5">cash ready to invest</Typography>
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
    <Box data-testid="header">
      <StyledAppBar position="relative" data-testid="header-menu" color="inherit" elevation={0}>
        <Toolbar variant="dense">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid container justifyContent="space-between" direction="row" alignItems="center">
              <Grid item xs={2}>
                <Link onClick={navigateHome}>
                  <LogoImage />
                </Link>
              </Grid>

              {isLargerScreen ? (
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-between"
                  xs={10}
                  wrap="nowrap"
                >
                  <Grid item container justifyContent="flex-start" wrap="nowrap">
                    {renderMenuNavLinks()}
                  </Grid>
                  <Grid
                    item
                    container
                    spacing={2}
                    justifyContent="flex-end"
                    alignItems="center"
                    wrap="nowrap"
                    component="div"
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
                        id="simple-menu"
                        anchorEl={profileAnchorEl}
                        keepMounted
                        open={Boolean(profileAnchorEl)}
                        onClose={handleProfileMenuClose}
                      >
                        {renderMenuNavDropdownLinks()}
                      </Menu>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={9}>
                  <Grid container justifyContent="flex-end">
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
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <SwitcherLabel
                  labelPlacement="start"
                  control={<Box ml={1}>{renderSwitcher(true, switchHandler)}</Box>}
                  label="Experimental Features"
                />
              </Grid>
              <Grid item>
                <Button color="primary" variant="outlined" href={myAccountsUrl}>
                  My Accounts Login
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item container wrap="nowrap" justifyContent="space-between" alignItems="center">
              {renderCashAndInvestActions(true)}
            </Grid>
          )}
        </SubHeader>
      </StyledAppBar>
    </Box>
  );
};

export default OldHeaderMenu;
