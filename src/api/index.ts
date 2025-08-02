import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_BASE_URL;
const apiToken = import.meta.env.VITE_APP_TOKEN;

export const apiClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${apiToken}`,
    Accept: 'application/json',
  },
});
