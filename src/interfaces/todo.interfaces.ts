import { TodoSortVariants } from '../constants/todo.constants';

export enum TodoStatusVariants {
  inProgress = 0,
  done = 1,
}

export enum TodoSortOrders {
  Asc = 'asc',
  Desc = 'desc',
}

export interface ITodo {
  id: number;
  createdAt: string;
  username: string;
  email: string;
  text: string;
  isEdited: number;
  statusId: number;
}

export interface ITodoRequest {
  sortBy: TodoSortVariants;
  sortOrder: TodoSortOrders;
  page: number;
}

export interface ITodoEditRequest {
  id: number;
  text?: string;
  statusId?: number;
}
