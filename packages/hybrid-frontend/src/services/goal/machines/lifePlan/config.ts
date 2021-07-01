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
    'calculateAge',
    'reEvaluateDrawdownStartAge',
    'calculateAnnualNetExpectedReturn',
    'calculateMonthlyNetExpectedReturn',
    'calculateDrawdownDates',
    'calculateDrawdownPeriodLength',
  ],
  context,
  states: {
    planningYourRetirement: {
      id: 'planningYourRetirement',
      initial: 'processingInput',
      on: {
        SAVE: '.saving',
        SET_DRAWDOWN_AGES: [
          {
            target: '.processingInput',
            actions: ['resetErrors', 'setDrawdownAges'],
          },
        ],
        SET_INCOME: [
          {
            target: '.processingInput',
            actions: ['resetErrors', 'setIncome'],
          },
        ],
        SET_LUMP_SUM: {
          actions: ['takeLumpSum', 'calculateRetirementPotValue'],
        },
        SET_LATER_LIFE_LEFT_OVER: {
          actions: ['setLaterLifeLeftOver', 'calculateRetirementPotValue'],
        },
      },
      states: {
        processingInput: {
          entry: [
            'calculateTomorrowsMoney',
            'calculateDrawdownDates',
            'calculateDrawdownPeriodLength',
            'calculateTargetDrawdownAmount',
            'calculateRetirementPotValue',
            'calculateTomorrowsMoney',
          ],
          invoke: {
            id: 'processingInput',
            src: 'updateCurrentProjections',
            onDone: {
              target: 'normal',
            },

            onError: {
              target: 'invalid',
              actions: ['setErrors'],
            },
          },
        },
        normal: {},
        invalid: {},
        saving: {
          invoke: {
            id: 'saveRetirementPlan',
            src: 'saveRetirementPlan',
            onDone: {
              target: '#lifePlan.fundingYourRetirement',
            },
            onError: {
              target: 'invalid',
              actions: ['setErrors'],
            },
          },
        },
      },
    },

    fundingYourRetirement: {},
  },
};

export default lifePlanConfig;
