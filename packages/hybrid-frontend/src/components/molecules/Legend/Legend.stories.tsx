import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Legend, { LegendProps } from './Legend';
import {
  formatCurrency,
  formatPercent,
  CurrencyPresentationVariant,
  PercentPresentationVariant,
} from '../../../utils/formatters';

export default {
  title: 'Digital Hybrid/Molecules/Legend',
  component: Legend,
  argTypes: {},
} as Meta;

const Template: Story<LegendProps> = (args) => <Legend {...args} />;

const currencyFormatter = (val: number) =>
  formatCurrency(val, CurrencyPresentationVariant.USER_INPUT);

const percentFormatter = (val: number) => formatPercent(val, PercentPresentationVariant.USER_INPUT);

export const PastProjectedValue = Template.bind({});
PastProjectedValue.args = {
  title: 'Past / Projected Value',
  value: 281231,
  chartIndicatorProps: { variant: 'solid' },
  valueFormatter: currencyFormatter,
};

export const LikelyRange = Template.bind({});
LikelyRange.args = {
  title: 'Likely Range',
  value: [290234, 320324],
  chartIndicatorProps: { variant: 'rectangle', color: 'tertiary' },
  valueFormatter: currencyFormatter,
};

export const Contributions = Template.bind({});
Contributions.args = {
  title: 'Contributions',
  value: 290234,
  chartIndicatorProps: { variant: 'dashed-4', color: 'secondary' },
  valueFormatter: currencyFormatter,
};

export const ContributionsNoFormatters = Template.bind({});
ContributionsNoFormatters.args = {
  title: 'Contributions',
  value: '£290,234.00 - £320,324.00',
  chartIndicatorProps: { variant: 'dashed-3', color: 'gold' },
};

export const TotalReturn = Template.bind({});
TotalReturn.args = {
  title: 'Total Return',
  value: 290234,
  percentageChange: 0.1856,
  valueFormatter: currencyFormatter,
  percentageFormatter: percentFormatter,
};

export const LegendNoValue = Template.bind({});
LegendNoValue.args = {
  title: 'Total Value',
  chartIndicatorProps: { variant: 'solid', color: 'primary' },
};
