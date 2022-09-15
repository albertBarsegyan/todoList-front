import { Endpoints } from '../constants/endpoint.constants'
import { RoutePaths } from '../constants/route.constants'

import { IUser } from '../interfaces/user.interfaces'
import {
  deleteRequest,
  getRequest,
  postRequest
} from '../services/request.service'
import { localStorageKeys } from '../constants/localStorage.constants'
import {
  getDataFromStorage,
  removeDataFromStorage,
  saveDataToStorage
} from '../helpers/storage.helpers'

import { RegularPopupVariants } from '../constants/componentVariants.constants'
import { useNavigate } from 'react-router-dom'
import { FieldValues } from 'react-hook-form'
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState
} from 'react'

interface IAuthContext {
  user: null | IUser
  login: (userData: FieldValues) => Promise<any>
  logout: () => void
  loading: boolean
}

export const authContext = createContext<IAuthContext>({
  user: null,
  loading: false,
  login: async () => {
  },
  logout: () => {
  }
})

export const useAuth = () => {
  return useContext(authContext)
}

function useAuthProvider () {
  const [user, setUser] = useState<null | IUser>(null)
  const [loading, setLoading] = useState(false)

  const tokenFromStorage = getDataFromStorage(localStorageKeys.userToken)

  const navigate = useNavigate()

  const login = async (userData: FieldValues) => {
    setLoading(true)
    const response = await postRequest(Endpoints.login(), userData)
    const { accessToken, data, message, status } = response.data

    const isStatusSuccess = status === 'success'

    if (accessToken) {
      setUser(data)
      saveDataToStorage(localStorageKeys.userToken, accessToken)
    }
    setLoading(false)

    return {
      text: message,
      popupVariant: isStatusSuccess
        ? RegularPopupVariants.SUCCESS
        : RegularPopupVariants.ERROR
    }
  }

  const logout = async () => {
    const { status, message } = await (await deleteRequest(Endpoints.logout()))
      .data

    const isStatusSuccess = status === 'success'

    removeDataFromStorage(localStorageKeys.userToken)
    setUser(null)

    return {
      text: message,
      popupVariant: isStatusSuccess
        ? RegularPopupVariants.SUCCESS
        : RegularPopupVariants.ERROR
    }
  }

  useEffect(() => {
    if (tokenFromStorage) {
      setLoading(true)
      getRequest(Endpoints.user('me')).then(response => {
        const { data: userData } = response.data

        setUser(userData)
        setLoading(false)
      })
    }
  }, [])

  useEffect(() => {
    if (user != null) {
      navigate(RoutePaths.HOME)
      setLoading(false)
    }
  }, [user])

  return {
    user,
    loading,
    login,
    logout
  }
}

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const authData = useAuthProvider()

  return (
    <authContext.Provider value={authData}>{children}</authContext.Provider>
  )
}
