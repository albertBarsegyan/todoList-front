import { ITodo } from '../interfaces/todo.interfaces';

export enum TodoEditVariants {
  Change = 'Change',
  Delete = 'Delete',
}

export const editTodoList = (
  { todoList, editItem }: { todoList: ITodo[]; editItem: ITodo },
  updateVariant: TodoEditVariants,
) => {
  todoList.forEach((item, index, array) => {
    if (item.id === editItem.id) {
      switch (updateVariant) {
        case TodoEditVariants.Change:
          array[index] = editItem;
          break;
        case TodoEditVariants.Delete:
          array.splice(index, 1);
          break;
        default:
          return array;
      }
      return array;
    }
  });

  return todoList;
};

export const getLastThree = (todolist: ITodo[]) => {
  return todolist.length > 3 ? todolist.slice(todolist.length - 3) : todolist;
};
