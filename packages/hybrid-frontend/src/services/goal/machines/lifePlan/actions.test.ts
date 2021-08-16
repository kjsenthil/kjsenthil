import { Machine, interpret } from 'xstate';
import { Interpreter } from 'xstate/lib/interpreter';
import actions from './actions';
import context from './context';
import { LifePlanMachineContext } from './types';
import * as math from '../../../../utils/math';

const DummyMachine = Machine<LifePlanMachineContext, any, any>({
  id: 'dummy',
  initial: 'idle',
  context,
  on: {
    SET_DRAWDOWN_AGES: {
      actions: [
        actions.setDrawdownAges,
        actions.calculateDrawdownDates,
        actions.calculateDrawdownPeriodLength,
      ],
    },
    SET_INDEX: {
      actions: [actions.setIndex],
    },
    SET_INCOME: {
      actions: [actions.setIncome],
    },
    SET_LUMP_SUM: {
      actions: [actions.setLumpSumAmount],
    },
    SET_LUMP_SUM_AGE: {
      actions: [actions.setLumpSumAge],
    },
    SET_LATER_LIFE_LEFT_OVER: {
      actions: [actions.setLaterLifeLeftOver],
    },
    SET_HAS_FETCHED_PROJECTIONS: {
      actions: [actions.setHasFetchedProjections],
    },
    PREPOPULATE: {
      actions: [actions.prepopulate],
    },
    CALCULATE_RETIREMENT_POT_VALUE: {
      actions: [actions.calculateRetirementPotValue],
    },
    CALUCLATE_LUMP_SUM_DATE: {
      actions: [actions.calcuateLumpSumDate],
    },
    CALCULATE_DRAWDOWN_PERIOD_LENGTH: {
      actions: [actions.calculateDrawdownPeriodLength],
    },
    CALCULATE_INCOME_AFTER_INFLATION: {
      actions: [actions.calculateTomorrowsMoney],
    },
    CALCULATE_AGE: {
      actions: [actions.calculateAge],
    },
  },
  states: {
    idle: {},
  },
});

const initialContext = {
  userDateOfBirth: new Date('1980-03-10T00:00:00.000Z'),
  expectedReturnOfTAA: 0.043,
  inflation: 0.02,
};

