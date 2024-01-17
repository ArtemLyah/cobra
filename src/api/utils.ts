import { AxiosRequestConfig } from 'axios';

export const useAuthorisation = (token: string): AxiosRequestConfig => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});