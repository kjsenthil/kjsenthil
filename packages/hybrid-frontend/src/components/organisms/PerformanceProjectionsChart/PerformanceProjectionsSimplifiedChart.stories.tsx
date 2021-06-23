import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceProjectionsSimplifiedChart, {
  PerformanceProjectionsSimplifiedChartProps,
} from './PerformanceProjectionsSimplifiedChart';
import { mapDate } from './performanceProjectionsData';

import mockProjectionsMonthlyData from './performanceProjectionsData/mocks/mock-projections-monthly-data.json';
import mockProjectionsTargetMonthlyData from './performanceProjectionsData/mocks/mock-projections-target-monthly-data.json';
import mockHistoricalMonthlyData from './performanceProjectionsData/mocks/mock-historical-monthly-data.json';
import mockGoalsMonthlyData from './performanceProjectionsData/mocks/mock-goals-monthly-data.json';

import mockProjectionsAnnualData from './performanceProjectionsData/mocks/mock-projections-annual-data.json';
import mockProjectionsTargetAnnualData from './performanceProjectionsData/mocks/mock-projections-target-annual-data.json';
import mockHistoricalAnnualData from './performanceProjectionsData/mocks/mock-historical-annual-data.json';
import mockGoalsAnnualData from './performanceProjectionsData/mocks/mock-goals-annual-data.json';
import mockGoalsMultiData from './performanceProjectionsData/mocks/mock-goals-multiple-data.json';

import mockProjectionsMetadata from './performanceProjectionsData/mocks/mock-projections-metadata.json';

export default {
  title:
    'Digital Hybrid/Organisms/Performance Projections Chart/Performance Projections Simplified Chart',
  component: PerformanceProjectionsSimplifiedChart,
  decorators: [
    (StoryComponent) => (
      <div style={{ padding: 20 }}>
        <StoryComponent />
      </div>
    ),
  ],
  argTypes: {},
} as Meta;

const Template: Story<PerformanceProjectionsSimplifiedChartProps> = (args) => (
  <PerformanceProjectionsSimplifiedChart {...args} />
);

// Monthly data variants

const monthlyDataArgs: PerformanceProjectionsSimplifiedChartProps = {
  projectionsData: mockProjectionsMonthlyData.map(mapDate),
  historicalData: mockHistoricalMonthlyData.map(mapDate),
  goalsData: mockGoalsMonthlyData.data.map(mapDate),
  projectionsMetadata: mockProjectionsMetadata,
};

export const MonthlyData = Template.bind({});
MonthlyData.args = monthlyDataArgs;

export const GoalNotMetMonthlyData = Template.bind({});
GoalNotMetMonthlyData.args = {
  ...monthlyDataArgs,
  projectionsTargetData: mockProjectionsTargetMonthlyData.map(mapDate),
};

// Annual data variants

const annualDataArgs: PerformanceProjectionsSimplifiedChartProps = {
  projectionsData: mockProjectionsAnnualData.map(mapDate),
  historicalData: mockHistoricalAnnualData.map(mapDate),
  goalsData: mockGoalsAnnualData.data.map(mapDate),
  projectionsMetadata: mockProjectionsMetadata,
};

export const AnnualData = Template.bind({});
AnnualData.args = annualDataArgs;

export const GoalNotMetAnnualData = Template.bind({});
GoalNotMetAnnualData.args = {
  ...annualDataArgs,
  projectionsTargetData: mockProjectionsTargetAnnualData.map(mapDate),
};

// No data variant

export const NoData = Template.bind({});
NoData.args = {
  projectionsData: [],
  historicalData: [],
  goalsData: [],
  projectionsMetadata: mockProjectionsMetadata,
};

export const MultipleGoals = Template.bind({});
MultipleGoals.args = {
  ...annualDataArgs,
  goalsData: mockGoalsMultiData.data.map(mapDate),
};
