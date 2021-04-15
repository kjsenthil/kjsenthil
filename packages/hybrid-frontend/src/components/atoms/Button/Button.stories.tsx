import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Digital Hybrid/Atoms/Button',
  component: Button,
  argTypes: {
    color: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'primary', 'secondary', 'tertiary'],
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
  small: undefined,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const ButtonIconOnly = Template.bind({});
ButtonIconOnly.args = {
  ...defaultArgs,
  children: <KeyboardArrowDownIcon />,
};
