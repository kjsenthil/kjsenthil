import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio, { RadioProps } from '.';

export default {
  title: 'Digital Hybrid/Atoms/Radio',
  component: Radio,
} as Meta;

const Template: Story<RadioProps> = (args) => (
  <RadioGroup aria-label="position" name="Gender" defaultValue="female">
    <FormControlLabel value="female" control={<Radio {...args} />} label="Female" />
    <FormControlLabel value="male" control={<Radio {...args} />} label="Male" />
  </RadioGroup>
);

export const Default = Template.bind({});
Default.args = {};
