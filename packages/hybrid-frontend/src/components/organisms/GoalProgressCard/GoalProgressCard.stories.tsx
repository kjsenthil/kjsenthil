import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalProgressCard, { GoalProgressCardProps } from './GoalProgressCard';

export default {
  title: 'Digital Hybrid/Organisms/Goal Progress Card',
  component: GoalProgressCard,
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const defaultArgs: GoalProgressCardProps = {
  accountTypes: ['ISA', 'GIA', 'SIPP'],
  currentValue: 2340,
  goalValue: 3205,
  iconSrc: '/goal-graphic.png',
  title: 'Retire',
  tooltipText: 'Such forecasts are not a reliable indicator of future returns',
  underperformValue: 1450,
};

const Template: Story<GoalProgressCardProps> = (args) => (
  <div
    style={{
      width: '349px',
    }}
  >
    <GoalProgressCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = defaultArgs;
