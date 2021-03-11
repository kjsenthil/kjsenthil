import ENDPOINTS from './endpoints';

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
  // the endpoint URL will include a {sedol} placeholder for the SEDOL
  const endpoint = ENDPOINTS['get-asset-details'].replace(/\{sedol\}/, sedol);
  const response = await fetch(endpoint);

  if (!response.ok) {
    return Promise.reject(new Error('Unable to fetch asset details'));
  }

  const resultData = await response.json();
  return resultData.Data;
};
