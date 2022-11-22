import axios from 'axios';
import Config from 'react-native-config';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

console.log(Config.BASE_API_URL);
const api = axios.create({
  baseURL: Config.BASE_API_URL,
  headers: headers,
  timeout: 10000,
});

export default api;
