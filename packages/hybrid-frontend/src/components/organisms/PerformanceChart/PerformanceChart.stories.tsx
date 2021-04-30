import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceChart, { PerformanceChartProps } from './PerformanceChart';
import { PerformanceDataContextProvider } from './data/dataContext';

export default {
  title: 'Digital Hybrid/Organisms/Performance Chart/Performance Chart',
  component: PerformanceChart,
  argTypes: {
    // argTypes here...
  },
} as Meta;

const Template: Story<PerformanceChartProps> = (args) => (
  <PerformanceDataContextProvider>
    <div
      style={{
        padding: 10,
      }}
    >
      <PerformanceChart {...args} />
    </div>
  </PerformanceDataContextProvider>
);

const defaultArgs: PerformanceChartProps = {
  includePeriodSelection: true,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
