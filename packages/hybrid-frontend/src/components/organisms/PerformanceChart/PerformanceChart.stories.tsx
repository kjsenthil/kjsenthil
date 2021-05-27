import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceChart, { PerformanceChartProps } from './PerformanceChart';
import getPerformanceContactMockResponseData from '../../../services/performance/mocks/mock-get-performance-contact-success-response.json';
import {
  PerformanceDataPeriod,
  sliceIndexBasedOnPeriod,
} from '../../../services/performance/constants';
import { mapContributionsData, mapPerformanceData } from '../../../services/performance/utils';

export default {
  title: 'Digital Hybrid/Organisms/Performance Chart/Performance Chart',
  component: PerformanceChart,
  decorators: [
    (StoryComponent) => (
      <div style={{ padding: 10 }}>
        <StoryComponent />
      </div>
    ),
  ],
  argTypes: {},
} as Meta;

type TemplateProps = Omit<PerformanceChartProps, 'periodSelectionProps'>;

const Template: Story<TemplateProps> = ({ performanceData, contributionsData, ...rest }) => {
  const [currentPeriod, setCurrentPeriod] = React.useState(PerformanceDataPeriod.ALL_TIME);

  const slicedPerformanceData = performanceData.slice(-sliceIndexBasedOnPeriod[currentPeriod]);
  const slicedContributionsData = contributionsData.slice(-sliceIndexBasedOnPeriod[currentPeriod]);

  return (
    <PerformanceChart
      performanceData={slicedPerformanceData}
      contributionsData={slicedContributionsData}
      periodSelectionProps={{ currentPeriod, setCurrentPeriod }}
      {...rest}
    />
  );
};

const defaultArgs: TemplateProps = {
  performanceData: getPerformanceContactMockResponseData.data.attributes.values.map(
    mapPerformanceData
  ),
  contributionsData: getPerformanceContactMockResponseData.included[0].attributes.contributions.map(
    mapContributionsData
  ),
};

export const Default = Template.bind({});
Default.args = defaultArgs;
