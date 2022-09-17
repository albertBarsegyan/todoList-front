// eslint-disable-next-line import/no-cycle
import { TodoSortOrders } from '../interfaces/todo.interfaces';

export const TodoVariants = {
  inProgress: 'In progress',
  done: 'Done',
};

export const enum TodoSortVariants {
  Username = 'username',
  Email = 'email',
  Status = 'status_id',
  CreatedAt = 'created_at',
}

export const TodoStatuses = [
  { id: 0, text: 'In progress' },
  { id: 1, text: 'Done' },
];

export const TodoSortVariantOptions = [
  {
    id: 0,
    nameId: TodoSortVariants.Email,
    title: 'Email',
  },
  {
    id: 1,
    nameId: TodoSortVariants.Status,
    title: 'Status',
  },
  {
    id: 2,
    nameId: TodoSortVariants.Username,
    title: 'Username',
  },
  {
    id: 4,
    nameId: TodoSortVariants.CreatedAt,
    title: 'Created',
  },
];

export const TodoSortOrderOptions = [
  {
    id: 0,
    nameId: TodoSortOrders.Asc,
    title: 'Asc',
  },

  {
    id: 1,
    nameId: TodoSortOrders.Desc,
    title: 'Desc',
  },
];
