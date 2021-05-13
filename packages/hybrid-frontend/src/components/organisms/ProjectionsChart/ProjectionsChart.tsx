import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { ProjectionYear } from '../../../services/projections';

export interface ProjectionsChartProps {
  projections: ProjectionYear[];
}

const ProjectionsChart: React.FC<ProjectionsChartProps> = ({ projections }) => {
  const yearLabels = projections?.map((projection) => projection.year);
  const lowData = projections?.map((projection) => projection.low);
  const mediumData = projections?.map((projection) => projection.medium);
  const highData = projections?.map((projection) => projection.high);
  const contributionsData = projections?.map((projection) => projection.actual);

  const options: ChartOptions = {
    elements: {
      point: {
        radius: 0,
      },
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },
          scaleLabel: {
            display: true,
            labelString: 'TIMEFRAME (years)',
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'PROJECTED VALUE',
          },
        },
      ],
    },
    tooltips: {
      enabled: false,
    },
  };

  const data = {
    labels: yearLabels,
    datasets: [
      {
        legend: {
          display: false,
        },
        label: 'Low',
        fill: false,
        borderColor: '#f00',
        borderWidth: 1,
        data: lowData,
      },
      {
        legend: {
          display: false,
        },
        label: 'Medium',
        fill: false,
        borderColor: '#0085c2',
        borderWidth: 1,
        data: mediumData,
      },
      {
        legend: {
          display: false,
        },
        label: 'High',
        fill: false,
        borderColor: '#70bc13',
        borderWidth: 1,
        data: highData,
      },
      {
        legend: {
          display: false,
        },
        label: 'Contributions',
        fill: false,
        borderColor: '#7a7a7a',
        borderDash: [10, 10],
        borderWidth: 1,
        data: contributionsData,
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default ProjectionsChart;
