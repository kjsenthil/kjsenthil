import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ProjectionsChart, { ProjectionsChartProps } from './ProjectionsChart';
import { mockProjectionResponse } from '../../../services/projections/mocks';

export default {
  title: 'Digital Hybrid/Organisms/Projections Chart',
  component: ProjectionsChart,
} as Meta;

const Template: Story<ProjectionsChartProps> = (args) => <ProjectionsChart {...args} />;

export const Default = Template.bind({});

Default.args = mockProjectionResponse;
