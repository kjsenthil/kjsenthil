import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import FormSelect, { FormSelectProps } from './FormSelect';

export default {
  title: 'Digital Hybrid/Molecules/Form Select',
  component: FormSelect,
  argTypes: {
    fullWidth: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
    error: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

/* eslint-disable jsx-a11y/control-has-associated-label */
const Template: Story<FormSelectProps> = (args) => {
  const [value, setValue] = React.useState('');
  const handleOnChange: FormSelectProps['onChange'] = (e) => {
    setValue(e.target.value);
  };
  return <FormSelect {...args} value={value} onChange={handleOnChange} name="input-name" />;
};

const defaultArgs: Partial<FormSelectProps> = {
  label: 'Input name',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  children: (
    <>
      <option value="">Select Age</option>
      <option value={1}>Option 1</option>
      <option value={2}>Option 2</option>
    </>
  ),
};
