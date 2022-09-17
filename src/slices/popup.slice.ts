import { createSlice } from '@reduxjs/toolkit';

import { RegularPopupVariants } from '../constants/componentVariants.constants';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../interfaces/store.interfaces';

export interface IPopupState {
  isVisible: boolean;
  popupVariant: RegularPopupVariants;
  text: string;
  customStyle: string;
  timeOutToHide: number;
}

const initialState: IPopupState = {
  isVisible: false,
  popupVariant: RegularPopupVariants.PRIMARY,
  text: '',
  customStyle: '',
  timeOutToHide: 3,
};

export const popupSliceName = (thunkName?: string) => {
  const sliceName = 'popup';
  return thunkName ? `${sliceName}/${thunkName}` : sliceName;
};

export const popupSlice = createSlice({
  name: popupSliceName(),
  initialState,
  reducers: {
    hidePopup(state) {
      state.isVisible = false;
    },

    changePopupSettings(state, action) {
      return { ...state, ...action.payload, isVisible: true };
    },
  },
});

export const popupReducer = popupSlice.reducer;
export const { hidePopup, changePopupSettings } = popupSlice.actions;
export const selectPopup = (state: RootState) => state.popup;
