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
    GetPerformanceAccountsAggregatedResponse['data'],
    GetPerformanceAccountsAggregatedResponse['included']
  > {
  performanceDataPeriod: string;
}

export interface ProjectionsChartHistoricalDatum extends TimeSeriesDatum {
  netContributionsToDate: number;
  metadata?: Record<string, unknown>;
}

export interface GetPerformanceAccountsAggregatedResponse {
  data: {
    type: 'performance-accounts-aggregated';
    id: string | null;
    attributes: {
      accountValue: number;
      performance: {
        value: number;
        percentage: number;
      };
      values: Array<{ date: string; value: number }>;
    };
    links: string | null;
    relationships: {
      'netcontribution-accounts-aggregated': {
        links: {
          related: string;
        };
        data: {
          type: 'netcontribution-accounts-aggregated';
          id: string | null;
        };
      };
    };
  };
  included: Array<{
    type: 'netcontribution-accounts-aggregated';
    id: string | null;
    attributes: {
      totalContributions: number;
      netContributions: Array<{ date: string; netContributionsToDate: number }>;
    };
    links: string | null;
    relationships: null;
  }>;
}
