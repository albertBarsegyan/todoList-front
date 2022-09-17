import { useEffect } from 'react';

import { RegularPopupVariants } from '../constants/componentVariants.constants';
import { useAppDispatch, useAppSelector } from './store.hooks';
import { changePopupSettings, hidePopup, selectPopup } from '../slices/popup.slice';

export interface IPopupState {
  isVisible: boolean;
  popupVariant: RegularPopupVariants;
  text: string;
  customStyle: string;
  timeOutToHide: number;
}

export const usePopup = () => {
  const dispatch = useAppDispatch();
  const popupSettings = useAppSelector(selectPopup);
  const { isVisible, timeOutToHide } = popupSettings;

  useEffect(() => {
    let showTimeout: ReturnType<typeof setTimeout>;

    if (isVisible && timeOutToHide > 0) {
      showTimeout = setTimeout(() => {
        dispatch(hidePopup());
      }, timeOutToHide * 1000);
    }

    if (timeOutToHide > 0) {
      return () => {
        clearTimeout(showTimeout);
      };
    }
  }, [dispatch, isVisible, timeOutToHide]);

  const providePopupSettings = (settings: Partial<IPopupState>) => {
    dispatch(changePopupSettings(settings));
  };

  return { providePopupSettings, popupSettings };
};
