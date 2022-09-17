import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Endpoints } from '../constants/endpoint.constants';
import { patchRequest, postRequest } from '../services/request.service';
import { SliceStatuses } from '../constants/slice.constants';

import { ITodo, ITodoEditRequest, ITodoRequest, TodoSortOrders } from '../interfaces/todo.interfaces';
import { editTodoList, TodoEditVariants } from '../helpers/todo.helpers';
import { IResponse } from '../interfaces/response.interfaces';
import { TodoSortVariants } from '../constants/todo.constants';
import { RootState } from '../interfaces/store.interfaces';

interface ITodosState {
  list: any[];
  status: SliceStatuses;
  page: number;
  allPages: number;
  sortBy: TodoSortVariants;
  sortOrder: TodoSortOrders;
  error?: string;
}

const initialState: ITodosState = {
  list: [],
  status: SliceStatuses.idle,
  sortOrder: TodoSortOrders.Asc,
  sortBy: TodoSortVariants.CreatedAt,
  allPages: 1,
  page: 0,
  error: '',
};

export const todoSliceName = (thunkName?: string) => {
  const sliceName = 'todo';
  return thunkName ? `${sliceName}/${thunkName}` : sliceName;
};

export const addTodoThunk = createAsyncThunk(todoSliceName('addTodo'), async (todoData: any) => {
  const response = await postRequest(Endpoints.todo(), todoData);
  return response.data;
});

export const editTodoThunk = createAsyncThunk(
  todoSliceName('editTodo'),
  async (dataToUpdate: ITodoEditRequest): Promise<IResponse<ITodo | null>> => {
    const response = await patchRequest(Endpoints.todo(), dataToUpdate as ITodoEditRequest);
    return response.data;
  },
);

export const getTodosThunk = createAsyncThunk(todoSliceName('all'), async (todoData?: Partial<ITodoRequest>) => {
  const response = await postRequest(Endpoints.todo('all'), todoData);
  return response.data;
});

export const todosSlice = createSlice({
  name: todoSliceName(),
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addTodoThunk.pending, state => {
        state.status = SliceStatuses.loading;
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.status = SliceStatuses.succeeded;
        state.list.push(data);
      })
      .addCase(addTodoThunk.rejected, (state, action) => {
        state.status = SliceStatuses.failed;
        state.error = action.error.message;
      })
      .addCase(getTodosThunk.pending, state => {
        state.status = SliceStatuses.loading;
      })
      .addCase(getTodosThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        const { list, page, allPages, sortBy, sortOrder } = data;
        state.status = SliceStatuses.succeeded;
        state.list = list;
        state.page = page;
        state.allPages = allPages;
        state.sortBy = sortBy;
        state.sortOrder = sortOrder;
      })
      .addCase(getTodosThunk.rejected, (state, action) => {
        state.status = SliceStatuses.failed;
        state.error = action.error.message;
      })
      .addCase(editTodoThunk.pending, state => {
        state.status = SliceStatuses.loading;
      })
      .addCase(editTodoThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.list = editTodoList({ todoList: state.list, editItem: data as ITodo }, TodoEditVariants.Change);
        state.status = SliceStatuses.succeeded;
      })
      .addCase(editTodoThunk.rejected, (state, action) => {
        state.status = SliceStatuses.failed;
        state.error = action.error.message;
      });
  },
});

export const todosReducer = todosSlice.reducer;

export const selectTodos = (state: RootState) => state.todos;
