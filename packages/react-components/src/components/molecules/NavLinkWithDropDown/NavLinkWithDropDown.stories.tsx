import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import NavLinkWithDropDown, { NavLinkWithDropDownProps } from './NavLinkWithDropDown';

export default {
  title: 'Digital Hybrid/Molecules/Nav Link with Drop Down',
  component: NavLinkWithDropDown,
  argTypes: {
    selected: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
  },
} as Meta;

const Template: Story<NavLinkWithDropDownProps> = (args) => (
  <NavLinkWithDropDown {...args}>Test Link</NavLinkWithDropDown>
);

export const Default = Template.bind({});
Default.args = {
  name: 'Dropdown Nav',
  path: '/dropdown-nav',
  type: 'link',
  selected: true,
  childLinks: [
    {
      name: 'dropdown one',
      path: '/dropdown-one',
      type: 'link',
    },
    {
      name: 'dropdown two',
      path: '/dropdown-two',
      type: 'link',
    },
  ],
};
