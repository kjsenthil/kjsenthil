import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AccountSummaryPanel, { AccountSummaryValuesProps } from './AccountSummaryPanel';

export default {
  title: 'Digital Hybrid/Organisms/Account Summary Panel',
  component: AccountSummaryPanel,
  argTypes: {},
} as Meta;

const Template: Story<AccountSummaryValuesProps> = (args) => <AccountSummaryPanel {...args} />;

const defaultArgs: AccountSummaryValuesProps = {
  cashValue: 148238.52,
  investmentValue: 120726.83,
  totalValue: 27512.14,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
