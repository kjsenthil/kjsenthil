import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Icon from '../Icon';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Digital Hybrid/Atoms/Button',
  component: Button,
  argTypes: {
    color: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'gradient', 'primary', 'secondary', 'tertiary'],
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'contained', 'outlined'],
    },
    size: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'small'],
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

const defaultArgs: ButtonProps = {
  children: 'Button',
  color: 'primary',
  variant: 'contained',
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const DropdownButton = Template.bind({});
DropdownButton.args = {
  ...defaultArgs,
  children: <Icon name="arrowHeadDown" />,
};

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  ...defaultArgs,
  children: 'Button',
  startIcon: <Icon name="account" fontSize="inherit" />,
};
