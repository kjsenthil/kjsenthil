import { GoalSelectionProps as GoalSelectionOrganismProps } from '@tswdts/react-components';

export type GoalSelectionTiles = GoalSelectionOrganismProps['tiles'];

export type GoalName =
  | 'Retirement'
  | 'Buying a home'
  | "My child's education"
  | 'Something else'
  | 'Just grow my money';

export const goalSelectionAllTiles: GoalSelectionTiles = [
  {
    name: 'Retirement',
    iconSrc: 'goals/retirement.webp',
  },
  {
    name: 'Buying a home',
    iconSrc: 'goals/buying-a-home.webp',
    disabled: true,
  },
  {
    name: "My child's education",
    iconSrc: 'goals/my-childs-education.webp',
    disabled: true,
  },
  {
    name: 'Something else',
    iconSrc: 'goals/something-else.webp',
    disabled: true,
  },
  {
    name: 'Just grow my money',
    iconSrc: 'goals/just-grow-my-money.webp',
    disabled: true,
  },
];

export enum DefaultViewSelectionValue {
  ALL_GOALS = 'All goals',
  CREATE_GOAL = 'Add a goal',
  EDIT_THIS_GOAL = 'Edit this goal',
}

export type LifePlanLayoutView = GoalName | DefaultViewSelectionValue;
