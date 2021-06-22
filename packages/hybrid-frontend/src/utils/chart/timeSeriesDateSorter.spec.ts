import { TimeSeriesDatum } from '../data';
import {
  timeSeriesDateSorterAscending,
  timeSeriesDateSorterDescending,
} from './timeSeriesDateSorter';

const unsortedTimeSeriesData: TimeSeriesDatum[] = [
  { date: new Date(2020, 1, 1), value: 0 },
  { date: new Date(2022, 0, 1), value: 0 },
  { date: new Date(2020, 5, 1), value: 0 },
  { date: new Date(2019, 0, 1), value: 0 },
];

describe('timeSeriesDateSorterAscending', () => {
  it('works as expected', () => {
    const unsorted = [...unsortedTimeSeriesData];

    const sorted: TimeSeriesDatum[] = [
      { date: new Date(2019, 0, 1), value: 0 },
      { date: new Date(2020, 1, 1), value: 0 },
      { date: new Date(2020, 5, 1), value: 0 },
      { date: new Date(2022, 0, 1), value: 0 },
    ];

    expect(unsorted.sort(timeSeriesDateSorterAscending)).toEqual(sorted);
  });
});

describe('timeSeriesDateSorterDescending', () => {
  it('works as expected', () => {
    const unsorted = [...unsortedTimeSeriesData];

    const sorted: TimeSeriesDatum[] = [
      { date: new Date(2022, 0, 1), value: 0 },
      { date: new Date(2020, 5, 1), value: 0 },
      { date: new Date(2020, 1, 1), value: 0 },
      { date: new Date(2019, 0, 1), value: 0 },
    ];

    expect(unsorted.sort(timeSeriesDateSorterDescending)).toEqual(sorted);
  });
});
