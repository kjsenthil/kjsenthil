import { CommonState } from '../types';
import { TimeSeriesDatum } from '../../utils/data';

export interface GetPerformanceContactResponse {
  // All numbers have 2 decimal places
  data: {
    type: 'performance';
    id: string;
    attributes: {
      accountValue: number;
      performance: {
        value: number;
        percentage: number; // This is a float. 50% will be 50.00
      };
      values: Array<{ date: string; value: number }>;
    };
    links: {
      self: string;
    };
    relationships: {
      contributions: {
        links: {
          related: string;
        };
        data: {
          type: 'contributions';
          id: string;
        };
      };
    };
  };
  included: Array<{
    // All numbers have 3 decimal places
    type: 'contributions';
    id: string;
    attributes: {
      totalContributions: number;
      contributions: Array<{ date: string; netContributionsToDate: number }>;
    };
    links: {
      self: string;
    };
    relationships: null;
  }>;
}

export interface PerformanceState
  extends CommonState<
    GetPerformanceContactResponse['data'],
    GetPerformanceContactResponse['included']
  > {
  performanceDataPeriod: string;
}

export interface ProjectionsChartHistoricalDatum extends TimeSeriesDatum {
  netContributionsToDate: number;
  metadata?: Record<string, unknown>;
}
