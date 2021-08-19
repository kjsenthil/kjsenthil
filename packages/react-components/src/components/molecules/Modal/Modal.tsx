import React from 'react';
import { DialogProps, Icon, IconButton, Typography, Grid } from '../../atoms';
import {
  StyledDialogContainer,
  StyledDialogContent,
  StyledDialogTitle,
  StyledIcon,
} from './Modal.styles';

export interface ModalProps extends DialogProps {
  modalTitle: string;
}

const Modal = ({ modalTitle, onClose, children, ...props }: ModalProps) => (
  <StyledDialogContainer {...props} onClose={onClose}>
    <StyledDialogTitle disableTypography>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={10} container alignItems="center">
          <StyledIcon name="infoCircleIcon" aria-label="more information" color="primary" />
          <Typography variant="h5" display="inline">
            {modalTitle}
          </Typography>
        </Grid>

        <Grid item xs={2} container justifyContent="flex-end">
          <IconButton
            aria-label="close"
            onClick={() => typeof onClose !== 'undefined' && onClose({}, 'escapeKeyDown')}
            component="button"
          >
            <Icon name="cross" />
          </IconButton>
        </Grid>
      </Grid>
    </StyledDialogTitle>

    <StyledDialogContent>{children}</StyledDialogContent>
  </StyledDialogContainer>
);
export default Modal;
