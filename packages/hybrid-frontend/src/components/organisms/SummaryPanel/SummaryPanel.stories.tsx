import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SummaryPanel from './SummaryPanel';
import { SummaryValuesProps } from '../../../types';

export default {
  title: 'Digital Hybrid/Organisms/Summary Panel',
  component: SummaryPanel,
  argTypes: {},
} as Meta;

const Template: Story<SummaryValuesProps> = (args) => <SummaryPanel {...args} />;

const defaultArgs: SummaryValuesProps = {
  totalValue: 148238.52,
  totalContributions: 120726.83,
  totalReturn: 27512.14,
  totalReturnPct: 0.2534,
  threeMonthsReturn: 7632.04,
  threeMonthsReturnPct: 0.4511,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
