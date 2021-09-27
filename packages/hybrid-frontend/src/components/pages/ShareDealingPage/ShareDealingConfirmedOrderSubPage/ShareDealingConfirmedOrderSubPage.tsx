import * as React from 'react';
import {
  DateTime,
  Typography,
  ReceiptCard,
  formatCurrency,
  CurrencyPresentationVariant,
} from '@tswdts/react-components';
import {
  OrderDetails,
  ExecutionType,
} from '../../../../services/shareDealing/machines/shareDealing';

export interface ShareOrderFormSubPageProps {
  order: OrderDetails;
  executionType: ExecutionType;
  accountName: string;
}

const ShareDealingMarketQuoteSubPage = ({
  executionType,
  order,
  accountName,
}: ShareOrderFormSubPageProps) => {
  const otherCharges = order.cost.commission + order.cost.ptmLevy + order.cost.stampDuty;

  const receiptCardProps = {
    items: [
      { key: 'Order Reference No.', value: order.orderId },
      { key: 'Order Placed on', value: <DateTime date={order.orderPlacedDate} /> },
      { key: 'Order Expiry Date', value: 'N/A' },
      { key: 'Order Status', value: order.orderStatus },
      { key: 'Order Type', value: executionType === 'limit' ? 'Limit Order' : 'Market Order' },
      { key: 'Epic Code', value: order.epicCode },
      { key: 'Shares', value: order.numberOfUnits },
      { key: 'Estimated order price', value: order.quotedPrice },
      { key: 'Other charges', value: otherCharges },
    ],
    total: {
      key: 'Total order amount',
      value: formatCurrency(order.estimatedTotalOrder, CurrencyPresentationVariant.ACTUAL_INLINE),
    },
  };

  return (
    <ReceiptCard
      {...receiptCardProps}
      cardHeader={
        <>
          <Typography variant="sh4" color="grey" colorShade="dark1">
            {accountName.toUpperCase()}
          </Typography>
          <Typography variant="h3">{order.shareName}</Typography>
        </>
      }
    />
  );
};

export default ShareDealingMarketQuoteSubPage;
