import axios from 'axios';

axios.defaults.adapter = require('axios/lib/adapters/http');

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';

interface PostParams {
  payload: string;
  base_url: string;
  api_endpoint: string;
}

interface GetParams {
  base_url: string;
  api_endpoint: string;
  query_params: Map<string, string>;
  token: string;
}

interface PatchParams {
  base_url: string;
  api_endpoint: string;
  token: string;
  payload: string;
}

export default class APIhelper {
  static async postWithoutAuth({ base_url, api_endpoint, payload }: PostParams) {
    const target = `${base_url}${api_endpoint}`;
    const response = await axios.post(target, payload);
    return response;
  }

  static async postWithAuth({
    base_url,
    api_endpoint,
    payload,
    token,
  }: PostParams & { token: string }) {
    const target = `${base_url}${api_endpoint}`;
    const response = await axios.post(target, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  static async get({ base_url, api_endpoint, token, query_params }: GetParams) {
    const target = `${base_url}${api_endpoint}`;
    const response = await axios.get(target, {
      headers: { Authorization: `Bearer ${token}` },
      params: query_params,
    });
    return response;
  }

  static async patch({ base_url, api_endpoint, token, payload }: PatchParams) {
    const target = `${base_url}${api_endpoint}`;
    const response = await axios.patch(target, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }
}
