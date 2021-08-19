import { RiskModel, SedolCode } from '@tsw/react-components';

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
