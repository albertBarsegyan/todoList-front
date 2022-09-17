import { useEffect } from 'react';
import TodoRow from './todoRow';

import TodoForm from '../forms/todo.form';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { getTodosThunk, selectTodos } from '../../slices/todos.slice';
import { getTodosLimited } from '../../helpers/todo.helpers';

export default function TodoContainer() {
  const { list: todoList } = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodosThunk());
  }, []);

  return (
    <div className="w-full mt-10 mb-5">
      <div>
        <div className="w-1/2 mx-auto">
          <TodoForm />
        </div>

        <div className="mt-5">
          <div className="flex flex-col-reverse">
            {getTodosLimited(todoList).map((todo, index) => (
              <TodoRow data={todo} key={todo.id ?? index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
