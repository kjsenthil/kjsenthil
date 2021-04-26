import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceChartTooltip, { PerformanceChartTooltipProps } from './PerformanceChartTooltip';

export default {
  title: 'Digital Hybrid/Organisms/Performance Chart/Performance Chart Tooltip',
  component: PerformanceChartTooltip,
  argTypes: {
    date: {
      control: {
        type: 'date',
      },
    },
  },
} as Meta;

const Template: Story<PerformanceChartTooltipProps> = ({ date, ...args }) => (
  <div
    style={{
      // Because the tooltip has a transform-translate rule to re-center it in
      // the context of the Performance chart, we add a bit of padding here in
      // the Storybook for ease of viewing.
      paddingLeft: 100,
    }}
  >
    {/* We have to convert the date like this because Storybook's date picker */}
    {/* doesn't convert the date string automatically. */}
    <PerformanceChartTooltip date={new Date(date)} {...args} />
  </div>
);

const defaultArgs: PerformanceChartTooltipProps = {
  date: new Date(),
  contribution: 2500.123,
  performance: 10000.456,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
