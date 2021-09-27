import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import LinkWithIcon, { LinkWithIconProps } from './LinkWithIcon';

export default {
  title: 'Digital Hybrid/Molecules/Link With Icon',
  component: LinkWithIcon,
  argTypes: {
    special: {
      control: {
        type: 'boolean',
      },
    },
    color: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'secondary', 'tertiary', 'grey', 'gold'],
    },
    colorShade: {
      control: {
        type: 'radio',
      },
      options: ['light1', 'light2', 'main', 'dark1', 'dark2'],
    },
  },
} as Meta;

const Template: Story<LinkWithIconProps> = (args) => <LinkWithIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Link with Icon',
  onClick: () => alert('Clicked'),
  iconName: 'book',
};
