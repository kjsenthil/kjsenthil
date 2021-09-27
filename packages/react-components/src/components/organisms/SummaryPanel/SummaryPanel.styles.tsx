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

export const SummaryCard = styled(({ isMobile, ...props }) => <Card {...props} />)`
  ${({ isMobile, theme }: StyleProps) => css`
    padding: ${theme.spacing(isMobile ? 0 : 3)}px ${theme.spacing(isMobile ? 2.5 : 5)}px;
    background-color: ${theme.palette.background.paper};
    border: solid 1px ${theme.palette.grey[200]};
    box-shadow: none;
    border-radius: 16px;
  `}
`;

export const SummaryCardContent = styled(({ ...props }) => <Grid {...props} />)`
  ${({ theme }: StyleProps) => css`
    padding-top: ${theme.spacing(0)}px;
    padding-bottom: ${theme.spacing(0)}px;
  `}
`;

export const SummaryCardCell = styled(({ ...props }) => <Grid {...props} />)`
  ${({ theme }: StyleProps) => css`
    padding-top: ${theme.spacing(1.5)}px;
    padding-bottom: ${theme.spacing(0)}px;
  `}
`;

export default SummaryWrapper;
