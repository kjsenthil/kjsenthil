import React from 'react';
import styled from 'styled-components';
import { Button, Dialog, IconButton, Typography, Theme } from '../../atoms';

export const DialogMessage = styled.div`
  ${({
    theme: {
      typography: { pxToRem },
    },
    isMobile,
  }: {
    theme: Theme;
    isMobile: boolean;
  }) => `
    margin: ${isMobile} ? '0' : ${pxToRem(10)} '0' ${pxToRem(10)} '0';
   
  `}
`;

export const ModalImage = styled.img`
  ${({
    theme: {
      typography: { pxToRem },
    },
    isMobile,
  }: {
    theme: Theme;
    isMobile: boolean;
  }) => `
    width: ${isMobile ? '100%' : '60%'};
    object-fit: cover;
    object-position: center;
    place-self: stretch stretch;
    text-align: center;
    padding : ${
      isMobile
        ? `${pxToRem(22)} ${pxToRem(6)} ${pxToRem(4)} ${pxToRem(6)}`
        : `${pxToRem(27.8)} ${pxToRem(5.6)} ${pxToRem(6.6)} ${pxToRem(5)}`
    }; 
  `}
`;

export const StyledDialogContainer = styled(
  ({ modalBackGroundImgSrc, modalBackGroundColor, isMobile, ...props }) => (
    <Dialog open {...props} />
  )
)`
  ${({
    modalBackGroundImgSrc,
    modalBackGroundColor,
    isMobile,
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
    modalBackGroundImgSrc: string;
    modalBackGroundColor: string;
    isMobile: boolean;
  }) => `
    max-height: 100%;
    .MuiDialog-container {
        opacity: 0.3;
    }
   .MuiDialog-paper {
        border-radius: ${pxToRem(16)};
        padding: ${
          isMobile
            ? `${pxToRem(26.4)} ${pxToRem(20)} ${pxToRem(22.8)} ${pxToRem(20)}`
            : `${pxToRem(36)} ${pxToRem(40)} ${pxToRem(40)} ${pxToRem(40)}`
        }; 
        background-repeat: no-repeat;
        ${modalBackGroundImgSrc ? `background-image:url('${modalBackGroundImgSrc}');` : ``}
        ${modalBackGroundColor ? `background-color:${modalBackGroundColor};` : ``}
        max-width:${pxToRem(682)};
        
    }`}
`;

export const StyledIconButton = styled(IconButton)`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => `
  position:absolute;
  top: -${pxToRem(12)};
  right:-${pxToRem(12)};
  `}
`;

export const ConfirmationGridContainer = styled.div`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => `
    display: flex;
    row-gap: ${pxToRem(6)};
    align-items: center;
    justify-content: center;
    position: relative;
  `}
`;

export const RowBoxSingle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RowBoxDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledTypography = styled(Typography)`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => `
  text-align: center;
    padding: 0 ${pxToRem(16)} 0 ${pxToRem(16)};
 `}
`;

export const StyledTypographyDescription = styled(Typography)`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => `
  text-align: center;
    padding: 0 ${pxToRem(16)} 0 ${pxToRem(16)};
 `}
`;

export const CloseButton = styled(({ isMobile, ...props }) => <Button {...props} />)`
  ${({
    isMobile,
    theme: {
      typography: { pxToRem },
    },
  }: {
    isMobile: boolean;
    theme: Theme;
  }) => `
  justify-content : center
  align-items: center;
  height:${pxToRem(40)};
  width: ${pxToRem(isMobile ? 179 : 187)};
 `}
`;
