// import axios, { AxiosInstance } from 'axios';

// export const axiosWithAuth = (includeAuthToken = true): AxiosInstance => {
//   const AUTH_TOKEN = includeAuthToken
//     ? localStorage.getItem('AUTH_TOKEN')
//     : null;

//   console.log('AUTH_TOKEN:', AUTH_TOKEN);

//   return axios.create({
//     baseURL: 'https://plants-be.onrender.com/api',
//     headers: {
//       Authorization: AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : '',
//     },
//   });
// };

// export default axiosWithAuth;

import axios from 'axios';

export const axiosWithAuth = () => {
  const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
  return axios.create({
    baseURL: 'https://plants-be.onrender.com/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH_TOKEN,
    },
  });
};
