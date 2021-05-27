import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import LoginForm, { LoginFormProps } from './LoginForm';

export default {
  title: 'Digital Hybrid/Organisms/Login Form',
  component: LoginForm,
  argTypes: { onSubmit: { action: 'submitted' } },
} as Meta;

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />;

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
  errorMessage: 'Something went wrong, please try again',
};

export const Success = Template.bind({});
Success.args = {
  ...defaultArgs,
  successMessage: 'Success!',
};
