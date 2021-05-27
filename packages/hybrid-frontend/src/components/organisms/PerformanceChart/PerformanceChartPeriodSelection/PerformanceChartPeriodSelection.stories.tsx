import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceChartPeriodSelection from './PerformanceChartPeriodSelection';
import { PerformanceDataPeriod } from '../../../../services/performance/constants';

export default {
  title: 'Digital Hybrid/Organisms/Performance Chart/Performance Chart Period Selection',
  component: PerformanceChartPeriodSelection,
} as Meta;

const Template: Story = () => {
  const [currentPeriod, setCurrentPeriod] = React.useState(PerformanceDataPeriod.ALL_TIME);

  return (
    <PerformanceChartPeriodSelection
      currentPeriod={currentPeriod}
      setCurrentPeriod={setCurrentPeriod}
    />
  );
};

export const Default = Template.bind({});
