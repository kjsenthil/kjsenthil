import { GoalSelectionTile } from '@tswdts/react-components/src/components/organisms/GoalSelection/types';
import { NavPaths } from '../../../../config/paths';
import { GoalCategory } from '../../../../services/goal';

export type GoalCreationLimits = Partial<Record<GoalCategory, number>>;

// The number represents the limit of how many goal of this category can be
// created. Note that this is front-end ONLY (i.e. it will prevent the goal's
// creation tile of this category from being shown by the GoalSelection
// component).
// Any goal category that is not in this object will be treated as if it can be
// an unlimited number of times.
export const goalCreationLimits: GoalCreationLimits = {
  [GoalCategory.RETIREMENT]: 1,
  [GoalCategory.MORTGAGE]: 1,
};

export interface GoalSelectionTileConfig extends GoalSelectionTile {
  category: GoalCategory; // A goal's category is used to limit its creation to a certain amount
}

export const goalSelectionTilesConfig: GoalSelectionTileConfig[] = [
  {
    name: 'Retirement',
    iconSrc: '/goals/retirement.webp',
    href: NavPaths.LIFE_PLAN_MANAGEMENT,
    category: GoalCategory.RETIREMENT,
  },
  {
    name: 'Buying a home',
    iconSrc: '/goals/buying-a-home.webp',
    disabled: true,
    category: GoalCategory.MORTGAGE,
  },
  {
    name: "My child's education",
    iconSrc: '/goals/my-childs-education.webp',
    disabled: true,
    category: GoalCategory.INVESTMENT,
  },
  {
    name: 'Something else',
    iconSrc: '/goals/something-else.webp',
    disabled: true,
    category: GoalCategory.INVESTMENT,
  },
  {
    name: 'Just grow my money',
    iconSrc: '/goals/just-grow-my-money.webp',
    disabled: true,
    category: GoalCategory.INVESTMENT,
  },
];

export enum DefaultViewSelectionValue {
  ALL_GOALS = 'All goals',
  CREATE_GOAL = 'Add a goal',
  EDIT_THIS_GOAL = 'Edit this goal',
}
