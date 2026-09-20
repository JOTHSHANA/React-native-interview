import { ENDPOINTS } from '../constants/apiConstants';
import { request } from './apiClient';

export function getProducts(page = 1) {
  return request({
    method: 'get',
    url: ENDPOINTS.PRODUCTS,
    params: { page },
  });
}
