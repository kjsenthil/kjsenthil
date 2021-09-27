import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import NumberedProgress, { NumberedProgressProps } from './index';

export default {
  title: 'Digital Hybrid/Atoms/Numbered Progress',
  component: NumberedProgress,
  argTypes: {},
} as Meta;

const Template: Story<NumberedProgressProps> = (args) => <NumberedProgress {...args} />;

export const Default = Template.bind({});
Default.args = {
  progress: '1',
  total: '16',
};
