import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import HeaderMenu from './HeaderMenu';

export default {
  title: 'Digital Hybrid/Organisms/Header Menu',
  component: HeaderMenu,
} as Meta;

const Template: Story = (args) => <HeaderMenu {...args} />;

export const Default = Template.bind({});
