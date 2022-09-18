import { FieldValues } from 'react-hook-form';
import { useEffect } from 'react';
import { localStorageKeys } from '../constants/localStorage.constants';
import { getDataFromStorage, removeDataFromStorage, saveDataToStorage } from '../helpers/storage.helpers';
import { RegularPopupVariants } from '../constants/componentVariants.constants';
import { useAppDispatch, useAppSelector } from './store.hooks';
import { changeUser, getUserThunk, loginUserThunk, logoutUserThunk, selectUser } from '../slices/user.slice';
import { SliceStatuses } from '../constants/slice.constants';
import { ResponseStatus } from '../interfaces/response.interfaces';

export function useAuth() {
  const { data: userData, status } = useAppSelector(selectUser);
  const { message } = userData ?? {};
  const dispatch = useAppDispatch();

  const tokenFromStorage = getDataFromStorage(localStorageKeys.userToken);

  const login = (loginData: FieldValues) => {
    return dispatch(loginUserThunk(loginData)).then(({ payload }) => {
      if (payload.accessToken) {
        saveDataToStorage(localStorageKeys.userToken, payload.accessToken);
      }

      return {
        text: payload.message,
        popupVariant:
          payload.status !== ResponseStatus.Error ? RegularPopupVariants.SUCCESS : RegularPopupVariants.ERROR,
      };
    });
  };

  const logout = async () => {
    const { payload } = await dispatch(logoutUserThunk());

    if (payload.status === ResponseStatus.Success) {
      removeDataFromStorage(localStorageKeys.userToken);
    }

    const isStatusSuccess = payload.status === ResponseStatus.Success;

    return {
      text: message,
      popupVariant: isStatusSuccess ? RegularPopupVariants.SUCCESS : RegularPopupVariants.ERROR,
    };
  };

  useEffect(() => {
    if (tokenFromStorage) {
      dispatch(getUserThunk());
    }
    if (!tokenFromStorage) {
      dispatch(changeUser(null));
    }
  }, [dispatch, tokenFromStorage]);

  return {
    user: userData,
    loading: status === SliceStatuses.loading,
    login,
    logout,
  };
}
