import * as React from 'react';
import styled from 'styled-components';
import { Theme } from '@material-ui/core';
import { Grid, Card } from '../../atoms';

export const SummaryOfTotalsWrapper = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => `
    display: flex;
    flex-direction: ${isMobile ? 'column' : 'row'};
    align-items: center;
  `}
`;

export const SummaryCard = styled(({ isMobile, ...props }) => <Card {...props} />)`
  ${({ theme, isMobile }: { isMobile: boolean; theme: Theme }) => `
    padding: ${theme.spacing(3)}px;
    background-color:  ${theme.palette.background.paper};
    box-shadow: 1px 2px 44px 0 rgba(139, 139, 139, 0.26);
    border-radius: 16px;
    display: flex;
    flex-direction: ${isMobile ? 'column' : 'row'};
  `}
`;
