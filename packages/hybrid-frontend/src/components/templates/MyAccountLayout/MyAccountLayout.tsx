import React from 'react';
import { navigate } from 'gatsby';
import { useDispatch } from 'react-redux';
import { useLocation } from '@reach/router';
import {
  Box,
  CurrencyPresentationVariant,
  Divider,
  Footer,
  HeaderMenu,
  HeaderMenuProps,
  Icon,
  LinearProgress,
  OldHeaderMenu,
  OldHeaderMenuProps,
  Spacer,
  StickyHeader,
  Typography,
  formatCurrency,
  useMediaQuery,
  useTheme,
} from '@tswdts/react-components';
import { BasicInfo, useCoachImages, useFeatureFlagToggle, useStickyRef } from '../../../hooks';
import LayoutContainer from '../LayoutContainer';
import { NavPaths } from '../../../config/paths';
import { MYACCOUNTS_HOME_URL, ACTIVE_ENV } from '../../../config';
import { FeatureFlagNames } from '../../../constants';
import { setFeatureToggleFlag } from '../../../services/featureToggle';

interface PageHeading {
  primary: string;
  secondary: string;
  tertiary?: string;
}

export interface MyAccountLayoutProps {
  children: React.ReactNode;
  basicInfo: BasicInfo;
  isLoading?: boolean;
  heading?: PageHeading;
  headerProps?: Omit<HeaderMenuProps, 'cash'>;
  oldHeaderProps?: Omit<OldHeaderMenuProps, 'cash'>;
  accountDetailsMenu?: React.ReactNode;
  stickyHeaderChildComponent?: React.ReactNode;
}

const MyAccountLayout = ({
  children,
  basicInfo,
  heading,
  isLoading,
  headerProps,
  oldHeaderProps,
  accountDetailsMenu,
  stickyHeaderChildComponent,
}: MyAccountLayoutProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const expFeatureFlag = useFeatureFlagToggle(FeatureFlagNames.EXP_FEATURE);
  const currentUrl = useLocation().pathname;
  const { stickyEnabled, stickyRef } = useStickyRef();
  const coachImages = useCoachImages();

  const expFeatureSwitch = (isEnabled: boolean) => {
    dispatch(setFeatureToggleFlag({ name: FeatureFlagNames.EXP_FEATURE, isEnabled }));
  };

  const switchHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    expFeatureSwitch(evt.target.checked);
  };

  const Heading = ({ primary, secondary, tertiary }: PageHeading) => (
    <div data-testid="page-heading">
      <Typography variant="h2">{secondary}</Typography>
      <Typography variant="h1">{primary}</Typography>
      {tertiary && (
        <Typography variant="h4" color="grey" colorShade="dark1" fontWeight="bold">
          {tertiary}
        </Typography>
      )}
      <div ref={stickyRef} />
    </div>
  );

  return (
    <LayoutContainer maxWidth="lg" disableGutters>
      {expFeatureFlag?.isEnabled ? (
        <HeaderMenu
          {...headerProps}
          isExpFeatureFlagEnabled={expFeatureFlag?.isEnabled}
          isNonProd={ACTIVE_ENV !== 'production'}
          homePath={NavPaths.MY_ACCOUNT_BASE_URL}
          currentUrl={currentUrl}
          switchHandler={switchHandler}
          myAccountsUrl={MYACCOUNTS_HOME_URL}
          coachImages={coachImages}
          navigate={navigate}
          links={[
            {
              name: 'Investments',
              path: NavPaths.MY_ACCOUNT_BASE_URL,
              shouldShowInDrawer: true,
              shouldShowInMainMenu: true,
              type: 'link',
              childLinks: [
                {
                  name: 'Stocks & Shares ISA',
                  path: '/test1',
                  disabled: true,
                },
                {
                  name: 'Self-invested Personal Pension',
                  path: '/test2',
                  disabled: true,
                },
                {
                  name: 'Investment accounts',
                  path: '/test3',
                  disabled: true,
                },
              ],
            },
            {
              name: 'Life plan',
              path: NavPaths.LIFE_PLAN_PAGE,
              shouldShowInDrawer: true,
              shouldShowInMainMenu: true,
            },
            {
              name: 'Documents',
              path: '/documents',
              shouldShowInDrawer: true,
              shouldShowInMainMenu: true,
              disabled: true,
            },
            {
              name: 'Help & Support',
              path: '/help-and-support',
              shouldShowInDrawer: true,
              shouldShowInMainMenu: true,
              disabled: true,
            },
            {
              name: 'Profile', // The last link should be profile
              path: '/profile',
              shouldShowInDrawer: true,
              shouldShowInMainMenu: false,
              childLinks: [
                {
                  name: 'Logout',
                  path: '/logout',
                },
              ],
            },
          ]}
        />
      ) : (
        <OldHeaderMenu
          {...oldHeaderProps}
          isExpFeatureFlagEnabled={expFeatureFlag?.isEnabled}
          homePath={NavPaths.MY_ACCOUNT_BASE_URL}
          cash={formatCurrency(
            basicInfo.totalInvestableCash,
            CurrencyPresentationVariant.ACTUAL_TOPLINE
          )}
          currentUrl={currentUrl}
          switchHandler={switchHandler}
          isNonProd={ACTIVE_ENV !== 'production'}
          myAccountsUrl={MYACCOUNTS_HOME_URL}
          links={[
            {
              name: 'Investment',
              path: NavPaths.MY_ACCOUNT_BASE_URL,
              shouldShowInDrawer: true,
              shouldShowInMainMenu: true,
            },
            {
              name: 'Life plan',
              path: NavPaths.LIFE_PLAN_PAGE,
              shouldShowInDrawer: true,
              shouldShowInMainMenu: true,
            },
            { name: 'My accounts login', path: MYACCOUNTS_HOME_URL, shouldShowInDrawer: true },
            {
              name: 'Experimental features',
              type: 'switch',
              onClick: expFeatureSwitch,
              shouldShowInDrawer: true,
              shouldDisplayInNonProdOnly: true,
            },
            {
              name: 'Logout',
              path: NavPaths.LOGOUT_PAGE,
              shouldShowInDrawer: true,
              shouldShowInDropdownMenu: true,
              color: 'error',
              icon: <Icon name="exit" color="error" />,
            },
          ]}
        />
      )}

      {stickyEnabled && stickyHeaderChildComponent && (
        <StickyHeader>{stickyHeaderChildComponent}</StickyHeader>
      )}

      {accountDetailsMenu}
      {basicInfo.isLoading || isLoading ? (
        <LinearProgress color="primary" />
      ) : (
        <Box px={isMobile ? 3 : 10} py={9}>
          {(!!heading && (
            <>
              <Heading {...heading} />
              <Spacer y={6} />
            </>
          )) || <div ref={stickyRef} />}

          {children}
          <Spacer y={3} />
          <Divider y={6} />
          <Footer />
        </Box>
      )}
    </LayoutContainer>
  );
};

export default MyAccountLayout;
