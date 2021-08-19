import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PinLogin, { PinLoginProps } from './PinLogin';

export default {
  title: 'Digital Hybrid/Organisms/Pin Login Form',
  component: PinLogin,
  argTypes: { onSubmit: { action: 'submitted' } },
} as Meta;

const Template: Story<PinLoginProps> = (args) => <PinLogin {...args} />;

const defaultArgs: PinLoginProps = {
  errorMessage: '',
  successMessage: '',
  onPinSubmit: () => Promise.resolve(),
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
