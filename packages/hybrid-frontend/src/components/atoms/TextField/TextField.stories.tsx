import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TextField, { TextFieldProps } from '.';

export default {
  title: 'Digital Hybrid/Atoms/TextField',
  component: TextField,
  argTypes: {},
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Text',
};
