import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ChartPeriodSelection from './ChartPeriodSelection';

enum PerformanceDataPeriod {
  '1M' = '1m',
  '3M' = '3m',
  '6M' = '6m',
  '1Y' = '1y',
  'ALL_TIME' = 'alltime',
}

export default {
  title: 'Digital Hybrid/Molecules/Chart Period Selection',
  component: ChartPeriodSelection,
} as Meta;

const Template: Story = () => {
  const [currentPeriod, setCurrentPeriod] = React.useState<string>(PerformanceDataPeriod.ALL_TIME);

  return (
    <ChartPeriodSelection
      currentPeriod={currentPeriod}
      performanceDataPeriod={PerformanceDataPeriod}
      periodTextDisplay={(period) =>
        period === PerformanceDataPeriod.ALL_TIME ? 'All Time' : period
      }
      setCurrentPeriod={setCurrentPeriod}
    />
  );
};

export const Default = Template.bind({});
