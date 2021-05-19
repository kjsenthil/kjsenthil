import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Legend, { LegendProps } from './Legend';
import { formatCurrency, formatPercent } from '../../../utils/formatters';

export default {
  title: 'Digital Hybrid/Molecules/Legend',
  component: Legend,
  argTypes: {},
} as Meta;

const Template: Story<LegendProps> = (args) => <Legend {...args} />;

export const PastProjectedValue = Template.bind({});
PastProjectedValue.args = {
  title: 'Past / Projected Value',
  value: 281231,
  chartIndicatorProps: { variant: 'double-solid' },
  valueFormatter: formatCurrency,
};

export const LikelyRange = Template.bind({});
LikelyRange.args = {
  title: 'Likely Range',
  value: [290234, 320324],
  chartIndicatorProps: { variant: 'gradient', color: 'tertiary' },
  valueFormatter: formatCurrency,
};

export const Contributions = Template.bind({});
Contributions.args = {
  title: 'Contributions',
  value: 290234,
  chartIndicatorProps: { variant: 'dotted', color: 'gold' },
  valueFormatter: formatCurrency,
};

export const ContributionsNoFormatters = Template.bind({});
ContributionsNoFormatters.args = {
  title: 'Contributions',
  value: '£290,234.00 - £320,324.00',
  chartIndicatorProps: { variant: 'dotted', color: 'gold' },
};

export const TotalReturn = Template.bind({});
TotalReturn.args = {
  title: 'Total Return',
  value: 290234,
  percentageChange: 0.1856,
  valueFormatter: formatCurrency,
  percentageFormatter: formatPercent,
};

export const LegendNoValue = Template.bind({});
LegendNoValue.args = {
  title: 'Total Value',
  chartIndicatorProps: { variant: 'solid', color: 'primary' },
};
