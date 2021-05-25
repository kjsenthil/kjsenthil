import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceProjectionsSimplifiedChartCard, {
  PerformanceProjectionsSimplifiedChartCardProps,
} from './PerformanceProjectionsSimplifiedChartCard';
import mockProjectionsData from '../performanceProjectionsData/mocks/mock-projections-data.json';
import { mapDate } from '../performanceProjectionsData';
import mockAnnualHistoricalData from '../performanceProjectionsData/mocks/mock-annual-historical-data.json';
import mockGoalsData from '../performanceProjectionsData/mocks/mock-goals-data.json';
import mockProjectionsMetadata from '../performanceProjectionsData/mocks/mock-projections-metadata.json';
import mockProjectionsGoalNotMetData from '../performanceProjectionsData/mocks/mock-projections-data-goal-not-met.json';
import mockProjectionsMetadataGoalNotMet from '../performanceProjectionsData/mocks/mock-projections-metadata-goal-not-met.json';

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
  goalDisplayProps: {
    iconSrc: '/goal-graphic.png',
    label: 'Retire',
    remainingYears: 50,
    progress: 0.5,
  },
  chartProps: {
    projectionsData: mockProjectionsData.data.map(mapDate),
    annualHistoricalData: mockAnnualHistoricalData.data.map(mapDate),
    goalsData: mockGoalsData.data.map(mapDate),
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
    projectionsData: mockProjectionsGoalNotMetData.data.map(mapDate),
    projectionsMetadata: mockProjectionsMetadataGoalNotMet,
  },
};
