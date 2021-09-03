import { InvestmentAccountData } from '../types';
import { PerformanceDataPeriod } from '../performance';

export interface InvestmentAccountReturnAndPercentage {
  value: number;
  percent: number;
}

export interface InvestmentAccountLifetimeReturnAndPercentage {
  value: number;
  percentage: number;
}

export type PeriodReturn = {
  [key in PerformanceDataPeriod]: InvestmentAccountReturnAndPercentage;
};

export interface InvestmentAccount extends InvestmentAccountData {
  accountType: string;
  accountNumber?: string;
  accountTotalNetContribution: number;
  accountLifetimeReturn?: InvestmentAccountLifetimeReturnAndPercentage;
  periodReturn: PeriodReturn;
}
