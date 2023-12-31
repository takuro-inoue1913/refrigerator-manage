import axios from 'axios';
import { useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';

export const useApiClient = () => {
  const idToken = useRecoilValue(idTokenState);

  const apiClient = axios.create({
    baseURL: 'https://frimane.hasura.app/v1/graphql',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.request.use(
    (config) => {
      if (idToken) {
        config.headers['Authorization'] = `Bearer ${idToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
  return apiClient;
};
