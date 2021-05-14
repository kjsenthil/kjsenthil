import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ProgressBar, { ProgressBarProps } from '.';

export default {
  title: 'Digital Hybrid/Atoms/ProgressBar',
  component: ProgressBar,
  argTypes: {
    progress: {
      control: {
        type: 'number',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
  },
} as Meta;

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  progress: 0.5,
};
