import axios from 'axios';
import { API_BASE_URL, API_KEY, REQUEST_TIMEOUT_MS } from '../constants/apiConstants';

const inflightRequests = new Map();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});

apiClient.interceptors.request.use((config) => {
  if (API_KEY) {
    config.headers['x-api-key'] = API_KEY;
  }
  return config;
});

function getRequestKey(config) {
  return [
    (config.method || 'get').toLowerCase(),
    config.url,
    JSON.stringify(config.params || {}),
    JSON.stringify(config.data || {}),
  ].join(':');
}

export function request(config) {
  const key = getRequestKey(config);

  if (inflightRequests.has(key)) {
    return inflightRequests.get(key);
  }

  const promise = apiClient(config).finally(() => {
    inflightRequests.delete(key);
  });

  inflightRequests.set(key, promise);
  return promise;
}

export function getErrorMessage(error) {
  if (error?.code === 'ECONNABORTED') {
    return 'The request timed out. Please try again.';
  }

  if (!error?.response) {
    return 'Network error. Please check your internet connection.';
  }

  const status = error.response.status;
  const apiError = error.response.data?.error;

  if (status === 400) {
    if (apiError === 'user not found') {
      return 'Invalid credentials. Please check your email and password.';
    }
    if (apiError === 'Missing email or username') {
      return 'Email is required.';
    }
    if (apiError === 'Missing password') {
      return 'Password is required.';
    }
    if (
      typeof apiError === 'string' &&
      apiError.toLowerCase().includes('only defined users')
    ) {
      return 'Registration failed. Use the test email from the assignment.';
    }
    return apiError || 'Invalid request. Please check your details.';
  }

  if (status === 401) {
    return 'Unauthorized. Check your API key or credentials.';
  }

  return apiError || 'Something went wrong. Please try again.';
}

export default apiClient;
