import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CaptureGoal, { CaptureGoalProps } from './CaptureGoal';

export default {
  title: 'Digital Hybrid/Capture Goal',
  component: CaptureGoal,
  argTypes: { onSubmit: { action: 'submitted' } },
} as Meta;

const Template: Story<CaptureGoalProps> = (args) => <CaptureGoal {...args} />;

export const Default = Template.bind({});
