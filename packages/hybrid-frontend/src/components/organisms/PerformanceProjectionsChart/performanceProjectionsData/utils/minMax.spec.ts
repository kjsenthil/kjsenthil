import {
  getPerformanceProjectionsDataMaxValue,
  getPerformanceProjectionsDataMinValue,
} from './minMax';
import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

const mockData: ProjectionsChartProjectionDatum[] = [
  {
    netContributionsToDate: 10000,
    valueGood: 20000,
    valueBad: 5000,
    value: 12000,
    date: new Date(2020, 0, 1),
  },
  {
    netContributionsToDate: 11000,
    valueGood: 21000,
    valueBad: 6000,
    value: 13000,
    date: new Date(2021, 0, 1),
  },
];

describe('getPerformanceProjectionsDataMinValue', () => {
  it('works as expected', () => {
    expect(getPerformanceProjectionsDataMinValue(mockData)).toBe(5000);
  });
});

describe('getPerformanceProjectionsDataMaxValue', () => {
  it('works as expected', () => {
    expect(getPerformanceProjectionsDataMaxValue(mockData)).toBe(21000);
  });
});
