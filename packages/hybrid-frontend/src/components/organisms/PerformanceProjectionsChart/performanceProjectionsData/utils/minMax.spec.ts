import {
  getPerformanceProjectionsDataMaxValue,
  getPerformanceProjectionsDataMinValue,
} from './minMax';
import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

const mockData: ProjectionsChartProjectionDatum[] = [
  {
    netContributionsToDate: 10000,
    upperBound: 20000,
    lowerBound: 5000,
    value: 12000,
    date: new Date(2020, 0, 1),
  },
  {
    netContributionsToDate: 11000,
    upperBound: 21000,
    lowerBound: 6000,
    value: 13000,
    date: new Date(2021, 0, 1),
  },
];

describe('getPerformanceProjectionsDataMinValue', () => {
  it('works as expected', () => {
    expect(getPerformanceProjectionsDataMinValue({ projectionsData: mockData })).toBe(5000);
  });
});

describe('getPerformanceProjectionsDataMaxValue', () => {
  it('works as expected', () => {
    expect(getPerformanceProjectionsDataMaxValue({ projectionsData: mockData })).toBe(21000);
  });
});
