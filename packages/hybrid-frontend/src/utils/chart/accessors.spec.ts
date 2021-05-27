import { timeSeriesDateAccessor, timeSeriesValueAccessor } from './accessors';
import { TimeSeriesDatum } from '../data';

const mockData: TimeSeriesDatum[] = [
  {
    date: new Date(2020, 0, 1),
    value: 10000,
  },
];

describe('timeSeriesDateAccessor', () => {
  it('works as expected', () => {
    expect(timeSeriesDateAccessor(mockData[0])).toEqual(mockData[0].date);
  });
});

describe('timeSeriesValueAccessor', () => {
  it('works as expected', () => {
    expect(timeSeriesValueAccessor(mockData[0])).toEqual(mockData[0].value);
  });
});
