import { TimeSeriesDatum } from '../../utils/data';

export interface ProjectionsChartHistoricalDatum extends TimeSeriesDatum {
  netContributionsToDate: number;
  metadata?: Record<string, unknown>;
}
