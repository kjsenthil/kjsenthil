import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { CurrentGoals } from '../types';

function getGetGoalsFieldsQueryParams(fields: string[]) {
  return fields.map((fieldName, i) => `fields.${i}=${fieldName}`).join('&');
}

const getGoals = async () => {
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
    'objective_frequency_start_age',
    'objective_frequency_end_age',
    'target_date',
    'regular_drawdown',
  ]);

  const url = `${baseUrl}?${fieldsQueryParams}`;
  const response = await api.get<CurrentGoals>(url);

  return response.data;
};

export default getGoals;
