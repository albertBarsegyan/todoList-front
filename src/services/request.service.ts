import axios from './config.service';

export const postRequest = async (endpoint: string, data?: any, headers?: any) => {
  return axios.post(endpoint, data, {
    headers,
  });
};

export const getRequest = async (endpoint: string, headers?: any) => {
  return axios.get(endpoint, {
    headers,
  });
};

export const patchRequest = async (endpoint: string, data?: any, headers?: any) => {
  return axios.patch(endpoint, data, { headers });
};

export const deleteRequest = async (endpoint: string, data?: any, headers?: any) => {
  return axios.delete(endpoint, {
    data,
    headers,
  });
};
