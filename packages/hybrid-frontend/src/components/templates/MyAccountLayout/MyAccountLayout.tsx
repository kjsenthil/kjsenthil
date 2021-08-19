import React from 'react';
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
  Spacer,
  Typography,
  formatCurrency,
  useMediaQuery,
  useTheme,
} from '@tsw/react-components';
import { BasicInfo, useFeatureFlagToggle } from '../../../hooks';
import LayoutContainer from '../LayoutContainer';
import { NavPaths } from '../../../config/paths';
import { ACTIVE_ENV, MYACCOUNTS_HOME_URL } from '../../../config';
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
  accountDetailsMenu?: React.ReactNode;
}

const Heading = ({ primary, secondary, tertiary }: PageHeading) => (
  <div data-testid="page-heading">
    <Typography variant="h2">{secondary}</Typography>
    <Typography variant="h1">{primary}</Typography>
    {tertiary && (
      <Typography variant="h4" color="grey" colorShade="dark1" fontWeight="bold">
        {tertiary}
      </Typography>
    )}
  </div>
);

const MyAccountLayout = ({
  children,
  basicInfo,
  heading,
  isLoading,
  headerProps,
  accountDetailsMenu,
}: MyAccountLayoutProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const expFeatureFlag = useFeatureFlagToggle(FeatureFlagNames.EXP_FEATURE);
  const currentUrl = useLocation().pathname;

  const expFeatureSwitch = (isEnabled: boolean) => {
    dispatch(setFeatureToggleFlag({ name: FeatureFlagNames.EXP_FEATURE, isEnabled }));
  };

  return (
    <LayoutContainer maxWidth="lg" disableGutters>
      <HeaderMenu
        {...headerProps}
        isExpFeatureFlagEnabled={expFeatureFlag?.isEnabled}
        homePath={NavPaths.MY_ACCOUNT_BASE_URL}
        cash={formatCurrency(
          basicInfo.totalInvestableCash,
          CurrencyPresentationVariant.ACTUAL_TOPLINE
        )}
        currentUrl={currentUrl}
        expFeatureSwitch={expFeatureSwitch}
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
      {accountDetailsMenu}
      {basicInfo.isLoading || isLoading ? (
        <LinearProgress color="primary" />
      ) : (
        <Box px={isMobile ? 3 : 10} py={5}>
          {!!heading && (
            <>
              <Heading {...heading} />
              <Spacer y={6} />
            </>
          )}
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
