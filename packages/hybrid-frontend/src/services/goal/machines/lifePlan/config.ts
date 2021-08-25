import { MachineConfig } from 'xstate';
import { LifePlanMachineContext, LifePlanMachineEvents, LifePlanMachineSchema } from './types';
import context from './context';

const afterInvokeCalculation = [
  'calculateDrawdownDates',
  'calculateDrawdownPeriodLength',
  'calculateTargetDrawdownAmount',
  'calculateRetirementPotValue',
  'calculateTomorrowsMoney',
  'calcuateLumpSumDate',
];

const createinputProcessingState = () => ({
  entry: afterInvokeCalculation,
  invoke: {
    id: 'inputProcessing',
    src: 'updateSimulateProjections',
    onDone: {
      target: 'normal',
      actions: ['resetErrors', 'setHasFetchedProjections'],
    },
    onError: {
      target: 'invalid',
      actions: ['setErrors'],
    },
  },
});

const createSavingState = (onDoneTarget: string) => ({
  invoke: {
    id: 'upsertGoal',
    src: 'upsertGoal',
    onDone: {
      target: onDoneTarget,
      actions: ['setIndex', ...afterInvokeCalculation],
    },
    onError: {
      target: 'invalid',
      actions: ['setErrors'],
    },
  },
});

const createDeletingState = () => ({
  invoke: {
    id: 'deleteGoal',
    src: 'deleteGoal',
    onDone: {
      target: '#lifePlan.finished',
    },
    onError: {
      target: 'invalid',
      actions: ['setErrors'],
    },
  },
});

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
    'calcuateLumpSumDate',
  ],
  context,
  states: {
    planningYourRetirement: {
      id: 'planningYourRetirement',
      initial: 'bootstrapping',
      on: {
        SET_DRAWDOWN_AGES: [
          {
            target: '.validateDrawdownAges',
            actions: [
              'resetErrors',
              'resetHasFetchedProjections',
              'setDrawdownAges',
              'calculateDrawdownDates',
              'calculateDrawdownPeriodLength',
              'calculateTargetDrawdownAmount',
              'calculateRetirementPotValue',
            ],
          },
        ],
        SWITCH_TO_FUNDING: {
          target: '#lifePlan.fundingYourRetirement.inputProcessing',
          cond: 'doesGoalExist',
        },
        SET_INCOME: [
          {
            target: '.inputProcessing',
            actions: [
              'resetHasFetchedProjections',
              'setIncome',
              'calculateTomorrowsMoney',
              'calculateRetirementPotValue',
            ],
          },
        ],
        SET_LUMP_SUM_AMOUNT: {
          target: '.preInputProcessing',
          actions: [
            'resetHasFetchedProjections',
            'setLumpSumAmount',
            'calculateRetirementPotValue',
          ],
        },
        SET_LUMP_SUM_AGE: {
          target: '.validateLumpSumAge',
          actions: ['resetHasFetchedProjections', 'setLumpSumAge', 'calcuateLumpSumDate'],
        },
        SET_LATER_LIFE_LEFT_OVER: {
          target: '.preInputProcessing',
          actions: [
            'resetHasFetchedProjections',
            'setLaterLifeLeftOver',
            'calculateRetirementPotValue',
          ],
        },
        FETCH_PROJETIONS: {
          target: '.inputProcessing',
          cond: 'shouldFetchProjections',
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
              target: 'normal',
              actions: ['prepopulate', 'calculateAge', ...afterInvokeCalculation],
            },
            onError: {
              target: 'invalid',
              actions: ['setErrors'],
            },
          },
        },
        normal: {},
        invalid: {},
        preInputProcessing: {
          on: {
            '': [{ target: 'inputProcessing', cond: 'doesGoalExist' }, { target: 'normal' }],
          },
        },
        validateDrawdownAges: {
          after: {
            5: [
              {
                target: 'normal',
                cond: 'areDrawdownDatesValid',
              },
              {
                target: 'invalid',
                actions: ['validateDrawdownAges'],
              },
            ],
          },
        },
        validateLumpSumAge: {
          after: {
            5: [
              {
                target: 'normal',
                cond: 'isLumpSumDateValid',
              },
              { target: 'invalid', actions: ['resetErrors', 'validateLumpSumAge'] },
            ],
          },
        },
        inputProcessing: createinputProcessingState(),
        saving: createSavingState('#lifePlan.fundingYourRetirement'),
        deleting: createDeletingState(),
      },
    },
    fundingYourRetirement: {
      id: 'fundingYourRetirement',
      initial: 'inputProcessing',
      on: {
        SWITCH_TO_PLANNING: {
          target: '#lifePlan.planningYourRetirement.inputProcessing',
        },
        SET_INCLUDE_STATE_PENSION: {
          target: '.inputProcessing',
          actions: ['setIncludeStatePension'],
        },
        SET_ADDITIONAL_MONTHLY_CONTRIBUTIONS: {
          target: '.inputProcessing',
          actions: ['setAdditionalMonthlyContributions'],
        },
        SET_UPFRONT_CONTRIBUTION: {
          target: '.inputProcessing',
          actions: ['setUpfrontContribution'],
        },
        SAVE: '.saving',
        DELETE: '.deleting',
      },
      states: {
        normal: {},
        invalid: {},
        inputProcessing: createinputProcessingState(),
        saving: createSavingState('#lifePlan.finished'),
        deleting: createDeletingState(),
      },
    },

    finished: {
      type: 'final',
    },
  },
};

export default lifePlanConfig;
