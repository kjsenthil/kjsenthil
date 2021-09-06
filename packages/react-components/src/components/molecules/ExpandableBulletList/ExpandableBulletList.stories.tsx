import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ExpandableBulletList, { ExpandableBulletListProps } from './ExpandableBulletList';

export default {
  title: 'Digital Hybrid/Molecules/Expandable Bullet List',
  component: ExpandableBulletList,
} as Meta;

const Template: Story<ExpandableBulletListProps> = (args) => <ExpandableBulletList {...args} />;

const defaultArgs: ExpandableBulletListProps = {
  bulletList: [
    'You can enter either a number of shares or an amount of cash to be invested/raised.',
    'We obtain a real-time price quote from the market and display it for the period the quote remains active, usually around 15 seconds.',
    'If you decide to accept the quote then we will attempt to execute your deal immediately.',
    'Quote & Deal can only be selected during market hours.',
    'The aim of a Quote & Deal order is to secure both price and execution.',
  ],
  title: 'Quote & Deal',
};

export const Default = Template.bind({});

Default.args = defaultArgs;

export const ExpandedByDefault = Template.bind({});
ExpandedByDefault.args = {
  ...defaultArgs,
  expanded: true,
};
