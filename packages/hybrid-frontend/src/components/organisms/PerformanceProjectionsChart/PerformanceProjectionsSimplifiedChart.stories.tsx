import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import PerformanceProjectionsSimplifiedChart, {
  PerformanceProjectionsSimplifiedChartProps,
} from './PerformanceProjectionsSimplifiedChart';
import mockProjectionsData from './performanceProjectionsData/mocks/mock-projections-data.json';
import mockProjectionsGoalNotMetData from './performanceProjectionsData/mocks/mock-projections-data-goal-not-met.json';
import mockAnnualHistoricalData from './performanceProjectionsData/mocks/mock-annual-historical-data.json';
import mockGoalsData from './performanceProjectionsData/mocks/mock-goals-data.json';
import mockProjectionsMetadata from './performanceProjectionsData/mocks/mock-projections-metadata.json';
import mockProjectionsMetadataGoalNotMet from './performanceProjectionsData/mocks/mock-projections-metadata-goal-not-met.json';
import { mapDate } from './performanceProjectionsData';

export default {
  title:
    'Digital Hybrid/Organisms/Performance Projections Chart/Performance Projections Simplified Chart',
  component: PerformanceProjectionsSimplifiedChart,
  decorators: [
    (StoryComponent) => (
      <div style={{ padding: 10 }}>
        <StoryComponent />
      </div>
    ),
  ],
  argTypes: {},
} as Meta;

const Template: Story<PerformanceProjectionsSimplifiedChartProps> = (args) => (
  <PerformanceProjectionsSimplifiedChart {...args} />
);

const defaultArgs: PerformanceProjectionsSimplifiedChartProps = {
  projectionsData: mockProjectionsData.data.map(mapDate),
  annualHistoricalData: mockAnnualHistoricalData.data.map(mapDate),
  goalsData: mockGoalsData.data.map(mapDate),
  projectionsMetadata: mockProjectionsMetadata,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const GoalNotMet = Template.bind({});
GoalNotMet.args = {
  ...defaultArgs,
  projectionsData: mockProjectionsGoalNotMetData.data.map(mapDate),
  projectionsMetadata: mockProjectionsMetadataGoalNotMet,
};
