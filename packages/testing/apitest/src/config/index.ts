import { from } from 'env-var';
import dotenv from 'dotenv';
import { ApiEndpoints } from './types';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const env = from(process.env);

export const API_BASE_URL = env.get('API_BASE_URL').required().asUrlString();
export const CLIENT_ID = 'myaccount-spa';
export const MYACCOUNTS_PASSWORD = env.get('MYACCOUNTS_PASSWORD').required().asString();
export const MYACCOUNTS_USERNAME = env.get('MYACCOUNTS_USERNAME').required().asString();
export const API_ENDPOINTS = env.get('API_ENDPOINTS').required().asJsonObject() as Record<
  ApiEndpoints,
  string
>;
