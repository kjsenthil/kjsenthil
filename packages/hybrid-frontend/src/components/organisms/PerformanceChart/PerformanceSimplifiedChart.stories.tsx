import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceSimplifiedChart, {
  PerformanceSimplifiedChartProps,
} from './PerformanceSimplifiedChart';
import getPerformanceContactMockResponseData from '../../../services/performance/mocks/mock-get-performance-contact-success-response.json';
import {
  mapContributionsData,
  mapPerformanceData,
  PerformanceDataPeriod,
} from '../../../services/performance';

export default {
  title: 'Digital Hybrid/Organisms/Performance Chart/Performance Simplified Chart',
  component: PerformanceSimplifiedChart,
  decorators: [(story) => <div style={{ width: 600 }}>{story()}</div>],
  argTypes: {
    dataPeriod: {
      options: Object.values(PerformanceDataPeriod),
      control: {
        type: 'select',
      },
    },
  },
} as Meta;

const Template: Story<PerformanceSimplifiedChartProps> = (args) => (
  <PerformanceSimplifiedChart {...args} />
);

const defaultArgs: PerformanceSimplifiedChartProps = {
  dataPeriod: PerformanceDataPeriod['5Y'],
  performanceData: getPerformanceContactMockResponseData.data.attributes.values.map(
    mapPerformanceData
  ),
  contributionsData: getPerformanceContactMockResponseData.included[0].attributes.contributions.map(
    mapContributionsData
  ),
};

export const Default = Template.bind({});
Default.args = defaultArgs;
