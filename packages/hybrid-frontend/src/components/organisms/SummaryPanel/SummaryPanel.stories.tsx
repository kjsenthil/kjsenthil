import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SummaryPanel, { SummaryValuesProps } from './SummaryPanel';

export default {
  title: 'Digital Hybrid/Organisms/Summary Panel',
  component: SummaryPanel,
  argTypes: {},
} as Meta;

const Template: Story<SummaryValuesProps> = (args) => <SummaryPanel {...args} />;

const defaultArgs: SummaryValuesProps = {
  totalValue: 148238.52,
  totalNetContributions: 120726.83,
  totalReturn: 27512.14,
  totalReturnPercentage: 0.2534,
  periodBasedReturn: {
    value: 7632.04,
    percent: 0.4511,
    label: 'LAST 3 MONTHS RETURN',
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithAnnualisedReturn = Template.bind({});
WithAnnualisedReturn.args = {
  ...defaultArgs,
  totalValue: undefined,
  annualisedReturnPercentage: 0.2,
};
