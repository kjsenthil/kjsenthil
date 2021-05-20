import React from 'react';
import { Box, Divider, Spacer, Typography } from '../../atoms';
import { HeaderMenu, Footer } from '../../organisms';
import CustomContainer from './MyAccountLayout.styles';

interface PageHeading {
  primary: string;
  secondary: string;
  tertiary?: string;
}
export interface MyAccountLayoutProps {
  children: React.ReactNode;
  heading?: PageHeading;
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

const MyAccountLayout = ({ children, heading }: MyAccountLayoutProps) => (
  <CustomContainer maxWidth="lg" disableGutters>
    <HeaderMenu profileName="Profile Name" />
    <Box px={10} py={5}>
      {heading && (
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
  </CustomContainer>
);

export default MyAccountLayout;
