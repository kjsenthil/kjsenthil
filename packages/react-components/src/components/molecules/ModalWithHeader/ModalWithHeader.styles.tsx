import React from 'react';
import styled from 'styled-components';

import { Dialog, DialogContent, DialogTitle, Icon, IconButton } from '../../atoms';

export const StyledDialogContainer = styled(
  ({
    modalBackgroundImgSrc,
    modalWidth,
    headerBackgroundColor,
    withHeader,
    isMobile,
    ...props
  }) => <Dialog open {...props} />
)`
  ${({
    modalBackgroundImgSrc,
    headerBackgroundColor,
    withHeader,
    modalWidth,
    isMobile,
    theme,
  }: {
    theme: any;
    modalBackgroundImgSrc: string;
    headerBackgroundColor: string;
    withHeader: boolean;
    modalWidth: string;
    isMobile: boolean;
  }) => `
    max-height: ${theme.spacing(100)}%;

    ${
      withHeader === true
        ? `.MuiDialogContent-root {
          padding:0;
        }`
        : ``
    }

    .MuiDialog-container {
      opacity: 0.3;
  }
  ${headerBackgroundColor ? `.MuiDialogTitle-root {background-color:${headerBackgroundColor}}` : ``}
    .MuiDialog-paper {
        border-radius: ${theme.spacing(2)}px;
        max-height: 100%;
        background-color: #f9fafc;
        ${modalBackgroundImgSrc ? `background-image:url('${modalBackgroundImgSrc}');` : ``}
        margin: ${isMobile ? 0 : ''};
        width: ${isMobile ? theme.typography.pxToRem(335) : theme.typography.pxToRem(682)};
        max-width: ${modalWidth || '100%'};
        background-repeat: no-repeat;
        background-size: cover;
    }

    .modalTitle {
      text-align: center;
      display: flex;
    }

    *::-webkit-scrollbar {
        width: 5px;
        padding: ${theme.spacing(2)}px;
    }

    *::-webkit-scrollbar-track {
        background-color: ${theme.palette.grey.light2};
        border-radius: ${theme.spacing(1)}px;
        padding: ${theme.spacing(2)}px;

    }

    *::-webkit-scrollbar-thumb {
        background-color: ${theme.palette.grey.main};
        border-radius: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb:hover, *::-webkit-scrollbar-thumb:active {
        background-color: ${theme.palette.grey.light1};
        border-radius: ${theme.spacing(1)}px;
    }
  `}
`;

export const StyledDialogTitle = styled(DialogTitle)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
    1
  )}px;
  `}
`;

export const HeaderContainer = styled.div`
  display: flex;
`;

export const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const StyledDialogHeaderTitle = styled(({ isMobile, ...props }) => (
  <DialogTitle {...props} />
))`
  ${({ isMobile, theme }: { theme: any; isMobile: boolean }) => `
    width: 100%;
    padding: ${isMobile ? theme.spacing(2.5) : theme.spacing(4.5)}px;
  `}
`;

export const CloseButton = styled(DialogTitle)`
  ${({ theme }) => `
    position: absolute;
    right: ${theme.spacing(1)};
    top: ${theme.spacing(1)};
    color: ${theme.palette.grey[500]};
  `}
`;

export const HeaderBar = styled.ul`
  display: flex;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const HeaderBarList = styled.li<{
  color: string;
}>`
  ${({ color }) => `
    border-bottom: 8px solid ${color};
    background: ${color};
    background-size: 100% 3px;
    width: 50%;
    &:first-child {
      margin-right:1px;
    }
  `}
`;

export const StyledDialogContentWithoutHeader = styled(DialogContent)`
  ${({ theme }) => `
    padding:${theme.spacing(4)}px;
    max-height: ${theme.spacing(200)}px;
    min-height: ${theme.spacing(30)}px;
    justify-content:flex-start;
    .MuiDialogContent-dividers {
      padding-right: ${theme.spacing(1)}px;
      margin-right: ${theme.spacing(3)}px;
    }
  `}
`;

export const StyledIcon = styled(Icon)`
  ${({ theme }) => `
    margin-right: ${theme.spacing(1)}px;
  `}
`;

export const StyledIconButton = styled(IconButton)`
  ${({ theme }) => `
    color: ${theme.palette.grey.dark2};
  `}
`;
