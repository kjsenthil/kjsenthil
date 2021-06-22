import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceProjectionsSimplifiedChartCard, {
  PerformanceProjectionsSimplifiedChartCardProps,
} from './PerformanceProjectionsSimplifiedChartCard';
import { mapDate } from '../performanceProjectionsData';

import mockProjectionsAnnualData from '../performanceProjectionsData/mocks/mock-projections-annual-data.json';
import mockProjectionsTargetAnnualData from '../performanceProjectionsData/mocks/mock-projections-target-annual-data.json';
import mockHistoricalAnnualData from '../performanceProjectionsData/mocks/mock-historical-annual-data.json';
import mockGoalsAnnualData from '../performanceProjectionsData/mocks/mock-goals-annual-data.json';

import mockProjectionsMetadata from '../performanceProjectionsData/mocks/mock-projections-metadata.json';

export default {
  title:
    'Digital Hybrid/Organisms/Performance Projections Chart/Performance Projections Simplified Chart Card',
  component: PerformanceProjectionsSimplifiedChartCard,
  argTypes: {
    retirementPerformancePercentage: {
      control: {
        type: 'number',
        min: 0,
        step: 0.1,
      },
    },
  },
} as Meta;

const Template: Story<PerformanceProjectionsSimplifiedChartCardProps> = (args) => (
  <PerformanceProjectionsSimplifiedChartCard {...args} />
);

const defaultArgs: PerformanceProjectionsSimplifiedChartCardProps = {
  userFirstName: 'Ava',
  retirementAge: 65,
  retirementPerformancePercentage: 1,
  retirementPerformance: 100000,
  goalProgressProps: {
    iconSrc: '/goal-graphic.png',
    label: 'Retire',
    remainingYears: 50,
    progress: 0.5,
  },
  chartProps: {
    projectionsData: mockProjectionsAnnualData.map(mapDate),
    historicalData: mockHistoricalAnnualData.map(mapDate),
    goalsData: mockGoalsAnnualData.data.map(mapDate),
    projectionsMetadata: mockProjectionsMetadata,
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const GoalNotMet = Template.bind({});
GoalNotMet.args = {
  ...defaultArgs,
  chartProps: {
    ...defaultArgs.chartProps,
    projectionsTargetData: mockProjectionsTargetAnnualData.map(mapDate),
  },
};

export const NoData = Template.bind({});
NoData.args = {
  ...defaultArgs,
  chartProps: {
    ...defaultArgs.chartProps,
    historicalData: [],
    projectionsData: [],
  },
};
