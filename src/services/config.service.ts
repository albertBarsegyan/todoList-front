import axios from 'axios';
import { getDataFromStorage } from '../helpers/storage.helpers';
import { localStorageKeys } from '../constants/localStorage.constants';

const { NODE_ENV, REACT_APP_BASE_URL_PROD, REACT_APP_BASE_URL_DEV } = process.env;

const isDevelopmentMode = NODE_ENV === 'development';

axios.defaults.baseURL = isDevelopmentMode ? REACT_APP_BASE_URL_DEV : REACT_APP_BASE_URL_PROD;

axios.defaults.headers.common = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Cross-Origin-Resource-Policy': 'cross-origin',
};

axios.interceptors.request.use(config => {
  const token = getDataFromStorage(localStorageKeys.userToken);

  return {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
});

export default axios;
