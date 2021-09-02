import React from 'react';
import { MainCard } from '../../molecules';
import { Button, Grid, Typography, Link, Icon } from '../../atoms';
import { useBreakpoint } from '../../../hooks';

export interface AddCashCardProps {
  selectedAccountName: string;

  openModal: () => void;
}

const AddCashCard = ({ selectedAccountName = '', openModal }: AddCashCardProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <MainCard title="Add Cash">
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={isMobile ? 12 : 8}>
          <Typography variant="b2">Use a personal debit card to add cash to your</Typography>
          <Typography variant="b2">{selectedAccountName} account</Typography>
        </Grid>
        <Grid container item xs={isMobile ? 12 : 4} direction="column" alignItems="center">
          <Button
            color="primary"
            wrap="nowrap"
            startIcon={<Icon name="plus" />}
            variant="contained"
            fullWidth
            onClick={openModal}
          >
            Add Cash
          </Button>
          <p>or</p>
          <Link special>Transfer cash from another provider</Link>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default AddCashCard;
