/* eslint-disable import/prefer-default-export */
import { RiskModel, SedolCode } from '../../types';
import { AllAssets } from '../types';

export const mockAssets: AllAssets = {
  allAsset: {
    nodes: [
      {
        riskModel: RiskModel.TAA1,
        sedol: SedolCode.BYX8KL9,
        equityProportion: 20.46,
      },
      {
        riskModel: RiskModel.TAA3,
        sedol: SedolCode.BFY1N37,
        equityProportion: 50.3,
      },
      {
        riskModel: RiskModel.TAA4,
        sedol: SedolCode.BFY1NH1,
        equityProportion: 56.01,
      },
      {
        riskModel: RiskModel.TAA5,
        sedol: SedolCode.BYX8KR5,
        equityProportion: 67.36,
      },
      {
        riskModel: RiskModel.TAA6,
        sedol: SedolCode.BYX8KW0,
        equityProportion: 76.27,
      },
      {
        riskModel: RiskModel.TAA7,
        sedol: SedolCode.BFY1PL9,
        equityProportion: 91.3,
      },
      {
        riskModel: RiskModel.TAA3E,
        sedol: SedolCode.BYX8L38,
        equityProportion: 43.74,
      },
    ],
  },
};
