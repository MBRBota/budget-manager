import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'http://localhost:3500',
  withCredentials: true,
});

export const resourceApi = axios.create({
  baseURL: 'http://localhost:3500',
});
