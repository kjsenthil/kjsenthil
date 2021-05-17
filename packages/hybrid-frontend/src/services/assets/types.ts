import { RiskModel, SedolCode } from '../types';

export interface AssetData {
  assetName: string;
  investmentCodeName: string;
  logoUrl: string;
  groupCode: string;
  sedolAcc: string;
  sedolInc: string;
  sedol: string;
  assetGroup: string;
  reinvestIncome: null;
  standardInitialCharge: number;
  unitType: 'Acc' | 'Inc';
  isaEligible: boolean;
  sippEligible: boolean;
  isValid: boolean;
  slug: string;
  sector: string;
  sectorCode: null;
  groupName: string;
}

export interface Fund {
  equityProportion: number;
  riskModel: RiskModel;
  sedol: SedolCode;
}

export interface AllAssets {
  allAsset: {
    nodes: Fund[];
  };
}
