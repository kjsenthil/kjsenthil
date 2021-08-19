import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { NavLink } from './NavLink';

export default {
  title: 'Digital Hybrid/Molecules/Nav Link',
  component: NavLink,
  argTypes: {},
} as Meta;

const Template: Story = (args) => <NavLink {...args}>Test Link</NavLink>;

export const Default = Template.bind({});
Default.args = {
  to: '/',
};
