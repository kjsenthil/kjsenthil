import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Card, Theme } from '../../atoms';

const shine = keyframes`
    to {
      background-position-x: -200%;
    }
`;

export const CardContainer = styled(({ isLoading, isMobile, ...props }) => <Card {...props} />)`
  ${({
    isLoading,
    isMobile,
    theme,
  }: {
    isLoading: boolean;
    isMobile: boolean;
    theme: Theme;
  }) => css`
    padding: ${theme.spacing(isMobile ? 3 : 5)}px;
    background-color: ${theme.palette.background.paper};
    box-shadow: 1px 2px 44px 0 rgba(139, 139, 139, 0.26);
    border-radius: 16px;
    ${isLoading &&
    css`
      background: linear-gradient(
        73deg,
        #f9f9ff 46%,
        ${theme.palette.common.white} 56%,
        #f9f9ff 46%
      );
      background-size: 200% 100%;
      animation: 1.5s ${shine} linear infinite;
    `}
  `}
`;

export const ActionElementContainer = styled.div`
  max-width: 50%;
`;
