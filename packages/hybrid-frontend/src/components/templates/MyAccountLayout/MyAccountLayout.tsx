import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from '@reach/router';
import {
  Box,
  Divider,
  Icon,
  Spacer,
  Typography,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from '../../atoms';
import { HeaderMenu, Footer } from '../../organisms';
import { HeaderMenuProps } from '../../organisms/HeaderMenu';
import { useFeatureFlagToggle, BasicInfo } from '../../../hooks';
import LayoutContainer from '../LayoutContainer';
import { formatCurrency } from '../../../utils/formatters';
import { NavPaths } from '../../../config/paths';
import { MYACCOUNTS_HOME_URL } from '../../../config';
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
}: MyAccountLayoutProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm' as any));
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
        homePath={NavPaths.HOME_PAGE}
        cash={formatCurrency(basicInfo.totalInvestableCash)}
        currentUrl={currentUrl}
        expFeatureSwitch={expFeatureSwitch}
        links={[
          {
            name: 'Investment',
            path: NavPaths.ACCOUNTS_PAGE,
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
