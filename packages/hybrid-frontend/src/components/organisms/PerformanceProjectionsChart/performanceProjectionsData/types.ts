import { TimeSeriesDatum } from '../../../../utils/data';

// TODO: move this out of here when the historical datum API is merged in
export interface ProjectionsChartAnnualHistoricalDatum extends TimeSeriesDatum {
  metadata?: Record<string, unknown>;
}
