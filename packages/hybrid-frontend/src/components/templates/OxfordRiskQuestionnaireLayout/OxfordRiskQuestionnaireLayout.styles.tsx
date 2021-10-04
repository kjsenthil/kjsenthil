import React from 'react';
import { Theme } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Button, Link } from '@tswdts/react-components/src/components/atoms/';

export const LeftContentContainer = styled(({ theme, isMobile, ...props }) => <div {...props} />)`
  ${({ theme, isMobile }: { theme: Theme; isMobile: boolean }) => css`
    height: 100%;
    background-color: ${theme.palette.background.layout};
    display: flex;
    flex-direction: column;
    padding-top: 7.8%;
    padding-left: ${isMobile ? '5.3%' : '9.8%'};
    padding-right: ${isMobile ? '5.3%' : '11.6%'};
  `}
`;

export const BestInvestLogo = styled.div`
  background-image: url('/PurpleBestInvest.svg');
  background-repeat: no-repeat;
  background-size: contain;
  height: 37px;
  width: 124px;
  }
`;

export const ButtonContainer = styled(({ arrangement, isMobile, ...props }) => <div {...props} />)`
  ${({ arrangement, isMobile }: { arrangement: string; isMobile: boolean }) => css`
    display: flex;
    flex-direction: ${isMobile ? 'column' : 'row'};
    flex-flow: ${isMobile ? 'column-reverse' : null};
    justify-content: ${arrangement};
    align-items: center;
    position: relative;
    top: ${isMobile ? '3%' : '20%'};
  `}
`;

export const StyledButton = styled(({ width, right, ...props }) => <Button {...props} />)`
  ${({
    width,
    theme: {
      typography: { pxToRem },
    },
  }: {
    width: number;
    left: string;
    theme: Theme;
  }) => css`
    width: ${pxToRem(width)};
    margin-top: ${pxToRem(15)};
  `}
`;

export const RightContentContainer = styled.div`
  height: 100%;
  background: linear-gradient(213deg, #af61fe 11%, #7024fc 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OverlayTriangle = styled(({ left, bottom, height, width, angle, ...props }) => (
  <div {...props} />
))`
  ${({
    left,
    bottom,
    height,
    width,
    angle,
  }: {
    left: string;
    bottom: string;
    height: string;
    width: string;
    angle: string;
  }) => css`
    z-index: 0;
    display: block;
    transform: scaleX(-1);
    position: absolute;
    padding: 0;
    border-bottom-right-radius: 16px;
    border-top-left-radius: 26px;
    opacity: 0.4;
    left: ${left};
    bottom: ${bottom};
    height: ${height};
    width: ${width};
    background-image: linear-gradient(247deg, #a993eb ${angle}, transparent 2%);
  `}
`;

export const OverlayDotPattern = styled(({ height, width, top, right, ...props }) => (
  <div {...props} />
))`
  ${({
    height,
    width,
    top,
    right,
  }: {
    height: string;
    width: string;
    top: string;
    right: string;
  }) => css`
    background-image: radial-gradient(white 15%, transparent 20%);
    background-position: 0 0;
    background-size: 20px 20px;
    height: ${height};
    width: ${width};
    position: absolute;
    top: ${top};
    right: ${right};
    opacity: 20%;
    -webkit-mask-image: -webkit-gradient(
      linear,
      left bottom,
      right top,
      color-stop(1, rgba(0, 0, 0, 1)),
      color-stop(0, rgba(0, 0, 0, 0))
    );
  `}
`;

export const CardContainer = styled.div`
  width: 72.4%;
  z-index: 1;
`;

export const SaveAndExitLink = styled(({ theme, isMobile, ...props }) => <Link {...props} />)`
  ${({ theme, isMobile }: { theme: Theme; isMobile: boolean }) => css`
    color: ${isMobile ? theme.palette.primary.light1 : 'white'};
    position: ${isMobile ? 'relative' : 'absolute'};
    bottom: ${isMobile ? '-5%' : '90.6%'};
    left: ${isMobile ? '34%' : '85.7%'};
  `}
`;

export const TickContainer = styled.div`
  .MuiSvgIcon-root {
    fill: white;
    height: 90px;
    width: 90px;
  }
`;
