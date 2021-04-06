import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SliderWithInput, { SliderWithInputProps } from './SliderWithInput';

export default {
  title: 'Digital Hybrid/Slider With Input',
  component: SliderWithInput,
} as Meta;

const Template: Story<SliderWithInputProps> = (args) => {
  const [value, setValue] = useState<number | ''>(0);

  return (
    <SliderWithInput {...args} onChange={(_name, newValue) => setValue(newValue)} value={value} />
  );
};

const defaultArgs: SliderWithInputProps = {
  label: 'Upfront investment',
  max: 20000,
  min: 0,
  name: 'upfrontInvestment',
  onChange: () => {},
  step: 100,
  value: 100,
};

export const Number = Template.bind({});
Number.args = defaultArgs;

export const Currency = Template.bind({});
Currency.args = {
  ...defaultArgs,
  isCurrency: true,
};
