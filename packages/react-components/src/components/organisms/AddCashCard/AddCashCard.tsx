import React from 'react';
import { Button, Grid, Typography, Icon, Spacer } from '../../atoms';
import { useBreakpoint } from '../../../hooks';
import { StyledMainCard, StyledLink } from './AddCashCard.styles';

export interface AddCashCardProps {
  selectedAccountName: string;

  openModal: () => void;
}

const AddCashCard = ({ selectedAccountName = '', openModal }: AddCashCardProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <StyledMainCard isMobile={isMobile}>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={isMobile ? 12 : 8}>
          <Typography variant="h3" color="primary" colorShade="dark2">
            Add Cash
          </Typography>
          <Spacer y={isMobile ? 1 : 1.5} />
          <Typography variant="b2" color="primary" colorShade="dark2">
            Use a personal debit card to add cash to your {selectedAccountName.toUpperCase()}{' '}
            account.
          </Typography>
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
          <StyledLink special variant="sh4">
            Transfer an account
          </StyledLink>
        </Grid>
      </Grid>
    </StyledMainCard>
  );
};

export default AddCashCard;
