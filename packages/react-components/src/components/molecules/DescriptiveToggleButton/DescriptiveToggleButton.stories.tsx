import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DescriptiveToggleButton, { DescriptiveToggleButtonProps } from './DescriptiveToggleButton';

export default {
  title: 'Digital Hybrid/Molecules/Descriptive Toggle Button',
  component: DescriptiveToggleButton,
} as Meta;

const Template: Story<DescriptiveToggleButtonProps> = (args) => (
  <DescriptiveToggleButton {...args} />
);

const defaultArgs: DescriptiveToggleButtonProps = {
  value: 0,
  idNumber: 1,
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
};

export const Default = Template.bind({});
Default.args = defaultArgs;
