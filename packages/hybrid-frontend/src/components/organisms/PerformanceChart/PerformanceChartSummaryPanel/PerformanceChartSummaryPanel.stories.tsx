import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceChartSummaryPanel, {
  PerformanceChartSummaryPanelProps,
} from './PerformanceChartSummaryPanel';

export default {
  title: 'Digital Hybrid/Organisms/Performance Chart/Performance Chart SummaryPanel',
  component: PerformanceChartSummaryPanel,
  argTypes: {
    // custom argTypes here...
  },
} as Meta;

const Template: Story<PerformanceChartSummaryPanelProps> = (args) => (
  <PerformanceChartSummaryPanel {...args} />
);

const defaultArgs: PerformanceChartSummaryPanelProps = {
  totalPerformance: 120000,
  totalNetContributions: 100000,
  totalReturn: 20000,
  totalReturnPercentage: 0.2,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
