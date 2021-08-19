export interface InvestmentAccountData {
  id?: string;
  accountName: string;
  accountTotalHoldings: number;
  accountCash: number;
  accountReturn: number;
  accountReturnPercentage: number;
  equityPercentage?: number;
  cashPercentage?: number;
  monthlyInvestment?: number;
}

export enum RiskModel {
  TAA1 = 'TAA1',
  TAA3 = 'TAA3',
  TAA4 = 'TAA4',
  TAA5 = 'TAA5',
  TAA6 = 'TAA6',
  TAA7 = 'TAA7',
  TAA3E = 'TAA3E',
}

export enum SedolCode {
  BYX8KL9 = 'BYX8KL9',
  BFY1N37 = 'BFY1N37',
  BFY1NH1 = 'BFY1NH1',
  BYX8KR5 = 'BYX8KR5',
  BYX8KW0 = 'BYX8KW0',
  BFY1PL9 = 'BFY1PL9',
  BYX8L38 = 'BYX8L38',
}
