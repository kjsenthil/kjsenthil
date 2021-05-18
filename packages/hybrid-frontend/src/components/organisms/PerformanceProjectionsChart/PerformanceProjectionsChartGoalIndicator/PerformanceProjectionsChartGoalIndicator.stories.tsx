import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceProjectionsChartGoalIndicator, {
  PerformanceProjectionsChartGoalIndicatorProps,
} from './PerformanceProjectionsChartGoalIndicator';

export default {
  title:
    'Digital Hybrid/Organisms/Performance Projections Chart/Performance Projections Chart Goal Indicator',
  component: PerformanceProjectionsChartGoalIndicator,
  argTypes: {
    top: {
      table: {
        disable: true,
      },
    },
    left: {
      table: {
        disable: true,
      },
    },
    progress: {
      description: 'Runs from 0 to 1',
      control: {
        type: 'number',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
  },
} as Meta;

const Template: Story<PerformanceProjectionsChartGoalIndicatorProps> = (args) => (
  <div style={{ position: 'relative' }}>
    <PerformanceProjectionsChartGoalIndicator {...args} />
  </div>
);

const defaultArgs: PerformanceProjectionsChartGoalIndicatorProps = {
  top: 0,
  left: 30,
  label: 'Retire',
  progress: 0.5,
  icon: '/goal-graphic.png',
};

export const Default = Template.bind({});
Default.args = defaultArgs;
