import React from 'react';
import {
  Box,
  Divider,
  Spacer,
  Typography,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from '../../atoms';
import { HeaderMenu, Footer } from '../../organisms';
import { HeaderMenuProps } from '../../organisms/HeaderMenu';
import { useBasicInfo, BasicInfo } from '../../../hooks';
import LayoutContainer from '../LayoutContainer';

interface PageHeading {
  primary: string;
  secondary: string;
  tertiary?: string;
}

export interface MyAccountLayoutProps {
  children: React.ReactNode;
  heading?: (basicInfo: BasicInfo) => PageHeading;
  headerProps?: Omit<HeaderMenuProps, 'profileName'>;
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

const MyAccountLayout = ({ children, heading, headerProps = {} }: MyAccountLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm' as any));
  const basicInfo = useBasicInfo();

  return (
    <LayoutContainer maxWidth="lg" disableGutters>
      <HeaderMenu {...headerProps} profileName={`${basicInfo.firstName} ${basicInfo.lastName}`} />
      {basicInfo.isLoading ? (
        <LinearProgress color="primary" />
      ) : (
        <Box px={isMobile ? 3 : 10} py={5}>
          {heading && (
            <>
              <Heading {...heading(basicInfo)} />
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
