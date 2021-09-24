import { Interpreter } from 'xstate/lib/interpreter';
import { interpret } from 'xstate';
import MockDate from 'mockdate';
import {
  ShareDealingContext,
  ShareDealingSchema,
  ShareDealingEvents,
  QuoteDetails,
  OrderDetails,
} from './types';
import defaultContext from './context';
import ShareDealingMachine from './machine';
import actions from './actions';
import delays from './delays';
import guards from './guards';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const services = {
  quoteOrder: jest.fn(),
  placeOrder: jest.fn(),
  fetchShareDetails: jest.fn(),
};

const config = {
  actions,
  guards,
  services,
  delays,
};

const interpreter = (context?: Partial<ShareDealingContext>) => {
  let machine = ShareDealingMachine.withConfig(config);
  if (context) {
    machine = machine.withContext({ ...defaultContext, ...context });
  }
  return interpret(machine);
};

const shareDetails = {
  indicativePrice: 2.5,
  indicativePriceDate: new Date('2021-08-25T17:55:49.354Z'),
  availableCash: 1200.07,
  isMarketOpen: true,
};

const quote: QuoteDetails = {
  isin: 'GB00BH4HKS39',
  quoteId: '236803ae-19f3-4f7c-a29c-66a6c0ad3bc3',
  quoteRequestId: '236803ae-19f3-4f7c-a29c-66a6c0ad3bc2',
  quoteExpiryDateTime: new Date('2021-12-21T00:00:00.100'), // expecting quote expiry to be in 100 ms
  adjustedExpiryTimeEpoch: 1640044800100,
  orderType: 'Buy',
  quotedPrice: 1.0,
  numberOfUnits: 1,
  estimatedTotalOrder: 8.4076,
  cost: {
    commission: 7.5,
    ptmLevy: 0.0,
    stampDuty: 0.0076,
  },
};

const order: OrderDetails = {
  isin: 'GB00BH4HKS39',
  orderPlacedDate: new Date('2021-12-21T00:05:00'),
  orderType: 'Buy',
  orderStatus: 'New',
  quotedPrice: 1.0,
  shareName: 'Tesla',
  numberOfUnits: 1,
  orderId: '123456778',
  epicCode: 'VOD',
  estimatedTotalOrder: 8.4076,
  transactionTime: new Date('2021-08-26T13:37:37'),
  cost: {
    commission: 7.5,
    ptmLevy: 0.0,
    stampDuty: 0.0076,
  },
};

