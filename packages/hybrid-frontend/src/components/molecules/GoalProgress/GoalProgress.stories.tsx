import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalProgress, { GoalProgressProps } from './GoalProgress';

export default {
  title: 'Digital Hybrid/Molecules/Goal Progress',
  component: GoalProgress,
  argTypes: {
    progress: {
      control: {
        type: 'number',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
  },
} as Meta;

const Template: Story<GoalProgressProps> = (args) => <GoalProgress {...args} />;

const defaultArgs: GoalProgressProps = {
  iconSrc: '/goal-graphic.png',
  label: 'Retire',
  remainingYears: 50,
  progress: 0.5,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
