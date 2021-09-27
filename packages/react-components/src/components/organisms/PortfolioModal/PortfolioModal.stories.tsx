import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PortfolioModal, { PortfolioModalProps, AccountData } from './PortfolioModal';
import mockAccountData from './accounts.json';

export default {
  title: 'Digital Hybrid/Organisms/Portfolio Modal',
  component: PortfolioModal,
} as Meta;

const Template: Story<PortfolioModalProps> = (args) => <PortfolioModal {...args} />;

const mockData: AccountData[] = mockAccountData.data.relationships.accounts.concat(
  mockAccountData.data.relationships['linked-accounts']
);
const mockPortfolioAccounts: AccountData[] =
  mockAccountData.data.relationships.portfolios[0].accounts;

export const Default = Template.bind({});
Default.args = {
  type: 'create',
  open: true,
  allAccounts: mockData,
  onClose: () => {},
};

export const EditPortfolio = Template.bind({});
EditPortfolio.args = {
  ...Default.args,
  allAccounts: mockData,
  portfolioAccounts: mockPortfolioAccounts,
  type: 'edit',
};
