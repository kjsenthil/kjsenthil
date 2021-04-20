import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Checkbox, { CheckboxProps } from '.';

export default {
  title: 'Digital Hybrid/Atoms/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {};
