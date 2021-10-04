import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SliderWithInput, { SliderWithInputProps } from './SliderWithInput';

export default {
  title: 'Digital Hybrid/Organisms/Slider With Input',
  component: SliderWithInput,
} as Meta;

type StoryProps = Omit<SliderWithInputProps, 'setValue'>;

const Template: Story<StoryProps> = ({ value: initialValue, ...props }) => {
  const [value, setValue] = useState(initialValue);

  return <SliderWithInput {...props} value={value} setValue={setValue} />;
};

const defaultArgs: StoryProps = {
  name: 'favouriteNumber',
  label: "What's your favourite number?",
  value: 0,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const Currency = Template.bind({});
Currency.args = {
  ...defaultArgs,
  isCurrency: true,
};

export const SliderBelowInputLayout = Template.bind({});
SliderBelowInputLayout.args = {
  ...defaultArgs,
  layout: 'slider-below-input',
};
