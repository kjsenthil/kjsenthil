import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import LoginForm, { LoginFormProps } from './LoginForm';

export default {
  title: 'Digital Hybrid/Login Form',
  component: LoginForm,
  argTypes: { onSubmit: { action: 'submitted' } },
} as Meta;

const Template: Story<LoginFormProps> = (args) => (
  <LoginForm
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...args}
  />
);

export const Default = Template.bind({});
