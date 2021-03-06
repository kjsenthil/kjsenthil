import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceChart, { PerformanceChartProps } from './PerformanceChart';
import getPerformanceContactMockResponseData from '../../../services/performance/mocks/mock-get-performance-contact-success-response-temp';
import { mapContributionsData, mapPerformanceData, PerformanceDataPeriod } from '../../../services';
import { findDateByPeriod } from '../../../utils/date';

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
  const [currentPeriod, setCurrentPeriod] = React.useState<PerformanceDataPeriod>(
    PerformanceDataPeriod['1Y']
  );

  const date = findDateByPeriod(
    performanceData.map((data) => data.date),
    currentPeriod
  );

  const periodPerformanceData = performanceData.filter((p) => !date || p.date > date);
  const periodContributionsData = contributionsData.filter((c) => !date || c.date > date);

  return (
    <PerformanceChart
      performanceData={periodPerformanceData}
      contributionsData={periodContributionsData}
      periodSelectionProps={{
        currentPeriod,
        setCurrentPeriod,
        performanceDataPeriod: PerformanceDataPeriod,
      }}
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
