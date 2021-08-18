import normalizeHistoricalData from './normalizeHistoricalData';
import { ProjectionsChartHistoricalDatum } from '../../../../../services/performance';

const historicalData: ProjectionsChartHistoricalDatum[] = [
  {
    date: new Date(2020, 1, 1),
    value: -1000,
    netContributionsToDate: -2000,
  },
  {
    date: new Date(2020, 1, 2),
    value: 0,
    netContributionsToDate: 0,
  },
  {
    date: new Date(2020, 1, 3),
    value: 1000,
    netContributionsToDate: 500,
  },
];

const normalizedHistoricalData: ProjectionsChartHistoricalDatum[] = [
  {
    date: new Date(2020, 1, 1),
    value: 0,
    netContributionsToDate: 0,
  },
  {
    date: new Date(2020, 1, 2),
    value: 0,
    netContributionsToDate: 0,
  },
  {
    date: new Date(2020, 1, 3),
    value: 1000,
    netContributionsToDate: 500,
  },
];

describe('normalizeHistoricalData', () => {
  it('normalizes historical data to having no negative values', () => {
    expect(normalizeHistoricalData(historicalData)).toEqual(normalizedHistoricalData);
  });
});
