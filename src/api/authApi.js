import { ENDPOINTS } from '../constants/apiConstants';
import { request } from './apiClient';

export function loginUser({ email, password }) {
  return request({
    method: 'post',
    url: ENDPOINTS.LOGIN,
    data: { email, password },
  });
}

export function registerUser({ email, password }) {
  return request({
    method: 'post',
    url: ENDPOINTS.REGISTER,
    data: { email, password },
  });
}
