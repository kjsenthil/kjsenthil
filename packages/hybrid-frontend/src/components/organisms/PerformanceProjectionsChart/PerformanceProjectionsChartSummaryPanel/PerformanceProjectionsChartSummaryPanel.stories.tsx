import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceProjectionsChartSummaryPanel, {
  PerformanceProjectionsChartSummaryPanelProps,
} from './PerformanceProjectionsChartSummaryPanel';

export default {
  title:
    'Digital Hybrid/Organisms/Performance Projections Chart/Performance Projections Chart SummaryPanel',
  component: PerformanceProjectionsChartSummaryPanel,
  argTypes: {
    // custom argTypes here...
  },
} as Meta;

const Template: Story<PerformanceProjectionsChartSummaryPanelProps> = (args) => (
  <PerformanceProjectionsChartSummaryPanel {...args} />
);

const defaultArgs: PerformanceProjectionsChartSummaryPanelProps = {
  performance: 10000,
  performanceLowEnd: 10000,
  performanceHighEnd: 10000,
  contributions: 10000,
  performanceTargetNotMet: undefined,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
