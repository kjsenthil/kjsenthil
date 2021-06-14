import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import LinearProgress, { LinearProgressProps } from '.';

export default {
  title: 'Digital Hybrid/Atoms/Linear Progress',
  component: LinearProgress,
} as Meta;

const Template: Story<LinearProgressProps> = (args) => <LinearProgress {...args} />;

export const Default = Template.bind({});
Default.args = {};
