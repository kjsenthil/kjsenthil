/**
 * This file contains Jest test cases for getGoalSelectionTiles.
 */

import { GoalCategory } from '../../../../services/goal';
import { goalSelectionTilesConfig } from './config';

const mockGoalsData = [
  { category: GoalCategory.RETIREMENT },
  { category: GoalCategory.MORTGAGE },
  { category: GoalCategory.MORTGAGE },
  { category: GoalCategory.INVESTMENT },
  { category: GoalCategory.INVESTMENT },
];

const testCases = [
  [
    'returns the full set of goal creation tile configs when there are no goal creation limits',
    {
      goalsData: mockGoalsData,
      goalSelectionTilesConfig,
    },
    goalSelectionTilesConfig,
  ],
  [
    'returns the full set of goal creation tile configs when no goals have been created yet',
    {
      goalsData: [],
      goalSelectionTilesConfig,
      goalCreationLimits: {
        [GoalCategory.RETIREMENT]: 1,
      },
    },
    goalSelectionTilesConfig,
  ],
  [
    'returns the correct set of goal creation tile configs there are goal creation limits',
    {
      goalsData: mockGoalsData,
      goalSelectionTilesConfig,
      goalCreationLimits: {
        [GoalCategory.RETIREMENT]: 1,
        [GoalCategory.INVESTMENT]: 1,
      },
    },
    goalSelectionTilesConfig.filter(
      ({ category }) => ![GoalCategory.RETIREMENT, GoalCategory.INVESTMENT].includes(category)
    ),
  ],
  [
    'returns a the correct set of goal creation tile configs there are goal creation limits (with limit other than 1)',
    {
      goalsData: mockGoalsData,
      goalSelectionTilesConfig,
      goalCreationLimits: {
        [GoalCategory.RETIREMENT]: 2,
        [GoalCategory.INVESTMENT]: 1,
      },
    },
    goalSelectionTilesConfig.filter(
      // We can create at most 2 Retirement goals and have created only 1. Thus
      // only the Investment tiles should be omitted.
      ({ category }) => ![GoalCategory.INVESTMENT].includes(category)
    ),
  ],
];

export default testCases;
