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
  onTrackPercentage: 0.72,
  affordableValues: [700000, 500000, 242000],
  goalValue: 1975000,
  shortfallValue: 553000,
  shortfallUnderperformValue: 689000,
  title: 'Retirement',
  iconSrc: '/goal-graphic.png',
  iconAlt: 'goal graphic',
  tooltipText: 'Such forecasts are not a reliable indicator of future returns',
  investmentAccounts: ['ISA', 'GIA', 'SIPP'],
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
