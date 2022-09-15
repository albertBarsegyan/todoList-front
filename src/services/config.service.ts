import { getDataFromStorage } from '../helpers/storage.helpers'
import { localStorageKeys } from '../constants/localStorage.constants'

import axios from 'axios'

const isDevelopmentMode = process.env?.NODE_ENV === 'development'

axios.defaults.baseURL = isDevelopmentMode
  ? 'http://localhost:7000'
  : process.env?.REACT_APP_BASE_URL

axios.defaults.headers.common = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Cross-Origin-Resource-Policy': 'cross-origin'
}

axios.interceptors.request.use(config => {
  const token = String(getDataFromStorage(localStorageKeys.userToken))

  return {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
})

export default axios
