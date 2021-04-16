import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Link, { LinkProps } from '.';

export default {
  title: 'Digital Hybrid/Atoms/Link',
  component: Link,
  argTypes: {
    special: {
      control: {
        type: 'boolean',
      },
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
