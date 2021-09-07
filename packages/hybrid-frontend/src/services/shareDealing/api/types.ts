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

export type GetShareIndicativePriceResponse = GenericResponsePayload<
  {
    assetId: string;
    assetName: string;
    isin: string;
    sedol: string;
    epic: string;
    price: string;
    priceDateTime: string;
  },
  'share-indicative-price'
>;

export type GetMarketQuoteStatusResponse = GenericRequestPayload<
  {
    quoteId: string;
    apiResourceStatus: ApiResourceStatus;
    quoteRejectReason: number;
    quoteRejectReasonText: string | null;
    order: CommonQuoteData & {
      numberOfUnits: number;
      estimatedTotalOrder: number;
      quotedPrice: number;
      quoteExpiryDateTime: string;
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
    updatedBy: string;
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
    updatedBy: string;
    order: Pick<OrderFields, 'amount' | 'units'> &
      CommonQuoteData & {
        orderSizeType: OrderSizeType;
      };
  },
  'share-quote'
>;

export type PostMarketQuoteResponse = GenericResponsePayload<{ quoteGuid: string }, 'share-quote'>;

export type PostLimitCostRequest = GenericRequestPayload<
  {
    accountId: number;
    updatedBy: string;
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
    updatedBy: string;
    quoteId: string;
    order: OrderFields &
      CommonQuoteData & {
        orderSizeType: OrderSizeType;
        executionType: 'limit' | 'market';
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
