import * as React from 'react';
import styled from 'styled-components';
import { Grid, Card } from '../../atoms';

export const SummaryWrapper = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => `
    display: flex;
    flex-direction: ${isMobile ? 'column' : 'row'};
  `}
`;
export const SummaryOfTotalsWrapper = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => `
    display: flex;
    flex-direction: ${isMobile ? 'column' : 'row'};
  `}
`;

export const SummaryCard = styled(Card)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px;
    background-color:  ${theme.palette.background.paper};
    box-shadow: 1px 2px 44px 0 rgba(139,139,139,0.26);
    border-radius: 16px;
  `}
`;
