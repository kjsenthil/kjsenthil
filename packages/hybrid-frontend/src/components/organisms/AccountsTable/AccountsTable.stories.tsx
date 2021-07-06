import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AccountsTable, { AccountsTableProps } from './AccountsTable';
import {
  mockAccountsTableData,
  mockAccountsTableFooterData,
  mockAccountsTableHeader,
} from '../../../constants/storybook';

export default {
  title: 'Digital Hybrid/Organisms/Accounts Table',
  component: AccountsTable,
  argTypes: {},
} as Meta;

const Template: Story<AccountsTableProps> = (args) => <AccountsTable {...args} />;

const mockAccountsTableHeaderNoTooltips = mockAccountsTableHeader.map(
  ({ tooltip, ...rest }) => rest
);

export const Default = Template.bind({});
Default.args = {
  headerRow: mockAccountsTableHeaderNoTooltips,
  dataRow: mockAccountsTableData,
};

export const WithHeaderTooltips = Template.bind({});
WithHeaderTooltips.args = {
  headerRow: mockAccountsTableHeader,
  dataRow: mockAccountsTableData,
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  headerRow: mockAccountsTableHeaderNoTooltips,
  dataRow: mockAccountsTableData,
  footerRow: mockAccountsTableFooterData,
};
