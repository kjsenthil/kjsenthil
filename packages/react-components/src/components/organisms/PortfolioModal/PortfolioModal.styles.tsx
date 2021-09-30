import * as React from 'react';
import styled, { css } from 'styled-components';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogProps,
  Icon,
  IconButton,
  Theme,
} from '../../atoms';

export const StyledBox = styled(Box)`
  ${({ theme }: { theme: Theme }) => css`
    padding-top: ${theme.spacing(5)}px;
    padding-left: ${theme.spacing(5)}px;
    padding-right: ${theme.spacing(3.5)}px;

    button {
      &.MuiIconButton-root {
        padding: 0 12px;
      }
    }
  `}
`;

export const StyledButton = styled(({ isMobile, ...props }) => <Button {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    ${isMobile && `margin-top: 20px;`}
  `}
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-right: 5px;
`;

export const StyledDialogContainer = styled(
  ({ isMobile, ...props }: { isMobile: boolean } & DialogProps) => <Dialog {...props} />
)`
  ${({ theme, isMobile }) => css`
    padding: ${isMobile ? theme.spacing(0) : theme.spacing(5)}px;

    .MuiDialog-paperWidthMd {
      border-radius: 12px;
      ${!isMobile && `max-width: 610px`}
    }
  `}
`;

export const StyledDialogContent = styled(({ isMobile, ...props }) => <DialogContent {...props} />)`
  ${({ theme, isMobile }: { isMobile: boolean; theme: Theme }) => css`
    padding: ${theme.spacing(1.25)}px ${isMobile ? theme.spacing(2.5) : theme.spacing(5)}px
      ${theme.spacing(5)}px;
  `}
`;

export const StyledIcon = styled(Icon)`
  ${({ theme }) => css`
    margin-right: ${theme.spacing(1.5)}px;
  `}
`;

export const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    &:hover {
      background-color: unset;
    }
  }
`;
