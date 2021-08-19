import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ProgressBar, { ProgressBarProps } from './index';

export default {
  title: 'Digital Hybrid/Atoms/ProgressBar',
  component: ProgressBar,
  argTypes: {},
} as Meta;

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  progress: 0.5,
  borderRadius: 4,
};

export const MultiValue = Template.bind({});
MultiValue.args = {
  height: 28,
  progress: [0.5, 0.2, 0.1],
  borderRadius: 4,
};
