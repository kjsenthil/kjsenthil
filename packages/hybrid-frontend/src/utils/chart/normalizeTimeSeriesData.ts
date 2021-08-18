import { TimeSeriesDatum } from '../data';

// Ensure there is no negative datum
export default function normalizeTimeSeriesData(data: TimeSeriesDatum[]): TimeSeriesDatum[] {
  return data.map((d) => ({
    ...d,
    value: Math.max(d.value, 0),
  }));
}
