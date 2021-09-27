import React, { useState } from 'react';
import Img from 'gatsby-image';
import {
  Box,
  Button,
  ClearIcon,
  Divider,
  Drawer,
  Grid,
  Icon,
  InputAdornment,
  Link,
  ListItem,
  ListItemSecondaryAction,
  MenuIcon,
  Switcher,
  useMediaQuery,
  useTheme,
  Typography,
} from '../../atoms';
import { DisabledComponent, NavLink, SubHeader } from '../../molecules';
import { ClickAwayListener } from '../../particles';
import CoachingPopover from '../CoachingPopover';
import {
  Availability,
  CallBack,
  CallContainer,
  CashAndInvestGrid,
  Circle,
  CoachIcon,
  CoachIconContainer,
  CoachTextContainer,
  DrawerContainer,
  DrawerFooterContainer,
  IconGridDivider,
  InvestButton,
  LogoImage,
  ModalContainer,
  MyAccountsContainer,
  ProfileMenuItem,
  RotatedIcon,
  StyledAppBar,
  StyledCallBackLink,
  StyledMenuNavGrid,
  StyledMobileMenuList,
  StyledIconButton,
  StyledInputBase,
  StyledProfileList,
  StyledSubHeader,
  StyledToolbar,
  SwitcherLabel,
} from './HeaderMenu.styles';
import { StyledChildNavLink } from '../../molecules/NavLinkWithDropDown/NavLinkWithDropDown.styles';
import Spacer from '../../atoms/Spacer/Spacer';
import NavLinkWithDropDown, { NavLinkWithDropDownProps } from '../../molecules/NavLinkWithDropDown';
import CalendarIcon from './CalendarIcon';

type LinkWithSwitch = {
  onClick: (isEnabled: boolean) => void;
  type: 'switch';
};

type LinkWithPath = {
  path: string;
  type?: string;
};

type LinkType = LinkWithSwitch | LinkWithPath;

export type LinkData = {
  name: string;
  shouldShowInMainMenu: boolean;
  shouldShowInDrawer: boolean;
  color?: 'primary' | 'error';
  icon?: React.ReactElement;
  disabled?: boolean;
  type?: string;
  childLinks?: {
    path: string;
    name: string;
    disabled?: boolean;
  }[];
} & LinkType;

type GatsbyImage = {
  childImageSharp: {
    fluid: {
      aspectRatio: number;
      src: string;
      srcSet: string;
      sizes: string;
    };
  };
};

type CoachImages = {
  coachPortrait: GatsbyImage;
  coachIcon: GatsbyImage;
};

export interface HeaderMenuProps {
  homePath: string;
  links: Array<LinkData>;
  switchHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isExpFeatureFlagEnabled?: boolean;
  currentUrl: string;
  isNonProd?: boolean;
  myAccountsUrl?: string;
  coachImages: CoachImages;
  showCoachPopover: boolean;
  toggleCalendlyModal: () => void;
  toggleCoachPopover: (value?: boolean) => void;
  navigate: (path: string) => {};
}

