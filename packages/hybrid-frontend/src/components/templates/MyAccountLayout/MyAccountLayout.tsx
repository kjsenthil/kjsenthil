import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { useDispatch } from 'react-redux';
import { useLocation } from '@reach/router';
import {
  Box,
  CalendlyModal,
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
  UpsellCard,
  Button,
  ButtonProps,
} from '@tswdts/react-components';
import { BasicInfo, useCoachImages, useFeatureFlagToggle, useStickyRef } from '../../../hooks';
import LayoutContainer from '../LayoutContainer';
import { NavPaths } from '../../../config/paths';
import {
  ACTIVE_ENV,
  BESTINVEST_PLUS_URL,
  CALENDLY_URL,
  MYACCOUNTS_HOME_URL,
} from '../../../config';
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
  const [showCoachPopover, setShowCoachPopover] = useState(false);
  const [showCalendlyDialog, setShowCalendlyDialog] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowCoachPopover(false);
    }
  }, [isMobile]);

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

  const { firstName, lastName } = basicInfo;
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : undefined;

  const toggleCalendlyModal = () => {
    setShowCoachPopover(false);
    setShowCalendlyDialog(!showCalendlyDialog);
  };

  const toggleCoachPopover = (value?: boolean) => {
    if (value !== undefined) {
      setShowCoachPopover(value);
    } else {
      setShowCoachPopover(!showCoachPopover);
    }
  };

  const upsellButtonProps: Partial<ButtonProps> = expFeatureFlag?.isEnabled
    ? { onClick: toggleCalendlyModal, href: undefined }
    : { onClick: undefined, href: BESTINVEST_PLUS_URL };

  return (
    <>
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
            toggleCalendlyModal={toggleCalendlyModal}
            showCoachPopover={showCoachPopover}
            toggleCoachPopover={toggleCoachPopover}
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
                    path: NavPaths.LOGOUT_PAGE,
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
            <Spacer y={5} />

            <UpsellCard title="Speak to a coach" respondTo="sm" background="triangle-overlay">
              <Typography color="white" fontWeight="600" variant="b2">
                Not sure about putting your plan into action? Don&apos;t worry.
                <br />
                Our experienced, friendly coaches can talk through your goal with you and take a
                look at your different options.
              </Typography>
              <Button wrap="nowrap" color="white" variant="contained" {...upsellButtonProps}>
                Book appointment
              </Button>
            </UpsellCard>
            <Spacer y={3} />
            <Divider y={6} />
            <Footer />
          </Box>
        )}
      </LayoutContainer>
      <CalendlyModal
        calendlyUrl={CALENDLY_URL}
        open={showCalendlyDialog}
        prefill={{
          name: fullName,
        }}
        onClose={toggleCalendlyModal}
      />
    </>
  );
};

export default MyAccountLayout;
