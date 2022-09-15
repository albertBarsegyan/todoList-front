import { LoginFormFieldNames } from '../../constants/form.constants'
import { RoutePaths } from '../../constants/route.constants'
import { useAuth } from '../../hooks/useAuth'
import { loginFormSchema } from '../../schemas/login.schema'
import Button from '../buttons/button'
import { ForwardInput } from '../inputs/input'

import { usePopup } from '../../hooks/usePopup'
import { Link } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export default function LoginForm () {
  const { login, loading } = useAuth()
  const { providePopupSettings } = usePopup()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginFormSchema), mode: 'onChange' })

  const onSubmit = async (data: FieldValues) => {
    const popupData = await login(data)
    providePopupSettings(popupData)
  }

  return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 p-5 shadow-md">
            <ForwardInput
                placeholder="Provide email"
                errorMessage={errors?.[LoginFormFieldNames.email]?.message}
                {...register(LoginFormFieldNames.email)}
            />

            <ForwardInput
                placeholder="Provide password"
                type="password"
                errorMessage={errors?.[LoginFormFieldNames?.password]?.message}
                {...register(LoginFormFieldNames.password)}
            />
            <div className="flex flex-row items-center justify-between w-full">
                <Button type="submit">{loading ? 'Loading...' : 'Login'}</Button>

                <div>
                    <span className="mr-2 text-purple-400">Do you want to</span>
                    <Link
                        to={RoutePaths.REGISTER}
                        className="text-purple-600 underline decoration-1"
                    >
                        Register?
                    </Link>
                </div>
            </div>
        </form>
  )
}
