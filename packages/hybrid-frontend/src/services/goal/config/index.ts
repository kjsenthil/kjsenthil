import { GoalCategory, GoalDatum } from '../types';

export enum GoalDefaults {
  AVERAGE_DRAW_DOWN_PERIOD_IN_YEARS = 22,
  EXPECTED_RETURN_OF_TAA = 0.043,
  INFLATION = 0.02,
  DRAW_DOWN_START_AGE = 65,
  DRAW_DOWN_END_AGE = 87,
}

export const goalDataForChart: Record<GoalCategory, GoalDatum> = {
  [GoalCategory.RETIREMENT]: {
    date: new Date(),
    progress: 0,
    label: 'Retirement',
    icon: '/goal-graphic.png',
    targetAmount: 0,
  },
  [GoalCategory.MORTGAGE]: {
    date: new Date(),
    progress: 0,
    label: 'Mortgage',
    icon: '/goal-graphic.png',
    targetAmount: 0,
  },
  [GoalCategory.INVESTMENT]: {
    date: new Date(),
    progress: 0,
    label: 'Investment',
    icon: '/goal-graphic.png',
    targetAmount: 0,
  },
  [GoalCategory.PROTECTION]: {
    date: new Date(),
    progress: 0,
    label: 'Protection',
    icon: '/goal-graphic.png',
    targetAmount: 0,
  },
  [GoalCategory.UNCATEGORIZED]: {
    date: new Date(),
    progress: 0,
    label: 'Uncategorized',
    icon: '/goal-graphic.png',
    targetAmount: 0,
  },
  [GoalCategory.LONG_TERM_CARE]: {
    date: new Date(),
    progress: 0,
    label: 'Long term care',
    icon: '/goal-graphic.png',
    targetAmount: 0,
  },
  [GoalCategory.ESTATE_PLANNING]: {
    date: new Date(),
    progress: 0,
    label: 'Estate Planning',
    icon: '/goal-graphic.png',
    targetAmount: 0,
  },
  [GoalCategory.CLIENT_INITIATED]: {
    date: new Date(),
    progress: 0,
    label: 'Client Initiated',
    icon: '/goal-graphic.png',
    targetAmount: 0,
  },
  [GoalCategory.GENERAL_INSURANCE]: {
    date: new Date(),
    progress: 0,
    label: 'General Insurance',
    icon: '/goal-graphic.png',
    targetAmount: 0,
  },
  [GoalCategory.MEDICAL_INSURANCE]: {
    date: new Date(),
    progress: 0,
    label: 'Medical Insurance',
    icon: '/goal-graphic.png',
    targetAmount: 0,
  },
};
