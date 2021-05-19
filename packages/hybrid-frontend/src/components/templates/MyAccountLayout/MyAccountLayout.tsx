import React from 'react';
import { Box, Spacer } from '../../atoms';
import { HeaderMenu } from '../../organisms';
import Footer from '../../organisms/Footer/Footer';
import CustomContainer from './MyAccountLayout.styles';

interface MyAccountLayoutProps {
  children: React.ReactNode;
}

const MyAccountLayout = ({ children }: MyAccountLayoutProps) => (
  <CustomContainer maxWidth="lg" disableGutters>
    <HeaderMenu profileName="Profile Name" />
    <Box p={10}>
      {children}
      <Spacer y={3} />
      <Footer />
    </Box>
  </CustomContainer>
);

export default MyAccountLayout;
