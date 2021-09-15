import * as React from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  Button,
  ButtonProps,
  DialogProps,
} from '../../atoms';

export const StyledDialogContainer = styled(
  ({ isMobile, ...props }: { isMobile: boolean } & DialogProps) => <Dialog {...props} />
)`
  ${({ theme, isMobile }) => `
    padding: ${isMobile ? theme.spacing(0) : theme.spacing(5)}px;
    .MuiDialog-paper {
      border-radius: ${theme.spacing(2)}px;
      box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.07);
      background-image:url('/logo-background.png');
      background-repeat: no-repeat;
      background-size: auto;
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
        background-color: ${theme.palette.grey.light2};
        border-radius: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb:hover {
        background-color: ${theme.palette.grey.light2};
        border-radius: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb:active {
        background-color: ${theme.palette.grey.light2};
        border-radius: ${theme.spacing(1)}px;
    }
  `}
`;

export const StyledDialogContent = styled(DialogContent)`
  ${({ theme }) => `
    padding-left: ${theme.spacing(5)}px;
    padding-right: ${theme.spacing(5)}px;
    padding-bottom: ${theme.spacing(5)}px;
  `}
`;

export const StyledIcon = styled(Icon)`
  ${({ theme }) => `
    margin-right: ${theme.spacing(1)}px;
  `}
`;

export const StyledButton = styled(
  ({ isMobile, ...props }: { isMobile: boolean } & ButtonProps) => <Button {...props} />
)`
  ${({ isMobile }) => `
    width: ${isMobile ? 486 : 286}px;
  `}
`;

export const StyledDialogTitle = styled(DialogTitle)`
  ${({ theme }) => `
    padding-top: ${theme.spacing(5)}px;
    padding-left: ${theme.spacing(5)}px;
  `}
`;
