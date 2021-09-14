import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import RadioFormInput, { RadioFormInputProps } from './RadioFormInput';

export default {
  title: 'Digital Hybrid/Molecules/Radio Form Input',
  component: RadioFormInput,
} as Meta;

const Template: Story<RadioFormInputProps> = (args) => <RadioFormInput {...args} />;

const defaultArgs: RadioFormInputProps = {
  radioLabel: 'Specific number of units/shares',
  radioValue: 'shares',
  inputProps: {
    name: 'input-shares',
    label: 'Number',
    isCurrency: true,
    value: '',
    error: '',
    onChange: () => {},
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;
