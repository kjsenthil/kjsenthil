import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Card, Theme } from '../../atoms';

const shine = keyframes`
    to {
      background-position-x: -200%;
    }
`;

export const UpsellCardContainer = styled(({ isLoading, isMobile, theme, ...props }) => (
  <Card {...props} />
))`
  ${({
    isLoading,
    isMobile,
    theme,
  }: {
    isLoading: boolean;
    isMobile: boolean;
    background: string;
    theme: Theme;
  }) => css`
    position: relative;
    min-height: ${isMobile ? 292 : 205}px;
    max-width: ${isMobile ? 335 : 1240}px;
    padding: ${theme.spacing(isMobile ? 2.5 : 3)}px ${theme.spacing(isMobile ? 2.5 : 5)}px;
    padding-right: ${isMobile && 47}px;
    box-shadow: 1px 2px 44px 0 rgba(139, 139, 139, 0.26);
    border-radius: 16px;
    border-top-left-radius: ${isMobile ? 16 : 0}px;
    color: white;
    background-image: linear-gradient(260deg, #af61fe, #7024fc 90%),
      linear-gradient(261deg, #6a29ff, #5206a9);
    gap: ${theme.spacing(5)}px;
    p {
      font-size: ${isMobile ? 16 : 15}px;
      line-height: ${isMobile ? 24 : 20}px;
      letter-spacing: ${isMobile ? 0.3 : 0.2}px;
      font-weight: ${isMobile ? 400 : 600};
      margin: 11px 0 21px 0;
    }
    button {
      margin-bottom: 1px;
    }
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

export const OverlayTriangle = styled(({ top, width, angle, ...props }) => <div {...props} />)`
  ${({ top, width, angle }: { top: string; width: string; angle: string }) => css`
    z-index: 0;
    display: block;
    transform: scaleX(-1);
    position: absolute;
    padding: 0;
    bottom: 0;
    margin-left: -40px;
    border-bottom-right-radius: 16px;
    border-top-left-radius: 26px;
    opacity: 0.4;
    top: ${top};
    width: ${width};
    background-image: linear-gradient(247deg, #a993eb ${angle}, transparent 2%);
  `}
`;

export const TitleContainer = styled.h3`
  ${({ isMobile }: { isMobile: boolean }) => `
    color: white;
    font-weight: 700;
    font-size: ${isMobile ? 18 : 26}px;
    line-height: ${isMobile ? 28 : 32}px;
    letter-spacing: ${isMobile ? 0.3 : 0.4}px;
    padding: 0;
    margin: 0;
    z-Index: 10;
  `}
`;

export const ActionElementContainer = styled.div`
  max-width: 50%;
`;
