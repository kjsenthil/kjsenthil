import * as React from 'react';
import styled, { css } from 'styled-components';
import { Grid, Theme } from '@tswdts/react-components';

export const LogoImage = styled.div`
  ${({ isMobile }: { isMobile: boolean }) => css`
    background-image: url('/PurpleBestInvest.svg');
    background-repeat: no-repeat;
    background-size: contain;
    height: ${isMobile ? `37px` : `49px`};
    width: ${isMobile ? `124px` : `164px`};
    margin-left: 4px;
  `}
`;

export const LeftWrapper = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ theme, isMobile }: { theme: Theme; isMobile: boolean }) => `
    align-content: stretch;
    min-height: 100%;
    padding: ${theme.spacing(5)}px ${theme.spacing(14.8)}px ${theme.spacing(7.5)}px ${theme.spacing(
    12.5
  )}px; 
    ${isMobile && `padding: ${theme.spacing(2.5)}px;`}
    background-color: ${theme.palette.background.layout};
    background-size: contain;
    ${
      isMobile &&
      css`
        background-image: url(/onboarding-triangle-background.svg);
        background-repeat: no-repeat;
        background-position-y: 120px;
        background-position-x: 89px;
        background-attachment: fixed;
      `
    };
  `}
`;

export const RightWrapper = styled(Grid)`
  ${({ theme }: { theme: Theme }) => `
      background: ${theme.palette.grey[100]} url(/onboarding-triangle-background.svg) no-repeat;
      height: 100%;
      background-size: 100%;
      background-position: -155px;
      background-position-y: 110px;
  `}
`;

export const StepProgressWrapper = styled(Grid)`
  ${({ theme }: { theme: Theme }) => `
    padding: ${theme.spacing(5)}px;
  `}
`;

export const TertiaryButtonWrapper = styled(Grid)`
  text-align: end;
`;

export const BodyAndHeaderWrapper = styled(Grid)`
  align-self: baseline;
`;

export const BodyWrapper = styled(({ isVerticallyCentered, ...props }) => <Grid {...props} />)`
  ${({ isVerticallyCentered }: { isVerticallyCentered: boolean }) => `
    min-height: 72vh;
    display: flex;
    flex-direction: column;
    justify-content: ${isVerticallyCentered ? 'center' : 'flex-start'};
  `}
`;

export const ActionWrapper = styled(Grid)`
  align-self: flex-end;
`;

export const ContentRightImagePlaceholder = styled.img``;
