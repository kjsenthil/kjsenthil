import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GetCurrentGoals } from '../types';

function getGetGoalsFieldsQueryParams(fields: string[]) {
  return fields.map((fieldName, i) => `fields.${i}=${fieldName}`).join('&');
}

export default async function getGoalsFetcher() {
  const baseUrl = API_ENDPOINTS.GET_GOALS;

  // NOTE: the intention is to keep these fields static. If these are changed or
  // if we want to move to a more dynamic fields fetcher thing, then the
  // response type should be updated too.
  const fieldsQueryParams = getGetGoalsFieldsQueryParams([
    'description',
    'category',
    'status',
    'present_value',
    'target_amount',
  ]);
  const url = `${baseUrl}?${fieldsQueryParams}`;

  const response = await api.get<GetCurrentGoals>(url);

  return response.data;
}
