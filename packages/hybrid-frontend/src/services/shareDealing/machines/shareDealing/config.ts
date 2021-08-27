import { MachineConfig } from 'xstate';
import { ShareDealingContext, ShareDealingSchema, ShareDealingEvents } from './types';
import context from './defaultContext';

const shareDealing: MachineConfig<ShareDealingContext, ShareDealingSchema, ShareDealingEvents> = {
  id: 'shareDealing',
  initial: 'idle',
  context,
  on: {
    CANCEL_ORDER: 'cancelling',
  },
  states: {
    idle: {
      on: {
        START_BUYING_ORDER: {
          target: '#shareDealing.ordering.hist',
          actions: 'setBuyingOrder',
        },
        START_SELLING_ORDER: {
          target: '#shareDealing.ordering.hist',
          actions: 'setBuyingOrder',
        },
      },
    },
    ordering: {
      initial: 'fetchingShareDetails',
      states: {
        fetchingShareDetails: {
          id: 'fetchingShareDetails',
          invoke: {
            src: 'fetchShareDetails',
            onDone: {
              target: 'creatingOrder.decidingOrderMethod',
              actions: ['setShareDetails'],
            },
            onError: {
              target: '#shareDealing.failure',
              actions: ['setErrors'],
            },
          },
        },
        creatingOrder: {
          id: 'creatingOrder',
          initial: 'marketOrder',
          on: {
            SET_ORDER_SHARE_UNITS: {
              actions: ['setNumOfUnits', 'setCanGetQuote'],
            },
            SET_ORDER_SHARE_AMOUNT: {
              actions: ['setSpecificAmount', 'setCanGetQuote'],
            },
            GET_QUOTE: {
              target: 'quotingOrder',
              cond: 'canGetQuote',
            },
            SET_MARKET_ORDER: {
              target: '.marketOrder',
              actions: 'clearFields',
              cond: 'isMarketOpen',
            },
            SET_LIMIT_ORDER: { target: '.limitOrder', actions: 'clearFields' },
          },
          states: {
            hist: {
              type: 'history',
              history: 'shallow',
            },
            decidingOrderMethod: {
              always: [
                {
                  target: 'marketOrder',
                  cond: 'isMarketOpen',
                },
                { target: 'limitOrder' },
              ],
            },
            marketOrder: {
              entry: ['setMarketOrder', 'setCanGetQuote'],
            },
            limitOrder: {
              entry: ['setLimitOrder', 'setCanGetQuote'],
              on: {
                SET_LIMIT_ORDER_CHANGE_PRICE: {
                  actions: ['setLimitOrderChangeInPrice', 'setCanGetQuote'],
                },
                SET_LIMIT_ORDER_EXPIRY_DAYS: {
                  actions: ['setLimitOrderExpiryDays', 'setCanGetQuote'],
                },
              },
            },
          },
        },
        quotingOrder: {
          id: 'quotingOrder',
          invoke: {
            src: 'quoteOrder',
            onDone: {
              target: 'previewingQuote',
              actions: ['setQuoteDetails', 'calculateQuoteExpiryInMs'],
            },
            onError: {
              target: 'creatingOrder.hist',
              actions: ['resetQuoteDetails', 'setErrors'],
            },
          },
        },
        previewingQuote: {
          id: 'previewingQuote',
          exit: ['resetQuoteDetails'],
          initial: 'validatingQuote',
          states: {
            validatingQuote: {
              always: [
                {
                  target: 'validQuote',
                  cond: 'hasQuote',
                },
                { target: '#creatingOrder' },
              ],
            },
            validQuote: {
              after: {
                QUOTE_EXPIRY: {
                  target: 'expiredQuote',
                  cond: 'isMarketOrder',
                },
              },
              on: {
                CONFIRM_ORDER: '#shareDealing.ordering.placingOrder',
              },
            },
            expiredQuote: {
              on: {
                REQUOTE_ORDER: '#shareDealing.ordering.quotingOrder',
              },
            },
          },
        },
        placingOrder: {
          id: 'placingOrder',
          invoke: {
            src: 'placeOrder',
            onDone: {
              target: '#shareDealing.success',
              actions: ['setOrderDetails'],
            },
            onError: {
              target: '#shareDealing.failure',
              actions: ['setErrors'],
            },
          },
        },
        hist: {
          type: 'history',
          history: 'shallow',
        },
      },
    },
    cancelling: {
      on: {
        CONFIRM_CANCELLATION: 'finished',
        CANCEL_CANCELLATION: { target: 'ordering.hist' },
      },
    },
    success: {
      on: {
        FINISH: 'finished',
      },
    },
    failure: {
      on: {
        FINISH: 'finished',
      },
    },
    finished: {
      type: 'final',
    },
  },
};

export default shareDealing;
