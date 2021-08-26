import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ProgressBarWithLegend, { ProgressBarWithLegendProps } from './index';
import { CurrencyPresentationVariant, formatCurrency } from '../../../utils/formatters';
import { ProgressBarData } from './ProgressBarWithLegend';

export default {
  title: 'Digital Hybrid/Molecules/ProgressBar With Legend',
  component: ProgressBarWithLegend,
  argTypes: {},
} as Meta;

const progressBarData: ProgressBarData[] = [
  {
    progress: 0.2,
    legendProps: {
      title: 'Lump Sum',
      value: 20000,
      chartIndicatorProps: { variant: 'solid', color: 'tertiary', colorShade: 'dark1' },
    },
  },
  {
    progress: 0.1,
    legendProps: {
      title: 'From Age 67 - 89',
      value: 1080000,
      chartIndicatorProps: { variant: 'solid', color: 'tertiary', colorShade: 'main' },
    },
  },
  {
    progress: 0.05,
    legendProps: {
      title: 'Remaining',
      value: 72000,
      chartIndicatorProps: { variant: 'solid', color: 'tertiary', colorShade: 'light2' },
    },
  },
];

const currencyFormatter = (val: number) =>
  formatCurrency(val, CurrencyPresentationVariant.USER_INPUT);

const Template: Story<ProgressBarWithLegendProps> = (args) => <ProgressBarWithLegend {...args} />;
export const Default = Template.bind({});
Default.args = {
  currencyFormatter,
  progressBarData,
};

export const ShowTarget = Template.bind({});
ShowTarget.storyName = 'Show target amount';
ShowTarget.args = {
  currencyFormatter,
  progressBarData,
  targetLegend: {
    title: 'Target',
    value: 1_900_000,
  },
};
