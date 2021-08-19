import normalizeProjectionsData from './normalizeProjectionsData';
import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

const projectionsData: ProjectionsChartProjectionDatum[] = [
  {
    date: new Date(2020, 1, 1),
    value: -1000,
    netContributionsToDate: -2000,
    upperBound: -500,
    lowerBound: -3000,
  },
  {
    date: new Date(2020, 1, 2),
    value: 0,
    netContributionsToDate: 0,
    upperBound: 1000,
    lowerBound: -3000,
  },
  {
    date: new Date(2020, 1, 3),
    value: 1000,
    netContributionsToDate: 500,
    upperBound: 2000,
    lowerBound: 500,
  },
];

const normalizedProjectionsData: ProjectionsChartProjectionDatum[] = [
  {
    date: new Date(2020, 1, 1),
    value: 0,
    netContributionsToDate: 0,
    upperBound: 0,
    lowerBound: 0,
  },
  {
    date: new Date(2020, 1, 2),
    value: 0,
    netContributionsToDate: 0,
    upperBound: 1000,
    lowerBound: 0,
  },
  {
    date: new Date(2020, 1, 3),
    value: 1000,
    netContributionsToDate: 500,
    upperBound: 2000,
    lowerBound: 500,
  },
];

describe('normalizeProjectionsData', () => {
  it('normalizes projections data to having no negative values', () => {
    expect(normalizeProjectionsData(projectionsData)).toEqual(normalizedProjectionsData);
  });
});