describe('Share Dealing State Machine Config', () => {
  let service: Interpreter<ShareDealingContext, ShareDealingSchema, ShareDealingEvents>;

  beforeEach(() => {
    MockDate.set('2021-12-21T00:00:00');

    services.fetchShareDetails.mockResolvedValue(shareDetails);
    services.quoteOrder.mockResolvedValue({
      quote,
    });

    services.placeOrder.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(order), 0);
        })
    );
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe('defaults', () => {
    beforeAll(() => {
      service = interpreter().start();
    });

    it('starts with sensible defaults with idle status', () => {
      expect(service.state.value).toStrictEqual('idle');
      expect(service.state.context.orderType).toBeNull();
      expect(service.state.context.orderShareUnits).toBeNull();
      expect(service.state.context.orderShareAmount).toBeNull();
      expect(service.state.context.limitOrderChangeInPrice).toBeNull();
      expect(service.state.context.limitOrderExpiryDays).toBeNull();
      expect(service.state.context.isMarketOpen).toBeFalse();
      expect(service.state.context.quote).toBeNull();
    });
  });

  describe('happy path', () => {
    describe('market order', () => {
      beforeAll(() => {
        service = interpreter().start();
      });

      describe('creating a market Buy order', () => {
        it('goes into ordering.creatingOrder.marketOrder on START_BUYING_ORDER event', () => {
          service.send('START_BUYING_ORDER');
          expect(service.state.value).toStrictEqual({ ordering: 'fetchingShareDetails' });
          expect(service.state.context.orderType).toStrictEqual('Buy');
          expect(service.state.context.orderShareUnits).toBeNull();
          expect(service.state.context.availableCash).toBe(0);
          expect(service.state.context.indicativePrice).toBe(0);
          expect(service.state.context.isMarketOpen).toBeFalse();
          expect(service.state.context.indicativePriceDate).toBeNull();
        });

        it('fetches share details and transitions to creatingOrder.marketOrder setting share details in context', async () => {
          await wait(0);
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'marketOrder' } });

          expect(service.state.context.availableCash).toBe(shareDetails.availableCash);
          expect(service.state.context.indicativePrice).toBe(shareDetails.indicativePrice);
          expect(service.state.context.indicativePriceDate).toStrictEqual(
            shareDetails.indicativePriceDate
          );
          expect(service.state.context.isMarketOpen).toBeTrue();
        });

        it('does not allow getting quote before setting orderShareUnits or orderShareAmount', () => {
          service.send('GET_QUOTE');
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'marketOrder' } });
        });

        it('sets orderShareUnits on SET_ORDER_SHARE_UNITS', () => {
          service.send('SET_ORDER_SHARE_UNITS', { payload: { orderShareUnits: 10 } });
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'marketOrder' } });
          expect(service.state.context.orderShareUnits).toStrictEqual(10);
        });

        it('sets orderShareUnits on SET_ORDER_SHARE_AMOUNT', () => {
          service.send('SET_ORDER_SHARE_AMOUNT', { payload: { orderShareAmount: 10000 } });
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'marketOrder' } });
          expect(service.state.context.orderShareUnits).toBeNull();
          expect(service.state.context.orderShareAmount).toStrictEqual(10000);
        });
      });

      describe('quoting -> expiring', () => {
        it('goes into quotingOrder then previewingQuote.validQuote on GET_QUOTE and sets hasQuote to true', async () => {
          service.send('GET_QUOTE');

          expect(service.state.value).toStrictEqual({
            ordering: 'quotingOrder',
          });

          await wait(0);

          expect(service.state.context.quote).toStrictEqual(quote);
          expect(service.state.value).toStrictEqual({
            ordering: { previewingQuote: 'validQuote' },
          });
          expect(services.quoteOrder).toHaveBeenCalledTimes(1);
        });

        it('calculates quote expiry in ms', () => {
          expect(service.state.context.quoteExpiryInMs).toStrictEqual(
            quote.quoteExpiryDateTime.getMilliseconds() - new Date().getMilliseconds()
          );
        });

        it('goes into expiredQuote after QUOTE_EXPIRY wait', async () => {
          await wait(200);

          expect(service.state.value).toStrictEqual({
            ordering: { previewingQuote: 'expiredQuote' },
          });
        });
      });

      describe('requoting', () => {
        it('goes from expiredQuote to quotingOrder on REQUOTE_ORDER setting hasQuote to false', () => {
          expect(service.state.value).toStrictEqual({
            ordering: { previewingQuote: 'expiredQuote' },
          });

          service.send('REQUOTE_ORDER');

          expect(service.state.value).toStrictEqual({
            ordering: 'quotingOrder',
          });
          expect(service.state.context.quote).toBeNull();
        });

        it('resolves quote again setting hasQuote to true and going to previewingQuote', async () => {
          await wait(0);

          expect(service.state.value).toStrictEqual({
            ordering: { previewingQuote: 'validQuote' },
          });
        });
      });

      describe('confirming quote', () => {
        it('goes from previewingQuote.validQuote into placing order on CONFIRM_ORDER', () => {
          expect(service.state.value).toStrictEqual({
            ordering: { previewingQuote: 'validQuote' },
          });

          service.send('CONFIRM_ORDER');

          expect(service.state.value).toStrictEqual({
            ordering: 'placingOrder',
          });
        });

        it('resolves placingOrder and goes to success', async () => {
          expect(service.state.value).toStrictEqual({
            ordering: 'placingOrder',
          });

          await wait(0);

          expect(service.state.value).toStrictEqual('success');
        });
      });
    });

    describe('limit order', () => {
      beforeEach(() => {
        services.quoteOrder.mockResolvedValue({
          quote,
        });

        services.placeOrder.mockImplementation(
          () =>
            new Promise((resolve) => {
              setTimeout(() => resolve(order), 0);
            })
        );
      });

      beforeAll(() => {
        service = interpreter().start();
      });

      describe('creating a limit Buy order', () => {
        it('goes into ordering.creatingOrder.marketOrder on START_BUYING_ORDER event', async () => {
          service.send('START_BUYING_ORDER');
          expect(service.state.value).toStrictEqual({ ordering: 'fetchingShareDetails' });
          await wait(0);
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'marketOrder' } });
          expect(service.state.context.orderType).toStrictEqual('Buy');
          expect(service.state.context.orderShareUnits).toBeNull();
        });

        it('switches to ordering.creatingOrder.limitOrder on SET_LIMIT_ORDER', () => {
          service.send('SET_LIMIT_ORDER');
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'limitOrder' } });
        });

        it('does not allow getting quote before setting orderShareUnits or orderShareAmount', () => {
          service.send('GET_QUOTE');
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'limitOrder' } });
        });

        it('sets orderShareUnits on SET_ORDER_SHARE_UNITS', () => {
          service.send('SET_ORDER_SHARE_UNITS', { payload: { orderShareUnits: 10 } });
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'limitOrder' } });
          expect(service.state.context.orderShareUnits).toStrictEqual(10);
        });

        it('does not allow getting quote before setting orderShareUnits or orderShareAmount', () => {
          service.send('GET_QUOTE');
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'limitOrder' } });
        });

        it('sets limitOrderChangeInPrice on SET_LIMIT_ORDER_CHANGE_PRICE', () => {
          service.send('SET_LIMIT_ORDER_CHANGE_PRICE', {
            payload: { limitOrderChangeInPrice: 200 },
          });
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'limitOrder' } });
          expect(service.state.context.limitOrderChangeInPrice).toStrictEqual(200);
          expect(service.state.context.limitOrderExpiryDays).toBeNull();
        });

        it('does not allow getting quote before setting orderShareUnits or orderShareAmount', () => {
          service.send('GET_QUOTE');
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'limitOrder' } });
        });

        it('sets limitOrderExpiryDays on SET_LIMIT_ORDER_EXPIRY_DAYS', () => {
          service.send('SET_LIMIT_ORDER_EXPIRY_DAYS', { payload: { limitOrderExpiryDays: 30 } });
          expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'limitOrder' } });
          expect(service.state.context.limitOrderChangeInPrice).toStrictEqual(200);
          expect(service.state.context.limitOrderExpiryDays).toStrictEqual(30);
        });

        it('allows getting quote after having set either orderShareUnits or orderShareAmount and both limit order details', () => {
          service.send('GET_QUOTE');
          expect(service.state.value).toStrictEqual({ ordering: 'quotingOrder' });
        });
      });
    });
  });

  describe('unhappy path - vailed quote', () => {
    describe('market order', () => {
      const errors = {
        orderShareAmount: 'You do not have enough money in cash',
      };

      beforeEach(() => {
        services.quoteOrder.mockRejectedValue({
          errors,
        });
      });

      beforeAll(() => {
        service = interpreter().start();
      });

      it('goes back to marketOrder after requesting a quote and service fails and sets errors in context', async () => {
        service.send('START_BUYING_ORDER');
        expect(service.state.value).toStrictEqual({ ordering: 'fetchingShareDetails' });
        await wait(0);

        expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'marketOrder' } });

        service.send('SET_ORDER_SHARE_AMOUNT', { payload: { orderShareAmount: 10000 } });
        service.send('GET_QUOTE');
        expect(service.state.context.errors).toStrictEqual({});
        expect(service.state.value).toStrictEqual({ ordering: 'quotingOrder' });

        await wait(0);

        expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'marketOrder' } });
        expect(service.state.context.errors).toStrictEqual(errors);
      });

      it('does not allow getting another quote with the error present', () => {
        expect(service.state.context.errors).toStrictEqual(errors);
        service.send('GET_QUOTE');
        expect(service.state.context.errors).toStrictEqual(errors);
        expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'marketOrder' } });
      });

      it('resets orderShareAmount error when setting it again and allows getting a quote', () => {
        service.send('SET_ORDER_SHARE_AMOUNT', { payload: { orderShareAmount: 10000 } });
        expect(service.state.context.errors).toStrictEqual({});
        service.send('GET_QUOTE');
        expect(service.state.value).toStrictEqual({ ordering: 'quotingOrder' });
      });
    });
  });

  describe('when market is closed', () => {
    beforeEach(() => {
      services.fetchShareDetails.mockResolvedValue({ ...shareDetails, isMarketOpen: false });
    });

    beforeAll(() => {
      service = interpreter().start();
      // service.send('START_BUYING_ORDER');
    });

    it('goes back to limitOrder after requesting a quote and service fails and sets errors in context', async () => {
      service.send('START_BUYING_ORDER');

      expect(service.state.value).toStrictEqual({ ordering: 'fetchingShareDetails' });

      await wait(0);

      expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'limitOrder' } });
    });

    it('cannot go back to market order on SET_MARKET_ORDER', () => {
      expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'limitOrder' } });

      service.send('SET_MARKET_ORDER');

      expect(service.state.value).toStrictEqual({ ordering: { creatingOrder: 'limitOrder' } });
    });
  });

  describe('error handling', () => {
    const errors = {
      orderShareUnits: 'orderShareUnits is invalid',
      limitOrderChangeInPrice: 'limitOrderChangeInPrice is invalid',
      limitOrderExpiryDays: 'limitOrderExpiryDays is invalid',
    };

    const settingLimitOrderFields = ({
      orderShareUnits,
      limitOrderChangeInPrice,
      limitOrderExpiryDays,
    }: {
      orderShareUnits: number;
      limitOrderChangeInPrice: number;
      limitOrderExpiryDays: number;
    }) => {
      service.send('SET_ORDER_SHARE_UNITS', { payload: { orderShareUnits } });
      service.send('SET_LIMIT_ORDER_CHANGE_PRICE', { payload: { limitOrderChangeInPrice } });
      service.send('SET_LIMIT_ORDER_EXPIRY_DAYS', { payload: { limitOrderExpiryDays } });
    };

    describe('when in creatingOrder.limitOrder state and errors are present in context', () => {
      beforeEach(() => {
        services.quoteOrder.mockRejectedValue({
          errors,
        });
      });

      beforeAll(() => {
        service = interpreter().start();

        service.send('START_BUYING_ORDER');
        service.send('SET_LIMIT_ORDER');
      });

      it('sets errors on all given fields', async () => {
        settingLimitOrderFields({
          orderShareUnits: 1,
          limitOrderChangeInPrice: 200,
          limitOrderExpiryDays: 30,
        });

        service.send('GET_QUOTE');
        await wait(0);

        expect(service.state.context.errors.orderShareUnits).not.toBeUndefined();
        expect(service.state.context.errors.limitOrderChangeInPrice).not.toBeUndefined();
        expect(service.state.context.errors.limitOrderExpiryDays).not.toBeUndefined();
      });

      it('resets orderShareUnits error when user changes the orderShareUnits value', async () => {
        service.send('SET_ORDER_SHARE_UNITS', { payload: { orderShareUnits: 2 } });

        expect(service.state.context.errors.orderShareUnits).toBeUndefined();
        expect(service.state.context.errors.limitOrderChangeInPrice).not.toBeUndefined();
        expect(service.state.context.errors.limitOrderExpiryDays).not.toBeUndefined();
      });

      it('resets limitOrderChangeInPrice error when user changes the limitOrderChangeInPrice value', () => {
        expect(service.state.context.errors.orderShareUnits).toBeUndefined();
        expect(service.state.context.errors.limitOrderChangeInPrice).not.toBeUndefined();
        expect(service.state.context.errors.limitOrderExpiryDays).not.toBeUndefined();

        service.send('SET_LIMIT_ORDER_CHANGE_PRICE', {
          payload: { limitOrderChangeInPrice: 200 },
        });

        expect(service.state.context.errors.orderShareUnits).toBeUndefined();
        expect(service.state.context.errors.limitOrderChangeInPrice).toBeUndefined();
        expect(service.state.context.errors.limitOrderExpiryDays).not.toBeUndefined();
      });

      it('resets limitOrderExpiryDays error when user changes the limitOrderExpiryDays value', () => {
        expect(service.state.context.errors.orderShareUnits).toBeUndefined();
        expect(service.state.context.errors.limitOrderChangeInPrice).toBeUndefined();

        expect(service.state.context.errors.limitOrderExpiryDays).not.toBeUndefined();

        service.send('SET_LIMIT_ORDER_EXPIRY_DAYS', { payload: { limitOrderExpiryDays: 20 } });

        expect(service.state.context.errors.orderShareUnits).toBeUndefined();
        expect(service.state.context.errors.limitOrderChangeInPrice).toBeUndefined();
        expect(service.state.context.errors.limitOrderExpiryDays).toBeUndefined();
      });

      it('resets orderShareAmount error when user changes the amount value', async () => {
        services.quoteOrder.mockRejectedValue({
          errors: { orderShareAmount: 'amount is invalid' },
        });

        service.send('SET_MARKET_ORDER');

        service.send('SET_ORDER_SHARE_AMOUNT', { payload: { orderShareAmount: 1000 } });
        expect(service.state.context.errors.orderShareAmount).toBeUndefined();

        service.send('GET_QUOTE');
        await wait(0);
        expect(service.state.context.errors.orderShareAmount).not.toBeUndefined();
        service.send('SET_ORDER_SHARE_AMOUNT', { payload: { orderShareAmount: 1000 } });
        expect(service.state.context.errors.orderShareAmount).toBeUndefined();
      });
    });

    describe('when context.errors has a fatal error', () => {
      it('goes into failure state', async () => {
        service = interpreter({ errors: { fatal: 'Internal Server Error' } }).start();

        service.send('START_BUYING_ORDER');

        await wait(0);
        expect(service.state.value).toStrictEqual('failure');
      });
    });
  });
});
