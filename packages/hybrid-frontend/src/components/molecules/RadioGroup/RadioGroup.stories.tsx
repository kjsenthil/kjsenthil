import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import RadioGroup, { RadioGroupProps } from './RadioGroup';
import { FormControlLabel, Link, Radio } from '../../atoms';

export default {
  title: 'Digital Hybrid/Molecules/Radio Group',
  component: RadioGroup,
  argTypes: {},
} as Meta;

const Template: Story<RadioGroupProps> = (args) => <RadioGroup {...args} />;

const defaultArgs: RadioGroupProps = {
  label: (
    <>
      Since the government will provide your state pension, we&apos;ll deduct this from your target
      retirement pot. We use today&apos;s maximum figure of £9,371.27 a year assuming you contribute
      National Insurance for 30 years. Use the <Link>governments website</Link> to find out how much
      your state pension could be.
    </>
  ),
  children: (
    <>
      <FormControlLabel value="female" control={<Radio />} label="Yes" />
      <FormControlLabel value="male" control={<Radio />} label="No" />
    </>
  ),
  row: true,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
