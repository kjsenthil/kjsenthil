import * as React from 'react';
import {
  Grid,
  Spacer,
  Typography,
  ReceiptCard,
  LinkWithIcon,
  formatCurrency,
  CurrencyPresentationVariant,
} from '@tswdts/react-components';
import {
  QuoteDetails,
  MarketQuoteDetails,
  ExecutionType,
  LimitQuoteDetails,
} from '../../../../services/shareDealing/machines/shareDealing';
import { EditLinkWrapper } from './ShareDealingQuoteSubPage.styles';
import LimitQuoteReceiptBottom from './LimitQuoteReceiptBottom';
import MarketQuoteReceiptBottom from './MarketQuoteReceiptBottom';

export interface ShareOrderFormSubPageProps {
  quote: QuoteDetails;
  shareName: string;
  executionType: ExecutionType;
  quoteExpiryInMs: number;
  hasQuoteExpired: boolean;
  onEdit: () => void;
}

const ShareDealingQuoteSubPage = ({
  onEdit,
  quote,
  shareName,
  executionType,
  quoteExpiryInMs,
  hasQuoteExpired,
}: ShareOrderFormSubPageProps) => {
  const receiptCardProps = {
    listHeader: { key: 'Details of your transaction', value: 'Summary cost' },
    items: [
      { key: 'Number of Shares', value: quote.numberOfUnits },
      {
        key: 'Price per share',
        value:
          executionType === 'market'
            ? (quote as MarketQuoteDetails).quotedPrice
            : (quote as LimitQuoteDetails).limitPrice,
      },
      { key: 'Stamp duty', value: quote.cost.stampDuty },
      { key: 'PTM Levy', value: quote.cost.ptmLevy },
      { key: 'Commission', value: quote.cost.commission },
    ],
    total: {
      key: 'Estimated total order',
      value: formatCurrency(quote.estimatedTotalOrder, CurrencyPresentationVariant.ACTUAL_INLINE),
    },
  };

  if (executionType === 'market') {
    receiptCardProps.items.splice(2, 0, {
      key: `${quote.numberOfUnits} ${shareName} @${(quote as MarketQuoteDetails).quotedPrice}`,
      value: (quote as MarketQuoteDetails).quotedPrice,
    });
  }

  return (
    <Grid container>
      <Grid container item xs={12}>
        <Grid item xs={10}>
          <Typography variant="h4">
            {executionType === 'market' ? 'Order summary' : 'Estimated order summary'}
          </Typography>
        </Grid>
        <EditLinkWrapper item xs={2}>
          <LinkWithIcon iconName="edit" onClick={onEdit}>
            Edit
          </LinkWithIcon>
        </EditLinkWrapper>
      </Grid>
      <Grid item xs={12}>
        <Spacer y={2} />

        <ReceiptCard
          {...receiptCardProps}
          renderBottom={
            executionType === 'market' ? (
              <MarketQuoteReceiptBottom
                quoteExpiryInMs={quoteExpiryInMs}
                hasQuoteExpired={hasQuoteExpired}
              />
            ) : (
              <LimitQuoteReceiptBottom quote={quote as LimitQuoteDetails} />
            )
          }
        />
      </Grid>
    </Grid>
  );
};

export default ShareDealingQuoteSubPage;
