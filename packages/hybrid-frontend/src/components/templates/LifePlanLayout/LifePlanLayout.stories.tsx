import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { GoalProgressCardProps } from '@tswdts/react-components';
import LifePlanLayout, { LifePlanLayoutProps } from './LifePlanLayout';
import { DefaultViewSelectionValue, GoalName, LifePlanLayoutView } from './config/config';

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

const mockGoalsData: Partial<Record<GoalName, GoalProgressCardProps>> = {
  Retirement: {
    onTrackPercentage: 0.72,
    affordableValues: [700000, 500000, 242000],
    goalValue: 1975000,
    shortfallValue: 553000,
    shortfallUnderperformValue: 689000,
    title: 'Retirement',
    iconSrc: '/goal-graphic.png',
    iconAlt: 'goal graphic',
    investmentAccounts: ['ISA', 'GIA', 'SIPP'],
    navigateToEditGoalPage: () => {},
  },
  'Buying a home': {
    onTrackPercentage: 0.72,
    affordableValues: [700000, 500000, 242000],
    goalValue: 1975000,
    shortfallValue: 553000,
    shortfallUnderperformValue: 689000,
    title: 'Buying a home',
    iconSrc: '/goal-graphic.png',
    iconAlt: 'goal graphic',
    investmentAccounts: ['ISA', 'GIA', 'SIPP'],
    navigateToEditGoalPage: () => {},
  },
  "My child's education": {
    onTrackPercentage: 0.72,
    affordableValues: [700000, 500000, 242000],
    goalValue: 1975000,
    shortfallValue: 553000,
    shortfallUnderperformValue: 689000,
    title: "My child's education",
    iconSrc: '/goal-graphic.png',
    iconAlt: 'goal graphic',
    investmentAccounts: ['ISA', 'GIA', 'SIPP'],
    navigateToEditGoalPage: () => {},
  },
};

const ProjectionChart = () => <div>Pretend that this is the projection chart.</div>;

const Template: Story<Pick<LifePlanLayoutProps, 'goalsData' | 'toDoListData'>> = ({
  goalsData,
  toDoListData,
}) => {
  const [currentView, setCurrentView] = React.useState<LifePlanLayoutView>(
    DefaultViewSelectionValue.ALL_GOALS
  );

  return (
    <LifePlanLayout
      currentView={currentView}
      editThisGoalHref=""
      goToAllGoalsView={() => setCurrentView(DefaultViewSelectionValue.ALL_GOALS)}
      goToCreateGoalView={() => {
        // Do nothing here...
        // In the actual page, this action will navigate to the Goal Creation
        // page
      }}
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
