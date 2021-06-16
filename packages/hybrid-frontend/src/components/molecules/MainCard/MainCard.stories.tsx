import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import MainCard, { MainCardProps } from './MainCard';
import { Button, Icon, Typography } from '../../atoms';
import PerformanceChart from '../../organisms/PerformanceChart';
import getPerformanceContactMockResponseData from '../../../services/performance/mocks/mock-get-performance-contact-success-response.json';
import {
  PerformanceDataPeriod,
  mapContributionsData,
  mapPerformanceData,
} from '../../../services/performance';
import { axisBottomConfig } from '../../../config/chart';

export default {
  title: 'Digital Hybrid/Molecules/Main Card',
  component: MainCard,
  argTypes: {},
} as Meta;

const Template: Story<MainCardProps> = (args) => <MainCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Test Title',
  renderActionEl: () => <Button>Click Me</Button>,
  children: <Typography variant="h1">Test Content</Typography>,
};

export const MainCardWithChildren = Template.bind({});
MainCardWithChildren.args = {
  title: 'Past Performance',
  renderActionEl: () => (
    <Button variant="outlined" startIcon={<Icon name="account" fontSize="inherit" />}>
      Manage my investments
    </Button>
  ),
  children: (
    <div
      style={{
        padding: 10,
      }}
    >
      <PerformanceChart
        performanceData={getPerformanceContactMockResponseData.data.attributes.values.map(
          mapPerformanceData
        )}
        contributionsData={getPerformanceContactMockResponseData.included[0].attributes.contributions.map(
          mapContributionsData
        )}
        periodSelectionProps={{
          performanceDataPeriod: PerformanceDataPeriod,
          currentPeriod: String(PerformanceDataPeriod['5Y']),
          setCurrentPeriod: () => {},
        }}
        axisBottomConfig={axisBottomConfig}
      />
    </div>
  ),
};

export const MainCardLoading = Template.bind({});
MainCardLoading.args = {
  title: 'Test Title',
  renderActionEl: () => <Button>Click Me</Button>,
  children: <Typography variant="h1">Test Content</Typography>,
  isLoading: true,
  style: { minHeight: '196px' },
};
