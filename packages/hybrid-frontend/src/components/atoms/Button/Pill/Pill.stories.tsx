import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Icon from '../../Icon';
import Pill, { PillProps } from './Pill';

export default {
  title: 'Digital Hybrid/Atoms/Pill',
  component: Pill,
  argTypes: {
    selectedColor: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'secondary', 'tertiary'],
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
  },
} as Meta;

const Template: Story<PillProps> = ({ ...rest }) => <Pill {...rest} />;

export const PillSelectedFilter = Template.bind({});
PillSelectedFilter.args = {
  children: 'All goals',
  variant: 'selected',
};

export const PillSelectableFilter = Template.bind({});
PillSelectableFilter.args = {
  children: 'Retirement',
  variant: 'selectable',
};

export const PillWithAddIcon = Template.bind({});
PillWithAddIcon.args = {
  children: 'All accounts',
  startIcon: <Icon name="plus" />,
  variant: 'creator',
};
