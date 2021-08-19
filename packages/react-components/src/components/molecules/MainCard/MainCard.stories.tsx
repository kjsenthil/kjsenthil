import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import MainCard, { MainCardProps } from './MainCard';
import { Button, Icon, Typography } from '../../atoms';
import AccountSummaryPanel from '../../organisms/AccountSummaryPanel';

export default {
  title: 'Digital Hybrid/Molecules/Main Card',
  component: MainCard,
  argTypes: {},
} as Meta;

const Template: Story<MainCardProps> = (args) => <MainCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Test Title',
  renderActionEl: () => <Button>Click Me</Button>,
  children: <Typography variant="h1">Test Content</Typography>,
};

export const MainCardWithChildren = Template.bind({});
MainCardWithChildren.args = {
  title: 'Past Performance',
  renderActionEl: () => (
    <Button variant="outlined" startIcon={<Icon name="account" fontSize="inherit" />}>
      Manage my investments
    </Button>
  ),
  children: (
    <div
      style={{
        padding: 10,
      }}
    >
      <AccountSummaryPanel
        cashValue={148238.52}
        investmentValue={120726.83}
        totalValue={27512.14}
      />
    </div>
  ),
};

export const MainCardLoading = Template.bind({});
MainCardLoading.args = {
  title: 'Test Title',
  renderActionEl: () => <Button>Click Me</Button>,
  children: <Typography variant="h1">Test Content</Typography>,
  isLoading: true,
  style: { minHeight: '196px' },
};
