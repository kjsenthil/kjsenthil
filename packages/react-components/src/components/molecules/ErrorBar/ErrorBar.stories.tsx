import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ErrorBar, { ErrorBarProps } from './ErrorBar';

export default {
  title: 'Digital Hybrid/Molecules/ErrorBar',
  component: ErrorBar,
} as Meta;

const Template: Story<ErrorBarProps> = (args) => <ErrorBar {...args} />;

export const Default = Template.bind({});

Default.args = {
  errorMessage: 'Error message',
};
