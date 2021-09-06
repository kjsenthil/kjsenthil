import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalStartModal, { GoalStartModalProps } from './GoalStartModal';

export default {
  title: 'Digital Hybrid/Organisms/Goal Start Modal',
  component: GoalStartModal,
} as Meta;

const Template: Story<GoalStartModalProps> = (args) => <GoalStartModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  onClose: () => {},
};
