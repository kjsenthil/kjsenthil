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
    border-radius: 16px;
    border: 1px solid ${theme.palette.grey['200']};
    box-shadow: none;
    display: flex;
    flex-direction: ${isMobile ? 'column' : 'row'};
  `}
`;
