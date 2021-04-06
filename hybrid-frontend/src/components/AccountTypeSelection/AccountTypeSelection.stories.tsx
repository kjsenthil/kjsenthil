import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AccountTypeSelection, { AccountTypeSelectProps } from './AccountTypeSelection';

export default {
  title: 'Digital Hybrid/Select Account Type',
  component: AccountTypeSelection,
  // TODO:
  argTypes: {
    selectedAccountType: {
      control: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<AccountTypeSelectProps> = (args) => (
  <AccountTypeSelection
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...args}
  />
);

const defaultArgs: AccountTypeSelectProps = {
  onSubmit: () => {},
};

export const Default = Template.bind({});
Default.args = defaultArgs;
