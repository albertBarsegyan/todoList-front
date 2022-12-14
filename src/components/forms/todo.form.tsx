import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TodoFormFieldNames } from '../../constants/form.constants';
import Button from '../buttons/button';
import { ForwardInput } from '../inputs/input';
import { todoSchema } from '../../schemas/todo.schema';
import { useAppDispatch } from '../../hooks/store.hooks';
import { addTodoThunk } from '../../slices/todos.slice';
import { usePopup } from '../../hooks/usePopup';
import { RegularPopupVariants } from '../../constants/componentVariants.constants';
import { IAddTodoResponse, ITodoAddRequest } from '../../interfaces/todo.interfaces';
import { IResponse } from '../../interfaces/response.interfaces';

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const { providePopupSettings } = usePopup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITodoAddRequest>({ resolver: yupResolver(todoSchema) });

  const onSubmit: SubmitHandler<ITodoAddRequest> = data => {
    dispatch(addTodoThunk(data)).then(addResponse => {
      const payload = addResponse.payload as IResponse<IAddTodoResponse>;
      const popupVariant = payload.status === 'error' ? RegularPopupVariants.ERROR : RegularPopupVariants.SUCCESS;
      if (payload.status === 'success') {
        reset();

        providePopupSettings({ text: payload.message, popupVariant });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5 shadow-md">
      <ForwardInput
        placeholder="Username"
        type="text"
        errorMessage={errors?.[TodoFormFieldNames.username]?.message}
        {...register(TodoFormFieldNames.username)}
      />
      <ForwardInput
        placeholder="Email"
        errorMessage={errors?.[TodoFormFieldNames.email]?.message}
        {...register(TodoFormFieldNames.email)}
      />

      <ForwardInput
        placeholder="Todo"
        type="text"
        errorMessage={errors?.[TodoFormFieldNames.text]?.message}
        {...register(TodoFormFieldNames.text)}
      />
      <div className="flex flex-row items-center justify-between w-full">
        <Button type="submit"> Add todo</Button>
      </div>
    </form>
  );
}
