export interface ITodoEditRequest {
  id: number;
  text?: string;
  statusId?: number;
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

export enum TodoSortOrders {
  Asc = 'asc',
  Desc = 'desc',
}

export enum TodoStatusVariants {
  inProgress = 0,
  done = 1,
}

export const enum TodoSortVariants {
  Username = 'username',
  Email = 'email',
  Status = 'status_id',
  CreatedAt = 'created_at',
}

export interface IAddTodoResponse {
  data: ITodo;
  allPages: number;
}

export interface ITodos extends IAddTodoResponse {
  page: number;
  sortOrder: TodoSortOrders;
  sortBy: TodoSortVariants;
}

export interface ITodoRequest {
  sortBy: any;
  sortOrder: TodoSortOrders;
  page: number;
}

export interface ITodoAddRequest {
  text: string;
  username: string;
  email: string;
}
