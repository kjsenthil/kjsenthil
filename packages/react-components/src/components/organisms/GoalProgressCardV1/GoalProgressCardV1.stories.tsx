import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalProgressCardV1, { GoalProgressCardV1Props } from './GoalProgressCardV1';

export default {
  title: 'Digital Hybrid/Organisms/Goal Progress Card (deprecated)',
  component: GoalProgressCardV1,
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const defaultArgs: GoalProgressCardV1Props = {
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
  navigateToEditGoalPage: () => {},
};

const Template: Story<GoalProgressCardV1Props> = (args) => (
  <div
    style={{
      width: '349px',
    }}
  >
    <GoalProgressCardV1 {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = defaultArgs;
