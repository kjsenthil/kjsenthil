import { TimeSeriesDatum } from '../../../../utils/data';

export interface PerformanceDatum extends TimeSeriesDatum {
  metadata?: Record<string, unknown>;
}

export interface ContributionDatum extends TimeSeriesDatum {
  metadata?: Record<string, unknown>;
}
