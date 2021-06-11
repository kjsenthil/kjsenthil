import React from 'react';
import { DialogProps } from '@material-ui/core';
import { Icon, IconButton, Typography, Grid, DialogContent, DialogTitle } from '../../atoms';
import StyledDialogContainer from './Modal.styles';

export interface ModalProps extends DialogProps {
  modalTitle: string;
}

const Modal = ({ modalTitle, modalBody, onClose, children, ...props }: ModalProps) => (
  <StyledDialogContainer {...props}>
    <DialogTitle disableTypography onClose={onClose}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={10}>
          <Typography variant="h5" display="inline">
            {modalTitle}
          </Typography>
        </Grid>

        <Grid item xs={2} container justify="center">
          <IconButton aria-label="close" onClick={onClose}>
            <Icon name="cross" />
          </IconButton>
        </Grid>
      </Grid>
    </DialogTitle>

    <DialogContent dividers>{children}</DialogContent>
  </StyledDialogContainer>
);
export default Modal;
