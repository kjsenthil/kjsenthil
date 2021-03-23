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

const defaultArgs: LoginFormProps = {
  errorMessage: '',
  successMessage: '',
  onSubmit: () => Promise.resolve(),
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  errorMessage: 'Log in failed',
};

export const Success = Template.bind({});
Success.args = {
  ...defaultArgs,
  successMessage: 'Log in successful',
};
