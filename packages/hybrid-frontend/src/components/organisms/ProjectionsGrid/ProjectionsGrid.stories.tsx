import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ProjectionsGrid, { ProjectionsGridProps } from './ProjectionsGrid';
import { mockProjectionResponse } from '../../../services/projections/mocks';

export default {
  title: 'Digital Hybrid/Organisms/Projection Grid',
  component: ProjectionsGrid,
} as Meta;

const Template: Story<ProjectionsGridProps> = (args) => <ProjectionsGrid {...args} />;

export const Default = Template.bind({});

Default.args = mockProjectionResponse;
