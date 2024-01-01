import axios, { AxiosInstance } from 'axios';

export const axiosWithAuth = (includeAuthToken = true): AxiosInstance => {
  const token = includeAuthToken ? localStorage.getItem('token') : null;

  return axios.create({
    baseURL: 'https://plants-be.onrender.com/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};
