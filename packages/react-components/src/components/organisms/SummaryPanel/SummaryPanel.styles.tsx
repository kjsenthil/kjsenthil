import * as React from 'react';
import styled, { css } from 'styled-components';
import { Grid, Card, Theme } from '../../atoms';

interface StyleProps {
  isMobile?: boolean;
  theme: Theme;
}
const SummaryWrapper = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ isMobile }: StyleProps) => css`
    display: flex;
    flex-direction: ${isMobile ? 'column' : 'row'};
  `}
`;

export const SummaryOfTotalsWrapper = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ isMobile }: StyleProps) => css`
    display: flex;
    flex-direction: ${isMobile ? 'column' : 'row'};
  `}
`;

export const SummaryCard = styled(Card)`
  ${({ isMobile, theme }: StyleProps) => css`
    padding: ${theme.spacing(3)}px ${theme.spacing(isMobile ? 3 : 5)}px;
    background-color: ${theme.palette.background.paper};
    border: solid 1px ${theme.palette.grey[200]};
    box-shadow: none;
    border-radius: 16px;
  `}
`;

export default SummaryWrapper;
