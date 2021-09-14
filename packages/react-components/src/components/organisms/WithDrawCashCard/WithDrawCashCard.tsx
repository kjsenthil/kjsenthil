import React from 'react';
import { Grid, Button, Typography, Spacer } from '../../atoms';
import { Banner } from '../../molecules';
import { useBreakpoint } from '../../../hooks';
import { StyledButton, StyledMainCard } from './WithDrawCashCard.styles';

export interface WithDrawCashCardProps {
  canTransferCash?: boolean;
  hasBankDetails?: boolean;
  hasChangedBankDetails?: boolean;
}

const WithDrawCashCard = ({
  canTransferCash = false,
  hasBankDetails = true,
  hasChangedBankDetails = true,
}: WithDrawCashCardProps) => {
  const { isMobile } = useBreakpoint();
  const cardTitle = canTransferCash ? 'Withdraw or transfer cash' : 'Withdraw cash';
  const cardDescription = canTransferCash
    ? 'Withdraw cash to your bank account or transfer it between your accounts.'
    : 'Withdraw cash to your bank account.';

  return (
    <StyledMainCard title={cardTitle}>
      {!hasBankDetails && (
        <Banner
          icon="errorCircle"
          title="We don’t have your bank details"
          paragraph=""
          buttonLabel="Add bank details"
        />
      )}
      {!hasChangedBankDetails && (
        <Banner
          icon="errorCircle"
          title="You’ve recently added or changed your bank details"
          paragraph="In order to prevent fraudulant activity, you won’t be able to add monthly cash or add a monthly investment until 7 days after you added ot changed your bank details."
        />
      )}
      {(!hasBankDetails || !hasChangedBankDetails) && <Spacer y={5} />}
      <Grid container item>
        <Grid item xs={isMobile ? 12 : 8}>
          <Typography variant="h3">{cardTitle}</Typography>
          <Typography>{cardDescription}</Typography>
          <Spacer y={1.5} />
        </Grid>
        <Grid container item xs={isMobile ? 12 : 4} direction="column" alignItems="center">
          <Button
            color="primary"
            wrap="nowrap"
            variant="contained"
            fullWidth
            disabled={!hasBankDetails}
          >
            Withdraw Cash
          </Button>
          <Spacer y={1.5} />
          <StyledButton
            color="primary"
            wrap="nowrap"
            variant="outlined"
            fullWidth
            canTransferCash={canTransferCash}
            disabled={!hasBankDetails}
          >
            Transfer Cash
          </StyledButton>
        </Grid>
      </Grid>
    </StyledMainCard>
  );
};

export default WithDrawCashCard;
