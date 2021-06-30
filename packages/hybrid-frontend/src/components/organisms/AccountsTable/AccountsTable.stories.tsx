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

export const Default = Template.bind({});
Default.args = {
  headerRow: mockAccountsTableHeader,
  dataRow: mockAccountsTableData,
  footerRow: mockAccountsTableFooterData,
};
