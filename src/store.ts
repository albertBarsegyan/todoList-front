import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user.slice';
// eslint-disable-next-line import/no-cycle
import { todosReducer } from './slices/todos.slice';
import { popupReducer } from './slices/popup.slice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
    popup: popupReducer,
  },
});
