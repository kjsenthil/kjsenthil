import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Typography, Spacer } from '../../atoms';
import { HeaderMenu } from '../../organisms';

interface MyAccountLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  stretch?: boolean;
}

const Body = styled(Grid)`
  padding-top: 16px;
  margin: 0 auto;
`;

const UpperCaseText = styled(Typography)`
  text-transform: uppercase;
`;

const PageTitle = ({ title }: { title: string }) => (
  <>
    <UpperCaseText variant="h5" align="center">
      {title}
    </UpperCaseText>
    <Spacer y={4} />
  </>
);

const MyAccountLayout = ({ children, pageTitle, stretch = false }: MyAccountLayoutProps) => (
  <Container>
    <HeaderMenu />
    <Body item xs={12} sm={stretch ? 12 : 6}>
      {pageTitle && <PageTitle title={pageTitle} />}
      {children}
    </Body>
  </Container>
);

export default MyAccountLayout;
