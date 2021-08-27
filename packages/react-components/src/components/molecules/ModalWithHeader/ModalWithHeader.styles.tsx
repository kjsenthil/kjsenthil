import React from 'react';
import styled from 'styled-components';
import { Dialog, DialogContent, DialogTitle, Icon, IconButton } from '../../atoms';

export const StyledDialogContainer = styled(({ modalBackgroundImgSrc, modalWidth, ...props }) => (
  <Dialog open {...props} />
))`
  ${({
    modalBackgroundImgSrc,
    modalWidth,
    theme,
  }: {
    theme: any;
    modalBackgroundImgSrc: string;
    modalWidth: string;
  }) => `
    max-height: ${theme.spacing(100)}%;

    .MuiDialog-container {
        opacity: 0.3;
    }

    .MuiDialog-paper {
        border-radius: ${theme.spacing(2)}px;
        max-height: 100%;
        background-color: #f9fafc;
        ${modalWidth ? `max-width:${modalWidth};` : ``}
        ${modalBackgroundImgSrc ? `background-image:url('${modalBackgroundImgSrc}');` : ``}
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
    padding: ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px inherit;
  `}
`;

export const StyledDialogHeaderTitle = styled(DialogTitle)`
  ${({ theme }) => `
    width:100%;
    padding: ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px inherit;
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

export const StyledDialogContent = styled(DialogContent)`
  ${({ theme }) => `
    padding-right: ${theme.spacing(1)}px;
    margin-right: ${theme.spacing(3.5)}px;
    margin-bottom: ${theme.spacing(4)}px;
    max-height: ${theme.spacing(200)}px;
    min-height: ${theme.spacing(25)}px;
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

export const StyledCrossIcon = styled.div`
  height: 60%;
`;

export const StyledIconButton = styled(IconButton)`
  ${({ theme }) => `
    color: ${theme.palette.grey.dark2};
  `}
`;
