import React from 'react';
import styled from 'styled-components';
import { Theme } from '@material-ui/core';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import { Button, Icon, Spacer, Typography } from '@tswdts/react-components';
import { LayoutContainer } from '../../templates';
import { NavPaths } from '../../../config';

export const NotFoundStyle = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: grid;
    justify-items: center;
    row-gap: ${theme.spacing(2.5)}px;
    
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`;

const NotFoundPage: React.FC<RouteComponentProps> = () => {
  const navigateHome = () => navigate(NavPaths.MY_ACCOUNT_BASE_URL);

  return (
    <LayoutContainer maxWidth={false} disableGutters>
      <NotFoundStyle>
        <Icon name="warningSymbolCircle" />

        <Typography variant="h1" color="primary" colorShade="dark2">
          Error 404
        </Typography>

        <Typography variant="sh1" color="primary" colorShade="dark2">
          The page you requested cannot be found
        </Typography>

        <Spacer />

        <Button
          color="gradient"
          startIcon={<Icon name="home" />}
          variant="contained"
          onClick={navigateHome}
        >
          Back Home
        </Button>
      </NotFoundStyle>
    </LayoutContainer>
  );
};

export default NotFoundPage;
