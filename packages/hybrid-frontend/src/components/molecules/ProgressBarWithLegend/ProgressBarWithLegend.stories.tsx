import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ProgressBarWithLegend, { ProgressBarWithLegendProps } from '.';
import { formatCurrency } from '../../../utils/formatters';

export default {
  title: 'Digital Hybrid/Molecules/ProgressBar With Legend',
  component: ProgressBarWithLegend,
  argTypes: {},
} as Meta;

const progressBarData = [
  {
    progress: 0.2,
    legendProps: { title: 'Lump Sum', value: 20000 },
  },
  {
    progress: 0.1,
    legendProps: { title: 'From Age 67 - 89', value: 1080000 },
  },
  {
    progress: 0.05,
    legendProps: { title: 'Remaining', value: 72000 },
  },
];

const Template: Story<ProgressBarWithLegendProps> = (args) => <ProgressBarWithLegend {...args} />;

export const Default = Template.bind({});
Default.args = {
  currencyFormatter: formatCurrency,
  progressBarData,
};
