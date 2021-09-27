import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AccountsCard, { AccountsCardProps } from './AccountsCard';
import mockInvestmentAccountsCardData from './mocks';
import { Typography } from '../../atoms';

export default {
  title: 'Digital Hybrid/Organisms/Accounts Card',
  component: AccountsCard,
  argTypes: {},
} as Meta;

const Template: Story<AccountsCardProps> = (args) => <AccountsCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: mockInvestmentAccountsCardData,
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  data: mockInvestmentAccountsCardData,
  footerChildren: <Typography>I am a footer</Typography>,
};
