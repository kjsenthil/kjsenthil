export type OrderStatuses = 'New' | 'Pending' | 'Completed';

export interface OrderCostDetails {
  commission: number;
  ptmLevy: number;
  stampDuty: number;
}

export interface CommonOrderDetails {
  orderType: string;
  orderStatus: OrderStatuses;
  quotedPrice: number;
  orderShareUnits: number;
  estimatedTotalOrder: number;
  cost: OrderCostDetails;
}

export interface OrderDetails extends CommonOrderDetails {
  orderPlacedDate: Date;
  epicCode: 'VOD';
  shareName: string;
  orderShareUnits: number;
  transactionTime: Date;
}

export interface QuoteDetails extends CommonOrderDetails {
  isin: string;
  quoteExpiryDateTime: Date;
}

export interface ShareDealingContext {
  shareName: string | null;
  indicativePrice: number;
  indicativePriceDate: null | Date;
  availableCash: number;
  isMarketOpen: boolean;
  orderType: null | 'buying' | 'selling';
  orderMethod: null | 'limit' | 'market';
  orderShareUnits: number | null;
  orderShareAmount: number | null;
  limitOrderChangeInPrice: number | null;
  limitOrderExpiryDays: number | null;
  quoteExpiryInMs: number;
  canGetQuote: boolean;
  order: OrderDetails | null;
  quote: QuoteDetails | null;
  errors: Partial<Record<ErrorKeys, string>>;
}

export type ErrorKeys = keyof Pick<
  ShareDealingContext,
  'orderShareUnits' | 'orderShareAmount' | 'limitOrderChangeInPrice' | 'limitOrderExpiryDays'
>;
export interface ShareDealingSchema {
  states: {
    idle: {};
    ordering: {
      states: {
        fetchingShareDetails: {};
        creatingOrder: {
          states: {
            decidingOrderMethod: {};
            marketOrder: {};
            limitOrder: {};
            hist: {};
          };
        };
        quotingOrder: {};
        previewingQuote: {
          states: {
            validatingQuote: {};
            validQuote: {};
            expiredQuote: {};
          };
        };
        placingOrder: {};
        hist: {};
      };
    };
    cancelling: {};
    success: {};
    failure: {};
    finished: {};
  };
}

export type SetShareDetailsEvent = {
  type: 'done.invoke.fetchingShareDetails';
  data: Pick<ShareDealingContext, 'indicativePrice' | 'indicativePriceDate' | 'availableCash'>;
};
export type StartBuyingOrderEvent = { type: 'START_BUYING_ORDER' };
export type StartSellingOrderEvent = { type: 'START_SELLING_ORDER' };
export type GetQuoteEvent = { type: 'GET_QUOTE' };
export type SetLimitOrderEvent = {
  type: 'SET_LIMIT_ORDER';
};
export type SetMarketOrderEvent = {
  type: 'SET_MARKET_ORDER';
};
export type SetNumOfUnitsEvent = {
  type: 'SET_ORDER_SHARE_UNITS';
  payload: { orderShareUnits: number };
};
export type SetSpecificAmountEvent = {
  type: 'SET_ORDER_SHARE_AMOUNT';
  payload: { orderShareAmount: number };
};
export type SetLimitOrderChangeInPriceEvent = {
  type: 'SET_LIMIT_ORDER_CHANGE_PRICE';
  payload: { limitOrderChangeInPrice: number };
};
export type SetLimitOrderExpiryDaysEvent = {
  type: 'SET_LIMIT_ORDER_EXPIRY_DAYS';
  payload: { limitOrderExpiryDays: number };
};
export type ConfirmOrderEvent = { type: 'CONFIRM_ORDER' };
export type RequoteOrderEvent = { type: 'REQUOTE_ORDER' };
export type FinishEvent = { type: 'FINISH' };
export type CancelOrderEvent = { type: 'CANCEL_ORDER' };
export type ConfirmCancellationEvent = { type: 'CONFIRM_CANCELLATION' };
export type CancelCancellationEvent = { type: 'CANCEL_CANCELLATION' };
export type SetQuoteDoneEvent = {
  type: 'done.invoke.quoteOrder';
  data: { quote: QuoteDetails }; // to change / add API response data
};
export type SetOrderDoneEvent = {
  type: 'done.invoke.placeOrder';
  data: { order: OrderDetails }; // to change / add API response data
};
export type SetQuoteErrorsEvent = {
  type: 'error.invoke.quotingOrder';
  data: { errors: Record<string, string> };
};

export type ShareDealingEvents =
  | StartBuyingOrderEvent
  | StartSellingOrderEvent
  | GetQuoteEvent
  | SetMarketOrderEvent
  | SetLimitOrderEvent
  | SetNumOfUnitsEvent
  | SetSpecificAmountEvent
  | SetLimitOrderChangeInPriceEvent
  | SetLimitOrderExpiryDaysEvent
  | ConfirmOrderEvent
  | RequoteOrderEvent
  | CancelOrderEvent
  | ConfirmCancellationEvent
  | CancelCancellationEvent
  | SetQuoteDoneEvent
  | SetQuoteErrorsEvent
  | SetOrderDoneEvent
  | SetShareDetailsEvent
  | FinishEvent;
