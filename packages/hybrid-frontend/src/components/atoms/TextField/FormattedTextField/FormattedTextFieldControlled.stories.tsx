import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import FormattedTextFieldControlled, {
  FormattedTextFieldControlledProps,
} from './FormattedTextFieldControlled';
import { formatNumberInput } from '../../../../utils/formatters';

export default {
  title: 'Digital Hybrid/Atoms/Formatted Text Field (Controlled)',
  component: FormattedTextFieldControlled,
} as Meta;

const Template: Story<FormattedTextFieldControlledProps> = (args) => {
  const [value, setValue] = React.useState('');

  return <FormattedTextFieldControlled {...args} value={value} setValue={setValue} />;
};

const defaultArgs: Omit<FormattedTextFieldControlledProps, 'value' | 'setValue'> = {
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
