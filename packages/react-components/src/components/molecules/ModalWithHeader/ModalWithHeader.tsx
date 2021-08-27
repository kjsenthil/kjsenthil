import React from 'react';
import { DialogProps } from '@material-ui/core';
import { Icon, IconButton, Typography, Grid, useTheme } from '../../atoms';
import { useBreakpoint } from '../../../hooks';
import {
  StyledDialogContainer,
  StyledDialogContent,
  StyledDialogTitle,
  StyledDialogHeaderTitle,
  HeaderBar,
  HeaderBarList,
  StyledCrossIcon,
  StyledIconButton,
} from './ModalWithHeader.styles';

export interface ModalProps extends DialogProps {
  modalTitle: string;
  subTitle?: string;
  modalBackgroundImgSrc?: string;
  modalWidth?: string;
  variant?: 'DefaultTitle' | 'withSubTitle';
}

const ModalWithHeader = ({
  variant,
  modalTitle,
  subTitle,
  modalBackgroundImgSrc,
  modalWidth,
  onClose,
  children,
  ...props
}: ModalProps) => {
  const theme = useTheme();
  const { isMobile } = useBreakpoint();
  switch (variant) {
    case 'withSubTitle':
      return (
        <StyledDialogContainer onClose={onClose} {...props} isMobile={isMobile}>
          <StyledDialogHeaderTitle>
            <Grid container item xs={12}>
              <Grid container item xs={10} alignItems="center" justifyContent="flex-start">
                <Grid item xs={12}>
                  <Typography variant="sh4" display="inline" color="grey">
                    {subTitle}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2" display="inline" color="primary">
                    {modalTitle}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={2} justifyContent="flex-end">
                <StyledCrossIcon>
                  <IconButton
                    aria-label="close"
                    onClick={() => typeof onClose !== 'undefined' && onClose({}, 'escapeKeyDown')}
                    component="button"
                  >
                    <Icon name="cross" />
                  </IconButton>
                </StyledCrossIcon>
              </Grid>
            </Grid>
          </StyledDialogHeaderTitle>
          <HeaderBar>
            <HeaderBarList
              color={`linear-gradient(to left, ${theme.palette.primary.light1}, ${theme.palette.primary.main} 100%)`}
            />
            <HeaderBarList color={theme.palette.grey[200]} />
          </HeaderBar>

          <StyledDialogContent>{children}</StyledDialogContent>
        </StyledDialogContainer>
      );
    case 'DefaultTitle':
      return (
        <StyledDialogContainer
          onClose={onClose}
          {...props}
          isMobile={isMobile}
          modalBackgroundImgSrc={modalBackgroundImgSrc}
        >
          <StyledDialogTitle disableTypography>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              className="modalTitle"
            >
              <Grid item xs={11}>
                <Typography variant="h2" display="inline" color="primary">
                  {modalTitle}
                </Typography>
              </Grid>

              <Grid item xs={1} container justifyContent="flex-end">
                <StyledIconButton>
                  <Icon name="cross" />
                </StyledIconButton>
              </Grid>
            </Grid>
          </StyledDialogTitle>

          <StyledDialogContent>{children}</StyledDialogContent>
        </StyledDialogContainer>
      );
    default:
      return null;
  }
};
export default ModalWithHeader;
