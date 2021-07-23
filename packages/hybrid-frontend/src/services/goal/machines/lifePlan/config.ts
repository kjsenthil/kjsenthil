import { MachineConfig } from 'xstate';
import { LifePlanMachineContext, LifePlanMachineEvents, LifePlanMachineSchema } from './types';
import context from './context';

const afterInvokeCalculation = [
  'calculateDrawdownDates',
  'calculateDrawdownPeriodLength',
  'calculateTargetDrawdownAmount',
  'calculateRetirementPotValue',
  'calculateTomorrowsMoney',
];

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
      initial: 'bootstrapping',
      on: {
        SET_DRAWDOWN_AGES: [
          {
            actions: [
              'resetErrors',
              'setDrawdownAges',
              'calculateDrawdownDates',
              'calculateDrawdownPeriodLength',
            ],
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
        SAVE: '.saving',
        DELETE: '.deleting',
      },
      states: {
        bootstrapping: {
          invoke: {
            id: 'bootstrapping',
            src: 'bootstrap',
            onDone: {
              target: 'processingInput',
              actions: ['prepopulate', ...afterInvokeCalculation],
            },
            onError: {
              target: 'invalid',
              actions: ['setErrors'],
            },
          },
        },
        processingInput: {
          entry: afterInvokeCalculation,
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
            id: 'upsertGoal',
            src: 'upsertGoal',
            onDone: {
              target: '#lifePlan.fundingYourRetirement',
            },
            onError: {
              target: 'invalid',
              actions: ['setErrors'],
            },
          },
        },
        deleting: {
          invoke: {
            id: 'deleteGoal',
            src: 'deleteGoal',
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
