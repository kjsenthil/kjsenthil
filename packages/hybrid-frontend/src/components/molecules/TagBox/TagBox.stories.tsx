import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TagBox, { TagBoxProps } from './TagBox';
import { formatPercent } from '../../../utils/formatters';

export default {
  title: 'Digital Hybrid/Molecules/Tag Box',
  component: TagBox,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

const Template: Story<TagBoxProps> = (args) => <TagBox {...args} />;

export const Percentage = Template.bind({});
Percentage.args = {
  variant: 'percentage',
  children: 0.3,
  formatter: formatPercent,
};

export const Label = Template.bind({});
Label.args = {
  variant: 'label',
  children: 'Fund',
};

export const Badge = Template.bind({});
Badge.args = {
  variant: 'badge',
  children: 'Archive',
};
