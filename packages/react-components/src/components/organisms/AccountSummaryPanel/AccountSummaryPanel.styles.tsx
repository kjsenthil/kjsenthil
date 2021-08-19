import * as React from 'react';
import styled from 'styled-components';
import { Grid, Card } from '../../atoms';

export const SummaryOfTotalsWrapper = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => `
    display: flex;
    flex-direction: ${isMobile ? 'column' : 'row'};
    align-items: center;
  `}
`;

export const SummaryCard = styled(Card)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px;
    background-color:  ${theme.palette.background.paper};
    border: 1px solid ${theme.palette.grey.light1};
    box-shadow: none;
    border-radius: 16px;
  `}
`;
