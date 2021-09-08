import React from 'react';
import { Grid, Button, Typography, Spacer } from '../../atoms';
import { useBreakpoint } from '../../../hooks';
import { StyledButton, StyledMainCard } from './WithDrawCashCard.styles';

export interface WithDrawCashCardProps {
  canTransferCash?: boolean;
}

const WithDrawCashCard = ({ canTransferCash = false }: WithDrawCashCardProps) => {
  const { isMobile } = useBreakpoint();
  const cardTitle = canTransferCash ? 'Withdraw or transfer cash' : 'Withdraw cash';
  const cardDescription = canTransferCash
    ? 'Withdraw cash to your bank account or transfer it between your accounts.'
    : 'Withdraw cash to your bank account.';

  return (
    <StyledMainCard title={cardTitle}>
      <Grid container item>
        <Grid item xs={isMobile ? 12 : 8}>
          <Typography>{cardDescription}</Typography>
          <Spacer y={1.5} />
        </Grid>
        <Grid container item xs={isMobile ? 12 : 4} direction="column" alignItems="center">
          <Button color="primary" wrap="nowrap" variant="contained" fullWidth>
            Withdraw Cash
          </Button>
          <Spacer y={1.5} />
          <StyledButton
            color="primary"
            wrap="nowrap"
            variant="outlined"
            fullWidth
            canTransferCash={canTransferCash}
          >
            Transfer Cash
          </StyledButton>
        </Grid>
      </Grid>
    </StyledMainCard>
  );
};

export default WithDrawCashCard;
