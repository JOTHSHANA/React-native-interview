export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'https://reqres.in';

export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const REQUEST_TIMEOUT_MS = 10000;

export const ENDPOINTS = {
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  USER: '/api/users/2',
  PRODUCTS: '/api/products',
};
