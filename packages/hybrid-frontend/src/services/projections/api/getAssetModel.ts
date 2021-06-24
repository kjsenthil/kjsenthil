import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { AssetModelResponse } from '../types';

const getAssetModel = async (riskModelName: string): Promise<AssetModelResponse> => {
  const path = API_ENDPOINTS.TILNEY_ASSET_MODEL.replace(/\{riskName\}/, riskModelName);

  const response = await api.get<AssetModelResponse>(path);

  return response.data;
};

export default getAssetModel;
