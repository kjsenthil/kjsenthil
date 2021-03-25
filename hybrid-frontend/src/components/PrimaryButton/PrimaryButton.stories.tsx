import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PrimaryButton, { PrimaryButtonProps } from './PrimaryButton';

export default {
  title: 'Digital Hybrid/Primary Button',
  component: PrimaryButton,
} as Meta;

const Template: Story<PrimaryButtonProps> = (args) => (
  <PrimaryButton
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...args}
  />
);

const defaultArgs: PrimaryButtonProps = {
  label: 'Some label',
};

export const Default = Template.bind({});
Default.args = defaultArgs;