const HeaderMenu = ({
  currentUrl,
  homePath,
  links,
  isNonProd = true,
  switchHandler,
  isExpFeatureFlagEnabled = true,
  myAccountsUrl,
  coachImages,
  toggleCalendlyModal,
  showCoachPopover,
  toggleCoachPopover,
  navigate,
}: HeaderMenuProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleProfileMenuClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handlePhonelineStatus = () => {
    const today = new Date(Date.now());
    const day = today.getDay();
    const time = today.getHours();
    if (day === 0 || day === 6 || time >= 18 || time < 9) {
      return (
        <>
          <Circle data-testid="circle-phoneline-icon" color={theme.palette.error.main} />
          <Availability>We are currently unavailable</Availability>
        </>
      );
    }
    return (
      <>
        <Circle data-testid="circle-phoneline-icon" color={theme.palette.success.main} />
        <Availability>We are open, call us: 020 7189 9999</Availability>
      </>
    );
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

  const renderProfileMenuDropdownLinks = (profileLink: LinkData | undefined) =>
    profileLink?.childLinks?.map((childLink) => (
      <ProfileMenuItem
        tabIndex={0}
        key={`${childLink.name}-Profile-MenuItem`}
        onClick={() => navigate((childLink as LinkWithPath).path as string)}
      >
        <StyledChildNavLink isMobile={isMobile}>{childLink.name}</StyledChildNavLink>
      </ProfileMenuItem>
    ));

  const getOnLinkClick = (link: LinkData) =>
    link.type === 'switch'
      ? (link as LinkWithSwitch).onClick
      : () => navigate((link as LinkWithPath).path as string);

  const styledDivider = (
    <IconGridDivider>
      <Divider orientation="vertical" y={4} />
    </IconGridDivider>
  );

  const renderMyAccountsLink = () => (
    <MyAccountsContainer>
      <RotatedIcon name="upload" />
      <Link color="white" href={myAccountsUrl}>
        Back to old Bestinvest
      </Link>
    </MyAccountsContainer>
  );

  const renderCoachSignpost = () => (
    <CoachIconContainer>
      <ModalContainer>
        {showCoachPopover && (
          <ClickAwayListener mouseEvent="onMouseDown" onClickAway={() => toggleCoachPopover(false)}>
            <CoachingPopover
              image={
                <Img
                  fluid={coachImages.coachPortrait.childImageSharp.fluid}
                  alt="Portrait image of coach"
                />
              }
              onButtonClick={toggleCalendlyModal}
            />
          </ClickAwayListener>
        )}
      </ModalContainer>

      <CoachTextContainer>
        <Typography variant="sh1" color="inherit">
          YOUR COACH
        </Typography>
        <Link
          color="white"
          special
          onClick={() => (isMobile ? toggleCalendlyModal() : toggleCoachPopover())}
        >
          Book an appointment
        </Link>
      </CoachTextContainer>

      <CoachIcon coachIconUrl={coachImages.coachIcon.childImageSharp.fluid.src}>
        <CalendarIcon />
      </CoachIcon>
    </CoachIconContainer>
  );

  const disableableNavLinks = (children: React.ReactNode, index: number, disabled?: boolean) => {
    if (!disabled) {
      return <div key={`enabled-${index}`}>{children}</div>;
    }
    return (
      <DisabledComponent title="Coming soon" key={`disabled-${index}`}>
        {children}
      </DisabledComponent>
    );
  };

  const navLinkWithDropDown = (link: LinkData, mobile: boolean) => (
    <NavLinkWithDropDown
      key={`${link.name}-${mobile ? 'mobile' : 'desktop'}-menu-dropdown`}
      name={link.name}
      type={link.type as string}
      path={(link as LinkWithPath).path}
      childLinks={link.childLinks as NavLinkWithDropDownProps['childLinks']}
      selected={(link as LinkWithPath).path === currentUrl}
      navigate={navigate}
    />
  );

  const menuLink = (link: LinkData) => (
    <NavLink
      onClick={getOnLinkClick(link)}
      selected={(link as LinkWithPath).path === currentUrl}
      isMobile={isMobile}
      key={`${link.name}-desktop-menu`}
      variant="link"
    >
      {link.name}
    </NavLink>
  );

  const drawerLink = (link: LinkData) => (
    <>
      <ListItem
        key={`${link.name}-mobile-menu`}
        onClick={getOnLinkClick(link) as any}
        button={link.type === 'switch' ? false : undefined}
      >
        {!!link.icon && (
          <>
            {link.icon}
            <Spacer x={1} />
          </>
        )}

        <NavLink
          colorShade={link.color === 'error' ? undefined : 'dark2'}
          color={link.color ?? 'primary'}
          selected={(link as LinkWithPath).path === currentUrl}
          isMobile={isMobile}
          key={`${link.name}-mobile-link`}
          variant="link"
        >
          {link.name}
        </NavLink>

        {link.type === 'switch' && (
          <ListItemSecondaryAction key={`${link.name}-mobile-switch`}>
            {renderSwitcher(false, (evt) => getOnLinkClick(link)(evt.target.checked))}
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </>
  );

  const renderDrawerList = () =>
    links
      .filter((link) => link.shouldShowInDrawer)
      .map((link, index) =>
        link.childLinks
          ? disableableNavLinks(navLinkWithDropDown(link, true), index, link.disabled)
          : disableableNavLinks(drawerLink(link), index, link.disabled)
      );

  const renderMenuNavLinks = () =>
    links
      .filter((link) => link.shouldShowInMainMenu)
      .map((link, index) => (
        <Grid
          item
          key={`${(link as LinkWithPath).path || link.name}-menu`}
          {...(link.disabled ? { disabled: true } : {})}
        >
          {link.childLinks
            ? disableableNavLinks(navLinkWithDropDown(link, false), index, link.disabled)
            : disableableNavLinks(menuLink(link), index, link.disabled)}
        </Grid>
      ));

  const renderCashAndInvestActions = (forSubMenu: boolean = true) => {
    const ButtonWrapper = ({ children }: { children: React.ReactElement }) =>
      forSubMenu ? (
        <Grid item container justifyContent="space-between" spacing={2} wrap="nowrap">
          {children}
        </Grid>
      ) : (
        children
      );
    return (
      <>
        <ButtonWrapper>
          <>
            <Grid item>
              <DisabledComponent title="Coming soon">
                <Button
                  data-testid="add cash"
                  color="primary"
                  wrap="nowrap"
                  startIcon={isMobile ? null : <Icon name="plus" />}
                  variant="outlined"
                >
                  Add cash
                </Button>
              </DisabledComponent>
            </Grid>

            <CashAndInvestGrid isMobile={isMobile} {...(isMobile ? { item: true, xs: 9 } : {})}>
              <DisabledComponent title="Coming soon">
                <InvestButton
                  data-testid="invest"
                  color="gradient"
                  variant="contained"
                  {...(isMobile
                    ? {}
                    : {
                        startIcon: <Icon name="investStatistics" />,
                      })}
                  isMobile={isMobile}
                >
                  Invest
                </InvestButton>
              </DisabledComponent>
            </CashAndInvestGrid>
          </>
        </ButtonWrapper>
      </>
    );
  };

  return (
    <Box data-testid="header">
      <StyledAppBar
        data-testid="header-menu"
        color="inherit"
        elevation={0}
        isMobile={isMobile}
        position="relative"
        style={{ zIndex: 1201 }}
      >
        <StyledToolbar variant="dense" isMobile={isMobile}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid container justifyContent="space-between" direction="row" alignItems="center">
              <Grid item xs={2}>
                <Link onClick={navigateHome}>
                  <LogoImage isMobile={isMobile} />
                </Link>
              </Grid>

              {isMobile ? (
                <Grid item xs={9}>
                  <Grid container justifyContent="flex-end">
                    <StyledIconButton
                      edge="start"
                      color="primary"
                      aria-label={!menuOpen ? 'menu' : 'close menu'}
                      onClick={!menuOpen ? handleMenuClick : handleMenuClose}
                    >
                      {!menuOpen ? <MenuIcon /> : <ClearIcon />}
                    </StyledIconButton>

                    <Drawer
                      anchor="right"
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      style={{ zIndex: 1200 }} // Must be inline to override z-index set by MUI modal JS
                    >
                      <DrawerContainer>
                        {isExpFeatureFlagEnabled ? (
                          <StyledSubHeader>{renderCoachSignpost()}</StyledSubHeader>
                        ) : null}

                        <DisabledComponent title="Coming soon">
                          <StyledInputBase
                            placeholder="Markets, products, stocks"
                            startAdornment={
                              <InputAdornment position="start">
                                <Icon name="search" color="disabled" />
                              </InputAdornment>
                            }
                          />
                        </DisabledComponent>

                        <StyledMobileMenuList isExpFeatureFlagEnabled={isExpFeatureFlagEnabled}>
                          {isNonProd && (
                            <SwitcherLabel
                              labelPlacement="start"
                              control={<Box ml={1}>{renderSwitcher(true, switchHandler)}</Box>}
                              label="Experimental Features"
                            />
                          )}

                          {renderDrawerList()}
                        </StyledMobileMenuList>

                        <DrawerFooterContainer>
                          {renderCashAndInvestActions()}
                          <CallContainer>
                            {handlePhonelineStatus()}
                            <CallBack>
                              <DisabledComponent title="Coming soon">
                                <StyledCallBackLink>Request a callback</StyledCallBackLink>
                              </DisabledComponent>
                            </CallBack>
                          </CallContainer>
                        </DrawerFooterContainer>
                      </DrawerContainer>
                    </Drawer>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent="space-between"
                  xs={10}
                  wrap="nowrap"
                >
                  <StyledMenuNavGrid item container justifyContent="flex-start" wrap="nowrap">
                    {renderMenuNavLinks()}
                  </StyledMenuNavGrid>

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

                    {styledDivider}

                    <Grid item>
                      <DisabledComponent title="Coming soon">
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          variant={undefined}
                          color="primary"
                          aria-label="list"
                          // onClick={handleProfileMenuClick} // To be added
                        >
                          <Icon name="list" />
                        </Button>
                      </DisabledComponent>
                    </Grid>

                    {styledDivider}

                    <Grid item>
                      <DisabledComponent title="Coming soon">
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          variant={undefined}
                          color="primary"
                          aria-label="search"
                          // onClick={handleProfileMenuClick} // To be added
                        >
                          <Icon name="search" />
                        </Button>
                      </DisabledComponent>
                    </Grid>

                    {styledDivider}

                    <Grid item>
                      <DisabledComponent title="Coming soon">
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          variant={undefined}
                          color="primary"
                          aria-label="shopping-cart"
                          // onClick={handleProfileMenuClick}  // To be added
                        >
                          <Icon name="cart" />
                        </Button>
                      </DisabledComponent>
                    </Grid>

                    {styledDivider}

                    <Grid item>
                      <Button
                        data-testid="profile"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        variant={undefined}
                        color="primary"
                        aria-label="profile"
                        onClick={handleProfileMenuClick}
                      >
                        <Icon name="account" />
                      </Button>
                    </Grid>

                    {profileMenuOpen && (
                      <StyledProfileList profileMenuOpen={profileMenuOpen}>
                        {renderProfileMenuDropdownLinks(
                          links?.find((linkItem) => linkItem.name === 'Profile')
                        )}
                      </StyledProfileList>
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </StyledToolbar>

        {isExpFeatureFlagEnabled ? (
          <>
            {isMobile ? (
              !menuOpen && (
                <StyledSubHeader isMobile={isMobile}>
                  <Grid item container justifyContent="center">
                    {renderMyAccountsLink()}
                  </Grid>
                </StyledSubHeader>
              )
            ) : (
              <StyledSubHeader isMobile={isMobile}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>{renderMyAccountsLink()}</Grid>

                  <Grid item>
                    {isNonProd && (
                      <SwitcherLabel
                        labelPlacement="start"
                        control={<Box ml={1}>{renderSwitcher(true, switchHandler)}</Box>}
                        label="Experimental Features"
                      />
                    )}
                  </Grid>

                  <Grid item>{renderCoachSignpost()}</Grid>
                </Grid>
              </StyledSubHeader>
            )}
          </>
        ) : (
          !isMobile && (
            <SubHeader style={{ minHeight: '80px' }}>
              <Grid container justifyContent="space-between" alignItems="center">
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
                  <Button color="primary" variant="outlined" href={myAccountsUrl}>
                    My Accounts Login
                  </Button>
                </Grid>
              </Grid>
            </SubHeader>
          )
        )}
      </StyledAppBar>
    </Box>
  );
};

export default HeaderMenu;
