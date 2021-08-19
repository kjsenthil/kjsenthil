import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AccountsTable, { AccountsTableProps } from './AccountsTable';
import {
  mockInvestmentAccountsTableData,
  mockInvestmentAccountsTableFooterData,
  mockInvestmentAccountsTableHeader,
} from './mocks';

export default {
  title: 'Digital Hybrid/Organisms/Accounts Table',
  component: AccountsTable,
  argTypes: {},
} as Meta;

const Template: Story<AccountsTableProps> = (args) => <AccountsTable {...args} />;

const mockInvestmentAccountsTableHeaderNoTooltips = mockInvestmentAccountsTableHeader.map(
  ({ tooltip, ...rest }) => rest
);

export const Default = Template.bind({});
Default.args = {
  headerRow: mockInvestmentAccountsTableHeaderNoTooltips,
  dataRow: mockInvestmentAccountsTableData,
};

export const WithHeaderTooltips = Template.bind({});
WithHeaderTooltips.args = {
  headerRow: mockInvestmentAccountsTableHeader,
  dataRow: mockInvestmentAccountsTableData,
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  headerRow: mockInvestmentAccountsTableHeaderNoTooltips,
  dataRow: mockInvestmentAccountsTableData,
  footerRow: mockInvestmentAccountsTableFooterData,
};
