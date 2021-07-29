interface NetContributionItem {
  date: string;
  netContributionsToDate: number;
}

interface CurrentPortfolioItem {
  date: string;
  currentPortfolioAmount: number;
}

interface TransactionDataItem {
  date: string;
  transactionAmount: number;
}

export interface ValidationError {
  property: string;
  message: string;
  code: string;
}

interface RequestPayload {
  netContributionData: NetContributionItem[];
  currentPortfolioData: CurrentPortfolioItem;
}

interface ResponsePayload {
  annualisedReturnValue: number;
  transactionData: TransactionDataItem[];
}

export type {
  RequestPayload,
  ResponsePayload,
  NetContributionItem,
  TransactionDataItem,
  CurrentPortfolioItem,
};
