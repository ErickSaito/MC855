import axios from 'axios';
import { BASE_API_URL } from '@env';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: headers,
  timeout: 10000,
});

export default api;
