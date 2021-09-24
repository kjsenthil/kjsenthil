import { GenericRequestPayload, GenericResponsePayload } from '../../api/types';

export type ApiResourceStatus = 'Completed' | 'Pending';

export type OrderSizeType = 'Amount' | 'Units';

export interface OrderFields {
  units: number;
  amount: number;
  limitPrice: number;
  limitOrderCalendarDaysToExpiry: number;
}

export type OrderStatuses =
  | 'New'
  | 'PartiallyFilled'
  | 'Filled'
  | 'DoneForDay'
  | 'Cancelled'
  | 'Replaced'
  | 'PendingCancel'
  | 'Stopped'
  | 'Rejected'
  | 'Suspended';

export interface OrderCost {
  commission: number;
  ptmLevy: number;
  stampDuty: number;
}

export interface CommonQuoteData {
  isin: string;
  orderType: 'Buy' | 'Sell';
}

export type GetMarketQuoteStatusResponse = GenericRequestPayload<
  {
    quoteId: string;
    quoteRequestId: string;
    apiResourceStatus: ApiResourceStatus;
    quoteRejectReason: number;
    quoteRejectReasonText: string | null;
    order: CommonQuoteData & {
      numberOfUnits: number;
      estimatedTotalOrder: number;
      quotedPrice: number;
      quoteExpiryDateTime: string;
      adjustedExpiryTimeEpoch: number;
      cost: OrderCost;
    };
  },
  'share-quote-status'
>;

export type GetShareOrderStatusResponse = GenericRequestPayload<
  {
    orderId: string;
    apiResourceStatus: ApiResourceStatus;
    order: CommonQuoteData & {
      orderPlacedDate: string;
      quotedPrice: number;
      shareName: string;
      numberOfUnits: number;
      epicCode: string;
      orderStatus: OrderStatuses;
      estimatedTotalOrder: number;
      transactionTime: string;
      cost: OrderCost;
    };
  },
  'share-order-execution-status'
>;

export type PostLimitCostResponse = GenericRequestPayload<
  {
    accountId: number;
    order: CommonQuoteData &
      OrderFields & {
        orderSizeType: OrderSizeType;
        numberOfUnits: number;
        estimatedTotalOrder: number;
        cost: OrderCost;
      };
  },
  'limit-cost'
>;

export type GetMarketOpenReponse = GenericResponsePayload<
  {
    marketOpen: boolean;
  },
  'market-open'
>;

export type PostMarketQuoteRequest = GenericRequestPayload<
  {
    accountId: number;
    order: Pick<OrderFields, 'amount' | 'units'> &
      CommonQuoteData & {
        orderSizeType: OrderSizeType;
      };
  },
  'share-quote'
>;

export type PostMarketQuoteResponse = GenericResponsePayload<
  { quoteRequestId: string },
  'share-quote'
>;

export type PostLimitCostRequest = GenericRequestPayload<
  {
    accountId: number;
    order: OrderFields &
      CommonQuoteData & {
        orderSizeType: OrderSizeType;
      };
  },
  'limit-cost'
>;

export type PostShareOrderRequest = GenericRequestPayload<
  {
    accountId: number;
    quoteId: string;
    order: OrderFields &
      CommonQuoteData & {
        orderSizeType: OrderSizeType;
        executionType: 'limit' | 'quoteanddeal';
      };
  },
  'share-order'
>;

export type PostShareOrderResponse = GenericResponsePayload<
  {
    orderId: string;
  },
  'share-order'
>;
