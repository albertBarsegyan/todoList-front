import { ITodo } from '../interfaces/todo.interfaces';
import { TodoPaginationConstants } from '../constants/todo.constants';
import { ITodosState } from '../slices/todos.slice';

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

const checkIsLessThanLimit = (todoLength: number) => todoLength < TodoPaginationConstants.TodoShowLimit;

export const setTodosLimited = (state: ITodosState, newTodo: ITodo) => {
  const { firstPageData } = state;
  const result = [newTodo];

  const lastPartOfTodos = checkIsLessThanLimit(firstPageData.length)
    ? firstPageData
    : firstPageData.slice(0, TodoPaginationConstants.TodoShowLimit - 1);

  result.push(...lastPartOfTodos);
  state.list = result;

  if (checkIsLessThanLimit(state.list.length)) {
    state.firstPageData = result;
  }
};

export enum TodoPageConverterVariant {
  UnderLimit = 'UnderLimit',
  MoreLimit = 'MoreLimit',
}

export const convertTodosPages = (
  { currentPage, allPagesNumber }: { currentPage?: number; allPagesNumber: number },
  variant: TodoPageConverterVariant,
) => {
  const pagesData = [];
  let firstShowPage = 1;
  let lastShowPage = allPagesNumber;
  const indexThreshold = 1;

  switch (variant) {
    case TodoPageConverterVariant.MoreLimit: {
      if (currentPage) {
        firstShowPage =
          currentPage - TodoPaginationConstants.TodoShowLimit <= 1
            ? 1
            : currentPage - TodoPaginationConstants.TodoShowLimit + indexThreshold;
        lastShowPage =
          currentPage + TodoPaginationConstants.TodoShowLimit >= allPagesNumber
            ? allPagesNumber
            : currentPage + TodoPaginationConstants.TodoShowLimit + indexThreshold;
      }
      break;
    }
    case TodoPageConverterVariant.UnderLimit: {
      lastShowPage = allPagesNumber;
      break;
    }
    default:
      lastShowPage = allPagesNumber;
  }

  for (let i = firstShowPage; i <= lastShowPage; i += 1) {
    pagesData.push({ id: i, text: i });
  }

  return { pagesData, firstShowPage, lastShowPage };
};
