import * as React from 'react';
import styled, { css } from 'styled-components';
import {
  AppBar,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Link,
  List,
  MenuItem,
  Toolbar,
  Icon,
  Theme,
} from '../../atoms';
import { SubHeader } from '../../molecules';

export const Availability = styled.p`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
  }) => css`
    font-size: 12px;
    line-height: 20px;
    letter-spacing: ${pxToRem(0.4)};
    color: ${palette.grey[400]};
  `}
`;

export const CallBack = styled.div`
  text-align: center;
`;

export const CallContainer = styled.div`
  padding: 13px 12px 24px 17px;
`;

export const CashAndInvestGrid = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    ${!isMobile &&
    `
    .MuiGrid-spacing-xs-2 > .MuiGrid-item {
      padding: 0;
    }
      padding-right: 24px;
      flex-basis: unset;
    `}
  `}
`;

export const Circle = styled.div`
  ${({ color }: { color: string }) => css`
    background-color: ${color};
    width: 8px;
    height: 8px;
    margin: 17px 8px 7px 0;
    border-radius: 50%;
    float: left;
  `}
`;

export const CoachIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.875rem;
  justify-content: space-around;
  width: 100%;
`;

export const CoachTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h6 {
    margin-left: -13px;
  }
`;

export const CoachIcon = styled.div`
  ${({ coachIconUrl, theme }: { coachIconUrl: string; theme: Theme }) => css`
    background-image: url(${coachIconUrl});
    background-size: contain;
    width: ${theme.typography.pxToRem(45)};
    height: ${theme.typography.pxToRem(45)};
    border: 0;
    image-rendering: -webkit-optimize-contrast;
  `}
`;

export const DrawerContainer = styled.div`
  width: 298px;
  margin-top: 90px;
  overflow-x: hidden;
`;

export const DrawerFooterContainer = styled.div`
  ${({ theme }) => css`
    height: 169px;
    background-color: ${theme.palette.background.default};
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: solid 1px ${theme.palette.grey[100]};
    padding: 25px 20px 24px 12px;
  `}
`;

export const IconGridDivider = styled(Grid)`
  padding: 0;
`;

export const InvestButton = styled(({ isMobile, ...props }) => <Button {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    width: ${isMobile ? `168px` : `102px`};
    margin-left: ${isMobile ? '-5px' : '8px'};
  `}
`;

export const LogoImage = styled(({ isMobile, ...props }) => <div {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    background-image: url('/PurpleBestInvest.svg');
    background-repeat: no-repeat;
    background-size: contain;
    height: ${isMobile ? `37px` : `49px`};
    width: ${isMobile ? `124px` : `164px`};
    margin-left: 4px;
  `}
`;

export const ModalContainer = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    position: absolute;
    z-index: 10;
    right: ${theme.typography.pxToRem(97)};
    top: ${theme.typography.pxToRem(65)};
    width: fit-content;

    @media (max-width: 830px) {
      right: 0;
    }
  `}
`;

export const MyAccountsContainer = styled.div`
  display: flex;
  column-gap: 0.5rem;
  align-items: center;
`;

export const ProfileMenuItem = styled(MenuItem)`
  &:hover {
    background-color: transparent;
  }
`;

export const RotatedIcon = styled(Icon)`
  transform: rotate(-90deg);
`;

export const StyledAppBar = styled(({ isMobile, ...props }) => <AppBar {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    min-height: ${isMobile ? '90px' : '87px'};
    margin: auto;
    max-width: 1440px;
    left: 0;
    right: 0;
    justify-content: space-evenly;
  `}
`;

export const StyledCallBackLink = styled(Link)`
  ${({ theme }) => css`
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.2px;
    font-weight: 600;
    color: ${theme.palette.grey[400]};
  `}
`;

export const StyledIconButton = styled(IconButton)`
  padding-right: 4px;
`;

export const StyledInputBase = styled(InputBase)`
  ${({ theme }) => css`
    width: 274px;
    height: 40px;
    margin: 20px 12px 22px;
    padding: 8px 69px 8px 14px;
    border-radius: 30px;
    border: solid 2px ${theme.palette.grey[100]};
    background-color: ${theme.palette.background.default};
    font-size: 11px;

    input {
      padding: 7px 0 7px;
      font-weight: 600;
      line-height: 1.45;
      letter-spacing: 0.2px;
      font-size: 11px;
    }

    .MuiInputAdornment-positionStart {
      margin-right: 17px;
    }
  `}
`;

export const StyledMenuNavGrid = styled(Grid)`
  height: 87px;
`;

export const StyledMobileMenuList = styled(({ isExpFeatureFlagEnabled, ...props }) => (
  <List {...props} />
))`
  ${({ isExpFeatureFlagEnabled }: { isExpFeatureFlagEnabled: boolean }) => css`
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - ${isExpFeatureFlagEnabled ? '420px' : '333px'});
  `}
`;

export const StyledProfileList = styled(({ profileMenuOpen, ...props }) => <List {...props} />)`
  ${({ profileMenuOpen, theme }: { profileMenuOpen: boolean; theme: Theme }) => css`
    margin-bottom: -131px;
    background-color: ${theme.palette.background.default};
    z-index: 1;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%),
      0px 3px 14px 2px rgb(0 0 0 / 12%);
    ${profileMenuOpen &&
    `
      margin-left: -82px;
      `}
  `}
`;

// TODO: consider getting these colours from an extended palette
export const StyledSubHeader = styled(({ isMobile, ...props }) => <SubHeader {...props} />)`
  ${({ theme, isMobile }: { theme: Theme; isMobile: boolean }) => css`
    background: linear-gradient(267deg, #af61fe 20%, #7024fc 75%);
    color: ${theme.palette.background.default};
    padding-left: ${theme.typography.pxToRem(36)};
    padding-right: ${theme.typography.pxToRem(41)};
    min-height: ${isMobile ? '34px' : '80px'};
    @media (max-width: 830px) {
      padding: 0;
    }
  `}
`;

export const StyledToolbar = styled(({ isMobile, ...props }) => <Toolbar {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    min-height: ${isMobile ? '90px' : '87px'};
  `}
`;

export const SwitcherLabel = styled(FormControlLabel)`
  margin: 2px;
  padding: 16px;
`;
