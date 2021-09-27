import * as React from 'react';
import { Grid, Spacer, Typography } from '@tswdts/react-components';
import pluralise from 'pluralize';
import { LimitQuoteDetails } from '../../../../services/shareDealing/machines/shareDealing';
import { StyledIcon } from './ShareDealingQuoteSubPage.styles';

export interface LimitQuoteReceiptBottomProps {
  quote: LimitQuoteDetails;
}

const LimitQuoteReceiptBottom = ({ quote }: LimitQuoteReceiptBottomProps) => (
  <Grid container>
    <Grid item xs={12}>
      <Spacer y={1} />
      <Grid
        item
        container
        justifyContent="flex-end"
        spacing={1}
        alignItems="center"
        alignContent="center"
      >
        <Grid item>
          <StyledIcon name="clock" hasQuoteExpired={false} />
        </Grid>
        <Grid item>
          <Typography variant="sh2" component="span">
            This limit order is set to expire in{' '}
            <Typography variant="h5" component="span">
              {quote.limitOrderCalendarDaysToExpiry}
            </Typography>{' '}
            {pluralise('business day', quote.limitOrderCalendarDaysToExpiry)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default LimitQuoteReceiptBottom;
