import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { AssetModelResponse } from '../types';

const getAssetModel = async (riskModelName: string): Promise<AssetModelResponse> => {
  try {
    const path = API_ENDPOINTS.TILNEY_ASSET_MODEL.replace(/\{riskName\}/, riskModelName);

    const response = await api.get<AssetModelResponse>(path);

    return response.data;
  } catch (error) {
    // Placeholder until tilneys model api has been deployed
    return {
      id: 0,
      riskModel: '',
      erValue: 0,
      volatility: 0,
      zScores: {
        MoreLikelyLB: 0,
        MoreLikelyUB: 0,
        LessLikelyLB: 0,
        LessLikelyUB: 0,
      },
    };
  }
};

export default getAssetModel;
