import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Alert, { AlertProps } from './Alert';

export default {
  title: 'Digital Hybrid/Molecules/Alert',
  component: Alert,
  argTypes: {
    severity: {
      control: {
        type: 'radio',
      },
      options: ['success', 'error'],
      defaultValue: 'success',
    },
    children: {
      control: {
        type: 'text',
      },
      defaultValue: 'Success!',
    },
  },
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Default = Template.bind({});

export const Success = Template.bind({});
Success.args = {
  severity: 'success',
  children: 'Success!',
};

export const Error = Template.bind({});
Error.args = {
  severity: 'error',
  children: 'Error!',
};
