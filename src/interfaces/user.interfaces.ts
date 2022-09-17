import { ITodo } from './todo.interfaces';

export interface IUser {
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_name: number;
  profile_picture: string;
  todos: ITodo[];
}
