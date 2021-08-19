import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import FormattedTextFieldUncontrolled, {
  FormattedTextFieldUncontrolledProps,
} from './FormattedTextFieldUncontrolled';
import { formatNumberInput } from '../../../../utils/formatters';

export default {
  title: 'Digital Hybrid/Atoms/Formatted Text Field (Uncontrolled)',
  component: FormattedTextFieldUncontrolled,
} as Meta;

const Template: Story<FormattedTextFieldUncontrolledProps> = (args) => (
  <FormattedTextFieldUncontrolled {...args} />
);

const defaultArgs: Omit<FormattedTextFieldUncontrolledProps, 'value' | 'setValue'> = {
  formatter: (text) => text,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const NumberFormattedTextFieldControlled = Template.bind({});
NumberFormattedTextFieldControlled.args = {
  ...defaultArgs,
  formatter: formatNumberInput,
  placeholder: 'Type in a number...',
};
