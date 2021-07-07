import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalTrackingWidget, { GoalTrackingWidgetProps } from './GoalTrackingWidget';
import { formatCurrency, formatPercent } from '../../../utils/formatters';

export default {
  title: 'Digital Hybrid/Organisms/Goal Tracking Widget',
  component: GoalTrackingWidget,
} as Meta;

const Template: Story<GoalTrackingWidgetProps> = (args) => <GoalTrackingWidget {...args} />;

const progressBarData = [
  {
    progress: 0.2,
    legendProps: { title: 'Lump Sum', value: 20000 },
  },
  {
    progress: 0.5,
    legendProps: { title: 'From Age 67 - 89', value: 1080000 },
  },
  {
    progress: 0.05,
    legendProps: { title: 'Remaining', value: 72000 },
  },
];

const opts = { minimumFractionDigits: 0 };
const onTrack = formatPercent(0.72, { opts });
const shortfall = 55000;
const totalProjected = progressBarData.reduce((acc, data) => acc + data.legendProps.value, 0);
const target = totalProjected + shortfall;

export const Default = Template.bind({});
Default.args = {
  currencyFormatter: formatCurrency,
  target,
  onTrack,
  totalProjected,
  progressBarData,
  drawdownMonthlyIncome: 2340,
  drawdownStartAge: 67,
  drawdownEndAge: 89,
};
