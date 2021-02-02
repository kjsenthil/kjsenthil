// TODO: move this to env file that can be shared with gatsby-node.js
const API_BASE_URL = 'https://digital-hybrid-mgmt.azure-api.net/digitalhybrid/Assets';

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

export const getAssetDetail = async (sedol: string): Promise<AssetData | undefined> => {
  const response = await fetch(`${API_BASE_URL}/assetdetail/${sedol}`);

  if (!response.ok) {
    return Promise.reject(new Error('Unable to fetch asset details'));
  }

  const resultData = await response.json();
  return resultData.Data;
};
