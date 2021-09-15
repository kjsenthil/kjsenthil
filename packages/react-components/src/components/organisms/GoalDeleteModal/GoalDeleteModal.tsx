import React from 'react';
import { ModalWithHeaderV2 } from '../../molecules';
import { useBreakpoint } from '../../../hooks';
import { Button, Grid, Typography } from '../../atoms';
import { ModalDialogContainer, ModalImage, ModalImageContainer } from './GoalDeleteModal.styles';

export interface GoalDeleteModalProps {
  title: string;
  imgSrc: string;
  imgAlt: string;
  isOpen: boolean;
  onCloseHandler: () => void;
  onDeleteHandler: () => void;
}

const GoalDeleteModal = ({
  title,
  imgSrc,
  imgAlt,
  isOpen,
  onCloseHandler,
  onDeleteHandler,
}: GoalDeleteModalProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <ModalWithHeaderV2 variant="Confirmation" hideCloseButton modalTitle={title} open={isOpen}>
      <Grid container spacing={2}>
        <ModalImageContainer>
          <Grid item xs={12}>
            <ModalImage src={imgSrc} alt={imgAlt} isMobile={isMobile} />
          </Grid>
        </ModalImageContainer>
        <ModalDialogContainer isMobile={isMobile}>
          <Grid item xs={12}>
            <Typography variant="b2" color="primary" colorShade="dark1">
              Are you sure you want to delete this goal? This is permanent and cannot be undone.
            </Typography>
          </Grid>
        </ModalDialogContainer>
        <Grid container item xs={4}>
          <Button
            onClick={onDeleteHandler}
            variant="outlined"
            color="primary"
            type="submit"
            fullWidth
          >
            {title}
          </Button>
        </Grid>
        <Grid container item xs={8}>
          <Button onClick={onCloseHandler} variant="contained" color="primary" fullWidth>
            I am not sure, take me back!
          </Button>
        </Grid>
      </Grid>
    </ModalWithHeaderV2>
  );
};

export default GoalDeleteModal;
