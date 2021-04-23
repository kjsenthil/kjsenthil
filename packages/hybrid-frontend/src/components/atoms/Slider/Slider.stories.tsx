import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Slider, { SliderProps } from './Slider';

export default {
  title: 'Digital Hybrid/Atoms/Slider',
  component: Slider,
  argTypes: {
    size: {
      contorl: {
        type: 'radio',
      },
      options: [undefined, 'small', 'large'],
    },
  },
} as Meta;

const Template: Story<SliderProps> = ({ value: defaultValue, ...args }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <Slider
      {...args}
      onChange={(_: unknown, newValue: number) => setValue(newValue)}
      value={value}
    />
  );
};

const defaultArgs: SliderProps = {
  max: 20000,
  min: 0,
  onChange: () => {},
  step: 100,
  value: 1000,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const MultipleThumbs = Template.bind({});
MultipleThumbs.args = {
  ...defaultArgs,
  value: [500, 2000],
};