describe('lifePlan actions', () => {
  let service: Interpreter<LifePlanMachineContext, any, any>;

  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2021-06-01').getTime());
  });

  describe('basic setters ', () => {
    beforeAll(() => {
      service = interpret(
        DummyMachine.withContext({
          ...context,
          ...initialContext,
        })
      ).start();
    });

    it('sets index', () => {
      const index = 123456789;
      expect(service.state.context.index).toBeNull();

      service.send('SET_INDEX', { data: { index } });
      expect(service.state.context.index).toStrictEqual(index);
    });

    it('sets hasFetchedProjections', () => {
      expect(service.state.context.hasFetchedProjections).toBeFalse();

      service.send('SET_HAS_FETCHED_PROJECTIONS');
      expect(service.state.context.hasFetchedProjections).toBeTrue();
    });
  });

  describe('Prepopulate data', () => {
    beforeAll(() => {
      service = interpret(
        DummyMachine.withContext({
          ...context,
          ...initialContext,
        })
      ).start();
    });

    it('updates context with a given set of data', () => {
      const data = {
        index: 12345678,
        monthlyIncome: 2000,
        annualIncome: 24000,
        drawdownStartAge: 70,
        drawdownEndAge: 90,
        shouldIncludeStatePension: true,
      };

      expect(service.state.context.index).toBeNull();
      service.send('PREPOPULATE', { data });
      expect(service.state.context).toStrictEqual({ ...context, ...initialContext, ...data });
    });
  });

  describe('Setting ages', () => {
    beforeAll(() => {
      service = interpret(
        DummyMachine.withContext({
          ...context,
          ...initialContext,
        })
      ).start();

      service.send('SET_DRAWDOWN_AGES', { payload: { drawdownStartAge: 61, drawdownEndAge: 89 } });
    });

    it('sets drawdown ages with the given payload', () => {
      expect(service.state.context.drawdownEndAge).toStrictEqual(89);
      expect(service.state.context.drawdownStartAge).toStrictEqual(61);
    });

    it('sets start and end dates based on birthday', () => {
      expect(service.state.context.drawdownStartDate?.toISOString()).toStrictEqual(
        '2041-03-10T00:00:00.000Z'
      );
      expect(service.state.context.drawdownEndDate?.toISOString()).toStrictEqual(
        '2069-03-10T00:00:00.000Z'
      );
    });
  });

  describe('Calculating drawdown period length', () => {
    const prerequestContext = {
      drawdownStartAge: 61,
      drawdownEndAge: 89,
      drawdownStartDate: new Date('2041-03-10T00:00:00.000Z'),
      drawdownEndDate: new Date('2069-03-10T00:00:00.000Z'),
    };

    describe('when users age has not passed the starting age', () => {
      beforeAll(() => {
        service = interpret(
          DummyMachine.withContext({
            ...context,
            ...initialContext,
            ...prerequestContext,
          })
        ).start();

        service.send(['CALCULATE_AGE', 'CALCULATE_DRAWDOWN_PERIOD_LENGTH']);
      });

      it('calculate drawdownPeriodLengthMonths from start age to end age', () => {
        const diffInYears = 28;
        const diffInMonths = diffInYears * 12;
        expect(service.state.context.drawdownPeriodLengthMonths).toStrictEqual(diffInMonths);
      });
    });

    describe('when users age has not passed the retirement starting age', () => {
      beforeAll(() => {
        service = interpret(
          DummyMachine.withContext({
            ...context,
            ...initialContext,
            ...prerequestContext,
            drawdownStartAge: 40, // user is already 41 given the date of birth of 10/03/1980
            drawdownStartDate: new Date('2021-03-10T00:00:00.000Z'),
          })
        ).start();

        service.send(['CALCULATE_AGE', 'CALCULATE_DRAWDOWN_PERIOD_LENGTH']);
      });

      it('calculate drawdownPeriodLengthMonths from todays date until the retirement end date', () => {
        /**
         * 47 years and 3 months diff between todays date mocked at 2021-06-01 and drawdownEndDate at 2069-03-10
         */
        const diffInMonths = 47 * 12 + 9;
        expect(service.state.context.drawdownPeriodLengthMonths).toStrictEqual(diffInMonths);
      });
    });
  });

  describe('Setting income', () => {
    describe.each`
      annualIncome | monthlyIncome
      ${72000}     | ${6000}
      ${-72000}    | ${6000}
      ${100000}    | ${8333}
    `(
      'when annualIncome is provided with value: $annualIncome',
      ({ annualIncome, monthlyIncome }: { annualIncome: number; monthlyIncome: number }) => {
        beforeAll(() => {
          service = interpret(
            DummyMachine.withContext({
              ...context,
              ...initialContext,
            })
          ).start();

          service.send('SET_INCOME', { payload: { annualIncome } });
        });

        it('sets annual income and calculates and sets monthly income', () => {
          expect(service.state.context.annualIncome).toStrictEqual(Math.abs(annualIncome));
          expect(service.state.context.monthlyIncome).toStrictEqual(Math.abs(monthlyIncome));
        });
      }
    );

    describe.each`
      annualIncome | monthlyIncome
      ${72000}     | ${-6000.13}
      ${72012}     | ${6000.73}
    `(
      'when monthlyIncome is provided',
      ({ annualIncome, monthlyIncome }: { annualIncome: number; monthlyIncome: number }) => {
        beforeAll(() => {
          service = interpret(
            DummyMachine.withContext({
              ...context,
              ...initialContext,
            })
          ).start();

          service.send('SET_INCOME', { payload: { monthlyIncome } });
        });

        it('sets annual income and calculates and sets monthly income', () => {
          expect(service.state.context.annualIncome).toStrictEqual(Math.abs(annualIncome));
          expect(service.state.context.monthlyIncome).toStrictEqual(
            Math.round(Math.abs(monthlyIncome))
          );
        });
      }
    );
  });

  describe('setLaterLifeLeftOver', () => {
    beforeAll(() => {
      service = interpret(
        DummyMachine.withContext({
          ...context,
          ...initialContext,
        })
      ).start();

      service.send('SET_LATER_LIFE_LEFT_OVER', { payload: { laterLifeLeftOver: 100000 } });
    });

    it('sets later life left over amount', () => {
      expect(service.state.context.laterLifeLeftOver).toStrictEqual(100000);
    });
  });

  describe('Setting lumpSum and lumpSum ages', () => {
    beforeAll(() => {
      service = interpret(
        DummyMachine.withContext({
          ...context,
          ...initialContext,
        })
      ).start();
    });

    it('sets lump sum amount', () => {
      expect(service.state.context.lumpSum).toStrictEqual(0);
      expect(service.state.context.lumpSumAge).toStrictEqual(0);

      service.send('SET_LUMP_SUM', { payload: { lumpSum: 100000 } });
      service.send('SET_LUMP_SUM_AGE', { payload: { lumpSumAge: 65 } });

      expect(service.state.context.lumpSum).toStrictEqual(100000);
      expect(service.state.context.lumpSumAge).toStrictEqual(65);
    });

    it('calcualtes lumpSum date', () => {
      expect(service.state.context.lumpSumDate).toBeNull();

      service.send('CALUCLATE_LUMP_SUM_DATE');

      expect(service.state.context.lumpSumDate).toStrictEqual(new Date(2045, 2, 10));
    });
  });

  describe('calculateRetirementPotValue', () => {
    beforeAll(() => {
      service = interpret(
        DummyMachine.withContext({
          ...context,
          ...initialContext,
          lumpSum: 100000,
          laterLifeLeftOver: 100000,
          targetDrawdownAmount: 500000,
        })
      ).start();

      service.send('CALCULATE_RETIREMENT_POT_VALUE');
    });

    it('sets retirement pot value by adding up targetDrawdownAmount, lumpSum and desiredAmountAtRetirementEnd', () => {
      expect(service.state.context.retirementPotValue).toStrictEqual(700000);
    });
  });

  describe('calculateRetirementPotValue', () => {
    const prerequestContext = {
      ...initialContext,
      annualIncome: 72000,
      drawdownStartDate: new Date(2025, 1, 10),
    };

    beforeAll(() => {
      service = interpret(
        DummyMachine.withContext({
          ...context,
          ...prerequestContext,
        })
      ).start();

      service.send('CALCULATE_INCOME_AFTER_INFLATION');
    });

    it('calculates the annual and monthly income after inflation', () => {
      const annualIncomeAfterInflation = Math.round(
        math.calculateAnnualReturnAfterInflation({
          inflation: prerequestContext.inflation,
          annualIncome: prerequestContext.annualIncome,
          timePeriodInYears: 4,
        })
      );

      expect(service.state.context.annualIncomeInTomorrowsMoney).toStrictEqual(
        annualIncomeAfterInflation
      );
      expect(service.state.context.monthlyIncomeInTomorrowsMoney).toStrictEqual(
        Math.round(annualIncomeAfterInflation / 12)
      );
    });
  });
});
