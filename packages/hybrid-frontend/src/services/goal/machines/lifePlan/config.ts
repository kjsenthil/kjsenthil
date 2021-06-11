import { MachineConfig } from 'xstate';
import { LifePlanMachineContext, LifePlanMachineEvents, LifePlanMachineSchema } from './types';
import context from './context';

const lifePlanConfig: MachineConfig<
  LifePlanMachineContext,
  LifePlanMachineSchema,
  LifePlanMachineEvents
> = {
  id: 'lifePlan',
  initial: 'planningYourRetirement',
  entry: [
    'calculateAnnualNetExpectedReturn',
    'calculateMonthlyNetExpectedReturn',
    'calculateDrawdownDates',
    'calculateDrawdownPeriodLength',
    'calculateAge',
  ],
  context,
  states: {
    planningYourRetirement: {
      on: {
        SAVE: 'saving',
        SET_DRAWDOWN_AGES: {
          actions: [
            'setDrawdownAges',
            'calculateTomorrowsMoney',
            'calculateDrawdownDates',
            'calculateDrawdownPeriodLength',
          ],
        },
        SET_INCOME: {
          actions: [
            'setIncome',
            'calculateTargetDrawdownAmount',
            'calculateRetirementPotValue',
            'calculateTomorrowsMoney',
          ],
        },
        SET_LUMP_SUM: {
          actions: ['takeLumpSum', 'calculateRetirementPotValue'],
        },
        SET_LATER_LIFE_LEFT_OVER: {
          actions: ['setLaterLifeLeftOver', 'calculateRetirementPotValue'],
        },
      },
    },
    saving: {
      invoke: {
        id: 'getUser',
        src: 'saveRetirementPlan',
        onDone: {
          target: 'fundingYourRetirement',
        },
        onError: {
          target: 'planningYourRetirement',
          actions: ['setErrors'],
        },
      },
    },

    fundingYourRetirement: {},
  },
};

export default lifePlanConfig;
