import normalizeTimeSeriesData from './normalizeTimeSeriesData';
import { TimeSeriesDatum } from '../data';

const data: TimeSeriesDatum[] = [
  { date: new Date(2020, 1, 1), value: -1000 },
  { date: new Date(2020, 1, 2), value: 0 },
  { date: new Date(2020, 1, 3), value: 1000 },
];

const normalizedData: TimeSeriesDatum[] = [
  { date: new Date(2020, 1, 1), value: 0 },
  { date: new Date(2020, 1, 2), value: 0 },
  { date: new Date(2020, 1, 3), value: 1000 },
];

describe('normalizeTimeSeriesData', () => {
  it('normalizes data so that there are no negative values', () => {
    expect(normalizeTimeSeriesData(data)).toEqual(normalizedData);
  });
});
