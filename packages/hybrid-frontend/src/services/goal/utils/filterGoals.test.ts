import { CurrentGoals, GoalCategory, GoalStatus } from '../types';
import filterGoals from './filterGoals';

const goals = ([
  {
    index: 1775895688,
    fields: {
      status: GoalStatus.FULFILLED_PARTIALLY,
      category: GoalCategory.RETIREMENT,
      description: 'Retirement1',
    },
  },
  {
    index: 1775895689,
    fields: {
      status: GoalStatus.CANCELLED,
      category: GoalCategory.RETIREMENT,
      description: 'Retirement2',
    },
  },
  {
    index: 1775895690,
    fields: {
      status: GoalStatus.UNFULFILLED,
      category: GoalCategory.RETIREMENT,
      description: 'Retirement3',
    },
  },
  {
    index: 1775895691,
    fields: {
      status: GoalStatus.UNFULFILLED,
      category: GoalCategory.INVESTMENT,
      description: 'Child education',
    },
  },
  {
    index: 1775895692,
    fields: {
      status: GoalStatus.UNFULFILLED,
      category: GoalCategory.RETIREMENT,
      description: 'Retirement4',
    },
  },
  {
    index: 1775895693,
    fields: {
      status: GoalStatus.CANCELLED,
      category: GoalCategory.GENERAL_INSURANCE,
      description: 'General insurance',
    },
  },
  {
    index: 1775895694,
    fields: {
      status: GoalStatus.CANCELLED,
      category: GoalCategory.ESTATE_PLANNING,
      description: 'Estate planning',
    },
  },
] as unknown) as CurrentGoals;

describe('filterGoals', () => {
  it('returns the latest uncancelled goals in an array', () => {
    expect(filterGoals(goals)).toStrictEqual([
      {
        index: 1775895691,
        fields: {
          status: GoalStatus.UNFULFILLED,
          category: GoalCategory.INVESTMENT,
          description: 'Child education',
        },
      },
      {
        index: 1775895692,
        fields: {
          status: GoalStatus.UNFULFILLED,
          category: GoalCategory.RETIREMENT,
          description: 'Retirement4',
        },
      },
    ]);
  });
});
