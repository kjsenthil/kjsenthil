import styled, { css } from 'styled-components';
import { MainCard, Theme } from '@tswdts/react-components';
import React from 'react';

export const StyledAccountsTableCard = styled(({ theme, ...props }) => <MainCard {...props} />)`
  ${({ theme }: { background: string; theme: Theme }) => css`
    box-shadow: none;
    background-color: ${theme.palette.background.layout};
    padding: ${theme.spacing(0.25)}px 0;
  `}
`;

export const StyledPerformanceChartCard = styled(({ theme, isMobile, ...props }) => (
  <MainCard {...props} />
))`
  ${({ theme, isMobile }: { theme: Theme; isMobile: boolean }) => css`
    box-shadow: none;
    border: 1px solid ${theme.palette.grey['200']};

    padding-top: ${theme.spacing(2)}px;
    padding-bottom: ${theme.spacing(isMobile ? 1 : 2.5)}px;
    padding-left: ${theme.spacing(2.5)}px;
    padding-right: ${theme.spacing(2.5)}px;
  `}
`;
