import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Pin, PinProps } from './Pin';

export default {
  title: 'Digital Hybrid/Molecules/Pin',
  component: Pin,
} as Meta;

const Template: Story<PinProps> = (args) => <Pin {...args} />;

export const Default = Template.bind({});
Default.args = {
  length: 6,
  validate: '1234567890',
  typographyProps: {
    variant: 'sh4',
    color: 'primary',
  },
  headerLabel: 'Create a PIN*',
};

export const PinComponentWithHandlers = Template.bind({});
PinComponentWithHandlers.args = {
  length: 6,
  validate: '1234567890',
  onChange: (eachCharacter) => console.log('onChange: ', eachCharacter),
  onComplete: (pin: string) => alert(`onComplete: ${pin}`),
  typographyProps: {
    variant: 'sh4',
    color: 'primary',
  },
  headerLabel: 'Create a PIN*',
};

export const PinComponentWithAutoFill = Template.bind({});
PinComponentWithAutoFill.args = {
  length: 6,
  validate: '1234567890',
  value: '123456',
  typographyProps: {
    variant: 'sh4',
    color: 'primary',
  },
  headerLabel: 'Create a PIN*',
};
