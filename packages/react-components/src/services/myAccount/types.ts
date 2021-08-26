import { InvestmentAccountData } from '../types';
import { PerformanceDataPeriod } from '../performance';

export interface InvestmentAccountReturnAndPercentage {
  value: number;
  percent: number;
}

export type PeriodReturn = {
  [key in PerformanceDataPeriod]: InvestmentAccountReturnAndPercentage;
};

export interface InvestmentAccount extends InvestmentAccountData {
  accountType: string;
  accountNumber?: string;
  accountTotalNetContribution: number;
  periodReturn: PeriodReturn;
}
