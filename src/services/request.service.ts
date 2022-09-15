import axios from './config.service'

export const postRequest = async (endpoint: string, data?: any, headers?: any) => {
  return await axios.post(endpoint, data, {
    headers
  })
}

export const getRequest = async (endpoint: string, headers?: any) => {
  return await axios.get(endpoint, {
    headers
  })
}

export const patchRequest = async (endpoint: string, data?: any, headers?: any) => {
  return await axios.patch(endpoint, data, { headers })
}

export const deleteRequest = async (endpoint: string, data?: any, headers?: any) => {
  return await axios.delete(endpoint, {
    data,
    headers
  })
}
