import React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import ProjectionsChart, { ProjectionsChartProps } from './ProjectionsChart';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

const defaultProps: ProjectionsChartProps = {
  projections: [
    {
      year: 0,
      low: 13600,
      medium: 13600,
      high: 13600,
      actual: 13600,
    },
    {
      year: 1,
      low: 19397.751479801907,
      medium: 21394.32,
      high: 23297.269658531648,
      actual: 20800,
    },
    {
      year: 2,
      low: 25951.733736920298,
      medium: 29529.251784,
      high: 32874.506687063345,
      actual: 28000,
    },
    {
      year: 3,
      low: 32735.39641639302,
      medium: 38019.6800869608,
      high: 42893.977209350145,
      actual: 35200,
    },
    {
      year: 4,
      low: 39761.52671253483,
      medium: 46881.14010676168,
      high: 53380.41682471994,
      actual: 42400,
    },
  ],
};

describe('ProjectionsChart', () => {
  test('Renders the chart without error', async () => {
    expect(() => renderWithTheme(<ProjectionsChart {...defaultProps} />)).not.toThrow();
  });
});
