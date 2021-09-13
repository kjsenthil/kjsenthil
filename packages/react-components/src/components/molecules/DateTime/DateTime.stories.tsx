import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DateTime, { DateTimeProps } from './DateTime';

export default {
  title: 'Digital Hybrid/Molecules/Date Time',
  component: DateTime,
  argTypes: {},
} as Meta;

const Template: Story<DateTimeProps> = (args) => <DateTime {...args} />;

const requiredProps = {
  date: new Date(),
  isExpiring: true,
};

export const Default = Template.bind({});
Default.args = {
  ...requiredProps,
};
