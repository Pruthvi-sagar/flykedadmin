import axios from 'axios';
import { retrieveLocalStorage } from './storageServices';

const axiosInstance = axios.create({
  // baseURL: 'https://1e00b2olq2.execute-api.ap-south-1.amazonaws.com',
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await retrieveLocalStorage('token');
  const requestConfig = config;
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await localStorage.removeItem('userData');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
