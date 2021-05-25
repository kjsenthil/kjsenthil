import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalDisplay, { GoalDisplayProps } from './GoalDisplay';

export default {
  title: 'Digital Hybrid/Organisms/Performance Projections Chart/Goal Display',
  component: GoalDisplay,
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

const Template: Story<GoalDisplayProps> = (args) => <GoalDisplay {...args} />;

const defaultArgs: GoalDisplayProps = {
  iconSrc: '/goal-graphic.png',
  label: 'Retire',
  remainingYears: 50,
  progress: 0.5,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
