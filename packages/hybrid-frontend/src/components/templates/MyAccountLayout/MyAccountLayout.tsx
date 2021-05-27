import React from 'react';
import { Box, Divider, Spacer, Typography } from '../../atoms';
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
  const basicInfo = useBasicInfo();

  return basicInfo.isLoading ? (
    <div>Loading...</div>
  ) : (
    <LayoutContainer maxWidth="lg" disableGutters>
      <HeaderMenu {...headerProps} profileName={`${basicInfo.firstName} ${basicInfo.lastName}`} />
      <Box px={10} py={5}>
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
    </LayoutContainer>
  );
};

export default MyAccountLayout;
