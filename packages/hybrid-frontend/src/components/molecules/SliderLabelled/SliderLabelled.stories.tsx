import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SliderLabelled, { SliderLabelledProps } from './SliderLabelled';

export default {
  title: 'Digital Hybrid/Molecules/Slider Labelled',
  component: SliderLabelled,
} as Meta;

const Template: Story<SliderLabelledProps> = ({ value: defaultValue, ...args }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <SliderLabelled
      {...args}
      onChange={(_name, newValue) => setValue(newValue)}
      value={value}
    />
  );
};

const defaultArgs: SliderLabelledProps = {
  max: 7,
  min: 1,
  name: 'sliderLabelled',
  onChange: () => { },
  step: 1,
  value: 4,
  startLabel: 'Low risk/reward',
  endLabel: 'High risk/reward',
  hereValue: 3,
  showMarks: true,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
