import React from 'react';
import styled from 'styled-components';
import { Theme, Dialog, DialogContent, DialogTitle, Icon, IconButton } from '../../atoms';

export interface ModalWithHeaderStyleProps {
  theme: Theme;
  isMobile?: boolean;
}
export const StyledDialogContainer = styled(({ showLogoBackground, isMobile, ...props }) => (
  <Dialog open {...props} />
))`
  ${({
    showLogoBackground,
    isMobile,
    theme: {
      spacing,
      palette,
      typography: { pxToRem },
    },
  }: ModalWithHeaderStyleProps & {
    showLogoBackground: boolean;
  }) => `
    position: relative;


    .MuiPaper-rounded {
      border-radius: ${pxToRem(16)};
    }

    .MuiDialog-paperFulLg {
      max-width: ${isMobile ? 'fit-content' : 'default'};
    }
  
    .MuiDialog-paperWidthFalse {
      max-width: inherit;
    }

    .MuiDialog-paperScrollBody {
      display: ${isMobile ? 'block' : 'inline-block'};
    }

    .MuiDialog-paper {
      min-width: ${isMobile ? 'calc(100% - 40px);' : '682px'};
      margin: ${isMobile ? pxToRem(20) : 'initial'};

      ${
        showLogoBackground
          ? `
          background-color: ${palette.background.layout};
          background-image:url(/logo-background.png);
          background-repeat: no-repeat;
          background-size: auto;
        `
          : ``
      }
    }

    *::-webkit-scrollbar {
        width: 5px;
        padding: ${spacing(2)}px;
    }

    *::-webkit-scrollbar-track {
        background-color: ${palette.grey[100]};
        border-radius: ${spacing(1)}px;
        padding: ${spacing(2)}px;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${palette.grey[300]};
        border-radius: ${spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb:hover, *::-webkit-scrollbar-thumb:active {
        background-color: ${palette.grey[200]};
        border-radius: ${spacing(1)}px;
    }
  `}
`;

export const StyledDialogTitle = styled(DialogTitle)`
  ${({ theme: { spacing } }: ModalWithHeaderStyleProps) => `
    padding: ${spacing(4.5)}px ${spacing(3)}px ${spacing(0)}px ${spacing(3)}px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `}
`;

export const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const StyledDialogHeaderTitle = styled(
  ({ isMobile, setSlightlyRight, showHeaderBoxShadow, ...props }) => <DialogTitle {...props} />
)`
  ${({
    theme: {
      typography: { pxToRem },
      spacing,
    },
    isMobile,
    showHeaderBoxShadow,
    setSlightlyRight,
  }: ModalWithHeaderStyleProps & {
    showHeaderBoxShadow: boolean;
    setSlightlyRight: boolean;
  }) => `
    width: 100%;
    ${
      setSlightlyRight
        ? `
    padding: ${
      isMobile
        ? `${pxToRem(24)} ${pxToRem(20)}`
        : `${pxToRem(40)} ${pxToRem(104)} ${pxToRem(36)} ${pxToRem(104)}`
    };
      `
        : `
    padding: ${isMobile ? spacing(2.5) : spacing(4.5)}px;
    `
    }

  ${showHeaderBoxShadow ? `box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.07);` : ``}
    `}
`;

export const StyledDialogContentProcessHeader = styled(DialogContent)`
  ${({ theme: { palette } }: ModalWithHeaderStyleProps) => `
      background-color: ${palette.background.layout};
  `}
`;

export const StyledDialogConfirmationContent = styled(({ isMobile, ...props }) => (
  <DialogContent {...props} />
))`
  ${({ theme: { spacing }, isMobile }: ModalWithHeaderStyleProps) => `
    padding:${spacing(isMobile ? 2.5 : 4)}px; 
    max-height: ${spacing(200)}px;
    min-height: ${spacing(30)}px;
    justify-content:flex-start;
    .MuiDialogContent-dividers {
      padding-right: ${spacing(1)}px;
      margin-right: ${spacing(3)}px;
    }
  `}
`;

export const StyledIcon = styled(Icon)`
  ${({ theme }: ModalWithHeaderStyleProps) => `
    margin-right: ${theme.spacing(1)}px;
  `}
`;

export const StyledIconButton = styled(({ isMobile, placeInCorner, ...props }) => (
  <IconButton {...props} />
))`
  ${({
    theme,
    isMobile,
    placeInCorner,
  }: ModalWithHeaderStyleProps & { placeInCorner: boolean }) => {
    const rightCorner = placeInCorner ? 5 : 7;
    const topCorner = placeInCorner ? 4.5 : 4;

    return `
    position: absolute;
    right: ${theme.spacing(isMobile ? 1 : rightCorner)}px;
    top: ${theme.spacing(isMobile ? 1 : topCorner)}px;
    color: ${theme.palette.grey[500]};
  `;
  }}
`;
