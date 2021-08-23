import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AccountFilter from './AccountFilter';

export default {
  title: 'Digital Hybrid/Organisms/Account Filter',
  component: AccountFilter,
  argTypes: {},
} as Meta;

const Template: Story = (args) => <AccountFilter {...args} />;

export const Default = Template.bind({});
