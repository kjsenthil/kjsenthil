import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import IsaAllowance, { IsaAllowanceProps } from './IsaAllowance';

export default {
  title: 'Digital Hybrid/Organisms/ISA Allowance',
  component: IsaAllowance,
} as Meta;

const defaultArgs: IsaAllowanceProps = {
  contributions: 400,
  totalAllowance: 1000,
  title: 'ISA ALLOWANCE',
};

const Template: Story<IsaAllowanceProps> = ({ ...args }) => <IsaAllowance {...args} />;

export const Default = Template.bind({});
Default.args = defaultArgs;
