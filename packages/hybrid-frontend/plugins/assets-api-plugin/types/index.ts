export enum AssetAllocationTypes {
  EQUITY = 'Equity',
  HIGH_YIELD_BONDS = 'High Yield Bonds',
  QUALITY_BONDS = 'Quality Bonds',
  PROPERTY = 'Property',
  COMMODITIES = 'Commodities',
  HEDGE = 'Hedge',
  FUND_CASH = 'Fund Cash',
}

export interface AssetAllocation {
  name: AssetAllocationTypes;
  proportion: number;
}

export interface AssetAllocationResponse {
  assetallocation: AssetAllocation[];
  toptenholdings: null;
  performance: {
    year1: number | null;
    year2: number | null;
    year3: number | null;
    year4: number | null;
    year5: number | null;
  };
}

export interface ContributionSetting {
  name: string;
  value: string;
}

export interface StandingDataItem {
  category: string;
  id: number;
  investmentCodeName: string;
  minimumInvestmentAmount: number;
  sedol: string;
  taamodel: string;
  unitType: string;
}

export interface GetStandingDataResponse {
  contributionsSettings: ContributionSetting[];
  tilneyStandingData: StandingDataItem[];
}
