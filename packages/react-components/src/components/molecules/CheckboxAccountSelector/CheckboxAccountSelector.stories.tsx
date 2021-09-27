import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CheckboxAccountSelector, { CheckboxAccountSelectorProps } from './CheckboxAccountSelector';

export default {
  title: 'Digital Hybrid/Molecules/Checkbox Account Selector',
  component: CheckboxAccountSelector,
} as Meta;

const Template: Story<CheckboxAccountSelectorProps> = (args) => (
  <CheckboxAccountSelector {...args} />
);

const defaultArgs: CheckboxAccountSelectorProps = {
  label: 'Self-invested Person Pension',
  accountId: '123',
  portfolioIds: [],
  updatePortfolioIds: () => undefined,
  funds: '10,000',
  linked: true,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
