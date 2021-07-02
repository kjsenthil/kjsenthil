import React from 'react';
import { DialogProps } from '@material-ui/core';
import { Icon, IconButton, Typography, Grid } from '../../atoms';
import {
  StyledDialogContainer,
  StyledDialogContent,
  StyledDialogTitle,
  StyledIcon,
} from './Modal.styles';

export interface ModalProps extends DialogProps {
  modalTitle: string;
}

const Modal = ({ modalTitle, modalBody, onClose, children, ...props }: ModalProps) => (
  <StyledDialogContainer {...props}>
    <StyledDialogTitle disableTypography onClose={onClose}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={10} container alignItems="center">
          <StyledIcon name="infoCircleIcon" aria-label="more information" color="primary" />
          <Typography variant="h5" display="inline">
            {modalTitle}
          </Typography>
        </Grid>

        <Grid item xs={2} container justify="flex-end">
          <IconButton aria-label="close" onClick={onClose}>
            <Icon name="cross" />
          </IconButton>
        </Grid>
      </Grid>
    </StyledDialogTitle>

    <StyledDialogContent>{children}</StyledDialogContent>
  </StyledDialogContainer>
);
export default Modal;
