import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Theme, Typography, Grid } from '../../atoms';
import { SubHeader } from '..';

interface SplashHeaderStyleProps {
  theme: Theme;
  isMobile: boolean;
}

const shine = keyframes`
    to {
      background-position-x: -200%;
    }
`;

export const StyledSplashHeader = styled(({ isLoading, isMobile, ...props }) => (
  <SubHeader {...props} />
))`
  ${({
    theme,
    isMobile,
    isLoading,
  }: SplashHeaderStyleProps & {
    isLoading: boolean;
  }) => css`
    background: ${isMobile
      ? `linear-gradient(210deg, #af61fe 20%, #7024fc 75%)`
      : `linear-gradient(267deg, #af61fe 20%, #7024fc 75%)`};
    color: ${theme.palette.background.default};
    height: ${isMobile ? '500px' : '305px'};
    overflow: hidden;

    max-width: 1440px;
    ${isMobile
      ? `
        padding: ${theme.typography.pxToRem(24)} ${theme.typography.pxToRem(20)};
        align-items: normal;
      `
      : `
        padding-left: ${theme.typography.pxToRem(100)};
      `}
    ${isLoading &&
    css`
      background: linear-gradient(260deg, #af61fe, #7024fc 90%),
        linear-gradient(261deg, #6a29ff, #5206a9);
      background-size: 200% 100%;
      opacity: 0.1;
      animation: 1.5s ${shine} linear infinite;
    `}
  `}
`;

export const StyledTextContainer = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ isMobile }: SplashHeaderStyleProps) => css`
    ${!isMobile &&
    `
      max-width: 620px;
      align-self: center;
    `}
  `}
`;
export const StyledImageContainer = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ theme, isMobile }: SplashHeaderStyleProps) => css`
    ${isMobile
      ? `
      text-align: center;
      margin-bottom: ${theme.typography.pxToRem(25)}
    `
      : `margin-top: ${theme.typography.pxToRem(95)}`}
  `}
`;

export const StyledImage = styled.img`
  ${({ isMobile }: SplashHeaderStyleProps) => css`
    width: ${isMobile ? '100%' : '560px'};
    height: ${isMobile ? 'auto' : '350px'};
    ${isMobile &&
    `
      max-width: 404px
    `}
  `}
`;

export const StyledHeading = styled(({ isMobile, ...props }) => <Typography {...props} />)`
  ${({ theme, isMobile }: SplashHeaderStyleProps) => css`
    margin-bottom: ${isMobile
      ? `${theme.typography.pxToRem(8)};`
      : `${theme.typography.pxToRem(16)};`};
  `}
`;

export const StyledSubHeading = styled(({ isMobile, ...props }) => <Typography {...props} />)`
  ${({ theme, isMobile }: SplashHeaderStyleProps) => css`
    margin-bottom: ${isMobile
      ? `${theme.typography.pxToRem(20)};`
      : `${theme.typography.pxToRem(24)};`};
  `}
`;
