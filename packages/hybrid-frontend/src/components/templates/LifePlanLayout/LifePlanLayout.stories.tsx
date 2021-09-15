/* eslint-disable @typescript-eslint/dot-notation */
/* Disabled so that we can use dayjs()['add'] instead of dayjs().add(). This is a work around for
   this bug: https://github.com/storybookjs/storybook/issues/12208 */
import * as React from 'react';
import dayjs from 'dayjs';
import { Meta, Story } from '@storybook/react/types-6-0';
import LifePlanLayout, { LifePlanGoalsData, LifePlanLayoutProps } from './LifePlanLayout';
import { DefaultViewSelectionValue } from '../../pages/LifePlanPage/GoalSelection/config';
// @ts-ignore Storybook's webpack can load this just fine
import retirementIcon from '../../../../../react-components/static/goals/large/retirement.jpg';
// @ts-ignore Storybook's webpack can load this just fine
import buyingAHomeIcon from '../../../../../react-components/static/goals/large/buying-a-home.jpg';
import myChildsEducationIcon from '../../../../../react-components/static/goals/large/my-childs-education.png';

const noControl = {
  control: {
    type: null,
  },
};

export default {
  title: 'Digital Hybrid/Templates/Life Plan Layout',
  component: LifePlanLayout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    filterButtons: noControl,
    projectionChart: noControl,
    goalSelection: noControl,
    goalTiles: noControl,
    nextStepCards: noControl,
  },
} as Meta;

const goalSelectionTiles = [
  {
    name: 'Retirement',
    iconSrc: '/goals/retirement.webp',
  },
  {
    name: 'Buying a home',
    iconSrc: '/goals/buying-a-home.webp',
    disabled: true,
  },
  {
    name: "My child's education",
    iconSrc: '/goals/my-childs-education.webp',
    disabled: true,
  },
  {
    name: 'Something else',
    iconSrc: '/goals/something-else.webp',
    disabled: true,
  },
  {
    name: 'Just grow my money',
    iconSrc: '/goals/just-grow-my-money.webp',
    disabled: true,
  },
];

const mockGoalsData: LifePlanGoalsData[] = [
  {
    name: 'Retirement',
    category: 1,
    iconSrc: retirementIcon,
    lumpSumDate: dayjs().subtract(1, 'year').toDate(),
    startDate: dayjs()['add'](9, 'year').toDate(),
    endDate: dayjs()['add'](29, 'year').toDate(),
    ageAtLumpSumDate: 57,
    ageAtStartDate: 67,
    ageAtEndDate: 87,
    affordableAmount: 840_000,
    affordableAmountUnderperform: 634_000,
    targetAmount: 1_765_000,
    shortfall: 1_135_000,
    onTrackPercentage: 0.425316,
    lumpSum: 210_000,
    totalAffordableDrawdown: 574_000,
    remainingAmount: 56_000,
    accounts: ['ISA', 'SIPP', 'GIA'],
  },
  {
    name: 'Buying a home',
    category: 2,
    iconSrc: buyingAHomeIcon,
    lumpSumDate: undefined,
    startDate: undefined,
    endDate: dayjs()['add'](1, 'year').toDate(),
    ageAtLumpSumDate: undefined,
    ageAtStartDate: undefined,
    ageAtEndDate: 41,
    affordableAmount: 234_000,
    targetAmount: 220_000,
    shortfall: 14_000,
    onTrackPercentage: 1.0,
    lumpSum: undefined,
    totalAffordableDrawdown: undefined,
    remainingAmount: undefined,
    accounts: ['ISA', 'SIPP', 'GIA'],
  },
  {
    name: "Olivia's education",
    category: 3,
    iconSrc: myChildsEducationIcon,
    lumpSumDate: undefined,
    startDate: dayjs().subtract(1, 'year').toDate(),
    endDate: dayjs()['add'](5, 'year').toDate(),
    ageAtLumpSumDate: undefined,
    ageAtStartDate: 41,
    ageAtEndDate: 45,
    affordableAmount: 180_000,
    targetAmount: 220_000,
    shortfall: -40_000,
    onTrackPercentage: 0.8181818,
    lumpSum: undefined,
    totalAffordableDrawdown: undefined,
    remainingAmount: undefined,
    accounts: ['ISA', 'SIPP', 'GIA', 'GIA'],
  },
];

const ProjectionChart = () => <div>Pretend that this is the projection chart.</div>;

const Template: Story<Pick<LifePlanLayoutProps, 'goalsData' | 'toDoListData'>> = ({
  goalsData,
  toDoListData,
}) => {
  const [currentView, setCurrentView] = React.useState<string>(DefaultViewSelectionValue.ALL_GOALS);

  return (
    <LifePlanLayout
      currentView={currentView}
      goalSelectionTiles={goalSelectionTiles}
      goToAllGoalsView={() => setCurrentView(DefaultViewSelectionValue.ALL_GOALS)}
      goToCreateGoalView={() => {}}
      goToSingleGoalView={(newView) => setCurrentView(newView)}
      goalsData={goalsData}
      allGoalsOnTrackPercentage={0.56}
      projectionChart={<ProjectionChart />}
      toDoListData={toDoListData}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  goalsData: mockGoalsData,
};

export const NoGoals = Template.bind({});
NoGoals.args = {};

export const WithTodoList = Template.bind({});
WithTodoList.args = {
  goalsData: mockGoalsData,
  toDoListData: [],
};
