import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { LoginFormFieldNames } from '../../constants/form.constants';
import { useAuth } from '../../hooks/useAuth';
import { loginFormSchema } from '../../schemas/login.schema';
import Button from '../buttons/button';
import { ForwardInput } from '../inputs/input';

import { usePopup } from '../../hooks/usePopup';

import { RoutePaths } from '../../constants/route.constants';

export default function LoginForm() {
  const { login, loading } = useAuth();
  const { providePopupSettings } = usePopup();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormSchema), mode: 'onChange' });

  const onSubmit = (data: FieldValues) => {
    login(data).then(popupData => {
      providePopupSettings(popupData);
      navigate(RoutePaths.home);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 p-5 shadow-md">
      <ForwardInput
        placeholder="Provide email or username"
        errorMessage={errors?.[LoginFormFieldNames.username]?.message}
        {...register(LoginFormFieldNames.username)}
      />

      <ForwardInput
        placeholder="Provide password"
        type="password"
        errorMessage={errors?.[LoginFormFieldNames?.password]?.message}
        {...register(LoginFormFieldNames.password)}
      />
      <div className="flex flex-row items-center justify-between w-full">
        <Button type="submit">{loading ? 'Loading...' : 'Login'}</Button>
      </div>
    </form>
  );
}
