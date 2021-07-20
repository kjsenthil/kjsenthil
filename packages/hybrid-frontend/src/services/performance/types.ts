import { CommonState } from '../types';
import { TimeSeriesDatum } from '../../utils/data';
import { PerformanceDataPeriod } from './constants';

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
    PerformanceAccountsAggregatedResponse['data'],
    PerformanceAccountsAggregatedResponse['included']
  > {
  performanceDataPeriod: PerformanceDataPeriod;
}

export interface ProjectionsChartHistoricalDatum extends TimeSeriesDatum {
  netContributionsToDate: number;
  metadata?: Record<string, unknown>;
}

export type NetContributionValueWithDate = { date: string; netContributionsToDate: number };
export interface IncludedNetContributions {
  type: 'netcontribution-accounts-aggregated';
  id: string | null;
  attributes: {
    totalContributions: number;
    netContributions: Array<NetContributionValueWithDate>;
  };
  links: string | null;
  relationships: null;
}

export type PerformanceValueWithDate = { date: string; value: number };

export interface PerformanceAccountsAggregatedResponse {
  data: {
    type: 'performance-accounts-aggregated';
    id: string | null;
    attributes: {
      accountValue: number;
      performance: {
        value: number;
        percentage: number;
      };
      values: Array<PerformanceValueWithDate>;
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
  included: Array<IncludedNetContributions>;
}
