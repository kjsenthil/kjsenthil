import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Switcher, { SwitcherProps } from '.';

export default {
  title: 'Digital Hybrid/Atoms/Switcher',
  component: Switcher,
  argTypes: {
    withInnerLabel: {
      control: {
        type: 'boolean',
      },
    },

    size: {
      control: {
        type: 'radio',
      },
      options: ['small', 'medium'],
    },
  },
} as Meta;

const Template: Story<SwitcherProps> = (args) => <Switcher {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'switch',
  size: 'medium',
  checked: true,
  withInnerLabel: false,
};
