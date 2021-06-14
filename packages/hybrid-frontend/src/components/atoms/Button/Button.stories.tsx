import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Icon, { IconProps } from '../Icon/Icon';
import icons from '../Icon/icons';
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
    fullWidth: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
    startIcon: {
      name: 'icon',
      control: { type: 'select' },
      options: [undefined, ...Object.keys(icons).sort()],
    },
  },
} as Meta;

interface ButtonStoryProps extends ButtonProps {
  startIcon?: IconProps['name'];
}

const Template: Story<ButtonStoryProps> = ({ startIcon, ...rest }) => (
  <Button {...rest} startIcon={startIcon ? <Icon name={startIcon} /> : undefined} />
);

const defaultArgs: ButtonStoryProps = {
  children: 'Button',
  color: 'primary',
  isLoading: false,
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
  startIcon: 'account',
};

export const ButtonLoading = Template.bind({});
ButtonLoading.args = {
  ...defaultArgs,
  children: 'Button',
  isLoading: true,
};
