import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PillWithDropdown, { PillWithDropdownProps } from './PillWithDropdown';

export default {
  title: 'Digital Hybrid/Molecules/Pill With Dropdown',
  component: PillWithDropdown,
} as Meta;

const handleClick = () => {};
const handlePillClick = () => {};

const Template: Story<PillWithDropdownProps> = (args) => <PillWithDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  pillLabel: "Partner's Retirement",
  pillOnClickHandler: handlePillClick,
  menuItems: [
    {
      label: 'Edit portfolio',
      typographyProps: {
        variant: 'sh3',
        color: 'primary',
        colorShade: 'dark2',
      },
      iconProps: { name: 'edit', color: 'primary' },
      menuItemOnClickHandler: handleClick,
    },
    {
      label: 'Delete portfolio',
      typographyProps: { variant: 'sh3', color: 'error' },
      iconProps: { name: 'delete', color: 'error' },
      menuItemOnClickHandler: handleClick,
    },
  ],
};
