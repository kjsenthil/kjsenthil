import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { formatCurrency } from '../../../utils/formatters';
import GoalPotTracker, { GoalPotTrackerProps } from './GoalPotTracker';

export default {
  title: 'Digital Hybrid/Organisms/Goal Pot Tracker',
  component: GoalPotTracker,
} as Meta;

const Template: Story<GoalPotTrackerProps> = (args) => <GoalPotTracker {...args} />;

const currencyFormatter = (val: number) =>
  formatCurrency(val, {
    opts: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  });

const lumpSumValue = 375000;
const projectionValue = 1500000;
const remainingValue = 100000;
const totalValue = lumpSumValue + projectionValue + remainingValue;

const defaultArgs: GoalPotTrackerProps = {
  title: 'Your retirement pot',
  potTotal: totalValue,
  progressBarProps: {
    currencyFormatter,
    progressBarData: [
      {
        legendProps: { title: 'Lump sum', value: lumpSumValue },
        progress: lumpSumValue / totalValue,
      },
      {
        legendProps: { title: 'From age 67 - 89', value: projectionValue },
        progress: projectionValue / totalValue,
      },
      {
        legendProps: { title: 'Remaining', value: remainingValue },
        progress: remainingValue / totalValue,
      },
    ],
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;
