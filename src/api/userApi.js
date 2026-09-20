import { ENDPOINTS } from '../constants/apiConstants';
import { request } from './apiClient';

export function getUserDetails() {
  return request({
    method: 'get',
    url: ENDPOINTS.USER,
  });
}
