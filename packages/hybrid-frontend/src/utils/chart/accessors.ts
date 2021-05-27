import { TimeSeriesDatum } from '../data';

export function timeSeriesDateAccessor(d: TimeSeriesDatum) {
  return d.date;
}

export function timeSeriesValueAccessor(d: TimeSeriesDatum) {
  return d.value;
}
