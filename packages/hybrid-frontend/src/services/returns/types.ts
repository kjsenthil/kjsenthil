import { NetContributionValueWithDate } from '../performance';
import { CommonState } from '../types';

export interface PortfolioDataItem {
  date?: string;
  currentPortfolioAmount?: number;
}

export interface TransactionDataItem {
  date?: string;
  transactionAmount?: number;
}

export interface FirstPerformanceDataItem {
  date?: string;
  firstPerformanceAmount?: number;
}

export interface AnnualisedReturnsRequestPayload {
  firstPerformanceData: FirstPerformanceDataItem;
  netContributionData: NetContributionValueWithDate[] | undefined;
  currentPortfolioData: PortfolioDataItem;
}

export interface AnnualisedReturnSummaryState extends CommonState<AnnualisedReturnsResponse> {}

export interface AnnualisedReturnsResponse {
  annualisedReturnValue?: number;
  transactionData?: TransactionDataItem[];
}
