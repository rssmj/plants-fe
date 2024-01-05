import axios, { AxiosInstance } from 'axios';

export const axiosWithAuth = (includeAuthToken = true): AxiosInstance => {
  const AUTH_TOKEN = includeAuthToken
    ? localStorage.getItem('AUTH_TOKEN')
    : null;

  return axios.create({
    baseURL: 'https://plants-be.onrender.com/api',
    headers: {
      Authorization: AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : '',
    },
  });
};

export default axiosWithAuth;
