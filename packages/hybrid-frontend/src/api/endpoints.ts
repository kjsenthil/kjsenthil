import { API_ENDPOINTS, API_BASE_URL } from '../config';

// This is temperory
const ENDPOINTS = {
  'get-asset-details': `${API_BASE_URL}${API_ENDPOINTS.GET_ASSET_DETAILS}`,
  'post-projections': `${API_BASE_URL}${API_ENDPOINTS.POST_PROJECTIONS}`,
  'create-goal-less-fields': `${API_BASE_URL}${API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS}`,
  'link-goal-to-objective': `${API_BASE_URL}${API_ENDPOINTS.LINK_GOAL_TO_OBJECTIVE}`,
  'create-objective': `${API_BASE_URL}${API_ENDPOINTS.CREATE_OBJECTIVE}`,
};

export default { ...ENDPOINTS };
