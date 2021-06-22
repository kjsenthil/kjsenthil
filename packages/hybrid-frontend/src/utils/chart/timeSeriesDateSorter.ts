import { TimeSeriesDatum } from '../data';

export function timeSeriesDateSorterAscending(d1: TimeSeriesDatum, d2: TimeSeriesDatum): number {
  return d1.date.getTime() - d2.date.getTime();
}

export function timeSeriesDateSorterDescending(d1: TimeSeriesDatum, d2: TimeSeriesDatum): number {
  return d2.date.getTime() - d1.date.getTime();
}
