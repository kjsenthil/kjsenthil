import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Link, { LinkProps } from './index';

export default {
  title: 'Digital Hybrid/Atoms/Link',
  component: Link,
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

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  /* eslint-disable-next-line no-alert */
  onClick: () => alert('Clicked'),
};

export const LinkAsAnchor = Template.bind({});
LinkAsAnchor.args = {
  children: 'Anchor',
  href: 'https://example.com',
};
