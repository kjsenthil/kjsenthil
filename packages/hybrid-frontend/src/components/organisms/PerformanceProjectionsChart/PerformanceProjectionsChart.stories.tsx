import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceProjectionsChart, {
  PerformanceProjectionsChartProps,
} from './PerformanceProjectionsChart';
import {
  initialPerformanceProjectionsDataState,
  initialPerformanceProjectionsDataStateGoalNotMet,
  PerformanceProjectionsDataContextProvider,
} from './data/performanceProjectionsChartDataContext';

export default {
  title: 'Digital Hybrid/Organisms/Performance Projections Chart/Performance Projections Chart',
  component: PerformanceProjectionsChart,
  argTypes: {
    goalMet: {
      control: {
        type: null,
      },
    },
  },
} as Meta;

interface StoryComponentProps extends PerformanceProjectionsChartProps {
  goalMet: boolean;
}

const Template: Story<StoryComponentProps> = ({ goalMet, ...args }) => (
  <PerformanceProjectionsDataContextProvider
    initialState={
      goalMet
        ? initialPerformanceProjectionsDataState
        : initialPerformanceProjectionsDataStateGoalNotMet
    }
  >
    <div
      style={{
        padding: 10,
      }}
    >
      <PerformanceProjectionsChart {...args} />
    </div>
  </PerformanceProjectionsDataContextProvider>
);

const defaultArgs: StoryComponentProps = {
  goalMet: true,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const GoalNotMet = Template.bind({});
GoalNotMet.args = {
  ...defaultArgs,
  goalMet: false,
};
