import { IOption, Select } from '../select/select';
import { TodoSortOrderOptions, TodoSortVariantOptions, TodoSortVariants } from '../../constants/todo.constants';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { getTodosThunk, selectTodos } from '../../slices/todos.slice';
import { TodoSortOrders } from '../../interfaces/todo.interfaces';

export const TodoSort = () => {
  const dispatch = useAppDispatch();
  const { sortBy, sortOrder } = useAppSelector(selectTodos);
  const handleSortVariant = (sortVariantData: IOption<TodoSortVariants>) => {
    dispatch(getTodosThunk({ sortBy: sortVariantData.nameId, sortOrder }));
  };

  const handleSortOrder = (sortOrderData: IOption<TodoSortOrders>) => {
    dispatch(getTodosThunk({ sortBy, sortOrder: sortOrderData.nameId }));
  };

  return (
    <div className="w-1/2 flex flex-row items-center justify-around mt-8">
      <div className="w-1/3">
        <div>
          <p className="text-gray-700">Sort by</p>
        </div>
        <Select<TodoSortVariants>
          optionsList={TodoSortVariantOptions}
          handleSelect={handleSortVariant}
          defaultItem={TodoSortVariantOptions[1]}
        />
      </div>

      <div className="w-1/3">
        <div>
          <p className="text-gray-700">Sort order</p>
        </div>

        <Select<TodoSortOrders>
          optionsList={TodoSortOrderOptions}
          handleSelect={handleSortOrder}
          defaultItem={TodoSortOrderOptions[0]}
        />
      </div>
    </div>
  );
};
