import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Select, { SelectProps } from '.';

export default {
  title: 'Digital Hybrid/Atoms/Select',
  component: Select,
  argTypes: {
    fullWidth: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
  },
} as Meta;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const Default = Template.bind({});

/* eslint-disable jsx-a11y/control-has-associated-label */
Default.args = {
  children: (
    <>
      <option value="" />
      <option value={1}>Option 1</option>
      <option value={2}>Option 2</option>
    </>
  ),
};
