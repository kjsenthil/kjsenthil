import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceChartPeriodSelection from './PerformanceChartPeriodSelection';
import { PerformanceDataContextProvider } from '../data/dataContext';

export default {
  title: 'Digital Hybrid/Organisms/Performance Chart/Performance Chart Period Selection',
  component: PerformanceChartPeriodSelection,
} as Meta;

const Template: Story = () => (
  <PerformanceDataContextProvider>
    <PerformanceChartPeriodSelection />
  </PerformanceDataContextProvider>
);

export const Default = Template.bind({});
