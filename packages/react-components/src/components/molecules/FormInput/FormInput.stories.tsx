import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import FormInput, { FormInputProps } from './FormInput';
import { Icon, InputAdornment } from '../../atoms';

export default {
  title: 'Digital Hybrid/Molecules/Form Input',
  component: FormInput,
  argTypes: {
    fullWidth: {
      control: {
        type: 'boolean',
      },
    },
    error: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

/* eslint-disable jsx-a11y/control-has-associated-label */
const Template: Story<FormInputProps> = (args) => {
  const [value, setValue] = React.useState('');
  const handleOnChange: FormInputProps['onChange'] = (e) => {
    setValue(e.target.value);
  };
  return <FormInput {...args} value={value} onChange={handleOnChange} name="input-name" />;
};

const defaultArgs: Partial<FormInputProps> = {
  label: 'Input name',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const InputWithDifferentPlaceholder = Template.bind({});
InputWithDifferentPlaceholder.args = {
  ...defaultArgs,
  placeholder: 'Placeholder',
};

export const TextInputWithStartIcon = Template.bind({});
TextInputWithStartIcon.args = {
  label: 'First name',
  startAdornment: (
    <InputAdornment position="start">
      <Icon name="account" />
    </InputAdornment>
  ),
};

export const TextInputWithCurrencyIcon = Template.bind({});
TextInputWithCurrencyIcon.args = {
  fullWidth: true,
  isCurrency: true,
  label: 'Value',
};

export const TextInputWithCurrencyIconError = Template.bind({});
TextInputWithCurrencyIconError.args = {
  error: 'Insufficient cash on account',
  fullWidth: true,
  isCurrency: true,
  label: 'Value',
};
