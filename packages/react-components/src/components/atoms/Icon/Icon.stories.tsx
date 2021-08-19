import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Icon, { IconProps } from './Icon';
import icons from './icons';

export default {
  title: 'Digital Hybrid/Atoms/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: {
        type: 'radio',
      },
      options: Object.keys(icons),
    },
    color: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'primary', 'secondary', 'tertiary'],
    },
    fontSize: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'inherit', 'default', 'small', 'large'],
    },
  },
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'account',
};
