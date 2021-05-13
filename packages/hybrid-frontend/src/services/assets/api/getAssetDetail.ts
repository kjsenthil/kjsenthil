import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { AssetData } from '../types';

const getAssetDetail = async (sedol: string): Promise<AssetData | undefined> => {
  // the endpoint URL will include a {sedol} placeholder for the SEDOL
  const endpoint = API_ENDPOINTS.GET_ASSET_DETAILS.replace(/\{sedol\}/, sedol);
  return api.get(endpoint);
};

export default getAssetDetail;
