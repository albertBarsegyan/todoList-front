import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { deleteRequest, getRequest, postRequest } from '../services/request.service';
import { Endpoints } from '../constants/endpoint.constants';
import { SliceStatuses } from '../constants/slice.constants';
import { IResponse, ResponseStatus } from '../interfaces/response.interfaces';
import { RootState } from '../interfaces/store.interfaces';

export interface IUser {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  isAdmin: number;
  lastName: string;
  username: string;
}

interface IUserState {
  data: IResponse<null | IUser> | null;
  status: SliceStatuses;
  error?: string;
  accessToken?: string | null;
}

const initialState: IUserState = {
  data: null,
  status: SliceStatuses.idle,
  error: '',
  accessToken: null,
};

export const userSliceName = (thunkName?: string) => {
  const sliceName = 'user';
  return thunkName ? `${sliceName}/${thunkName}` : sliceName;
};

export const getUserThunk = createAsyncThunk(userSliceName('me'), async () => {
  const response = await getRequest(Endpoints.user('me'), {});
  return response.data;
});

export const loginUserThunk = createAsyncThunk(userSliceName('login'), async (userData: any) => {
  const response = await postRequest(Endpoints.login(), userData);
  return response.data;
});

export const logoutUserThunk = createAsyncThunk(userSliceName('logout'), async () => {
  const response = await deleteRequest(Endpoints.logout());
  return response.data;
});

export const userSlice = createSlice({
  name: userSliceName(),
  initialState,
  reducers: {
    changeUser(state, action) {
      state.status = SliceStatuses.succeeded;
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserThunk.pending, state => {
        state.status = SliceStatuses.loading;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.status = SliceStatuses.succeeded;
        state.data = action.payload;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.status = SliceStatuses.failed;
        state.error = action.error.message;
      })
      .addCase(loginUserThunk.pending, state => {
        state.status = SliceStatuses.loading;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = SliceStatuses.succeeded;
        state.data = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = SliceStatuses.failed;
        state.error = action.error.message;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.status = SliceStatuses.succeeded;
        if (action.payload.status === ResponseStatus.Success) {
          state.data = null;
        }
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.status = SliceStatuses.failed;
        state.error = action.error.message;
      })
      .addCase(logoutUserThunk.pending, state => {
        state.status = SliceStatuses.loading;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { changeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
