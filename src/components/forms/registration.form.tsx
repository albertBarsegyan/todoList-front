import { RegularPopupVariants } from '../../constants/componentVariants.constants'
import { Endpoints } from '../../constants/endpoint.constants'
import { RegisterFormFieldNames } from '../../constants/form.constants'
import { RoutePaths } from '../../constants/route.constants'
import { fileToBase64 } from '../../helpers/file.helpers'
import { usePopup } from '../../hooks/usePopup'
import { postRequest } from '../../services/request.service'
import { registerFormSchema } from '../../schemas/register.schema'
import Button from '../buttons/button'
import { ImageInput } from '../inputs/imageInput'
import { ForwardInput } from '../inputs/input'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import produce from 'immer'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'

export default function RegistrationForm () {
  const [loading, setLoading] = useState(false)
  const [isEmptyImage, setIsEmptyImage] = useState(false)
  const navigate = useNavigate()
  const { providePopupSettings } = usePopup()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(registerFormSchema), mode: 'onChange' })

  const onSubmit = async (data: any): Promise<void> => {
    setLoading(true)
    const profilePictureFile = data.profilePicture[0]

    const profilePictureBase64 = await fileToBase64(profilePictureFile)

    const sendData = await produce(data, (draft: any) => {
      draft.profilePicture = profilePictureBase64
    })

    const response = await postRequest(Endpoints.register(), sendData)

    const { message, status } = response.data

    const isSuccess = status === RegularPopupVariants.SUCCESS
    reset()
    setIsEmptyImage(true)
    setLoading(false)
    providePopupSettings({
      text: message,
      popupVariant: isSuccess
        ? RegularPopupVariants.SUCCESS
        : RegularPopupVariants.ERROR
    })

    if (isSuccess) navigate(RoutePaths.LOGIN)
  }

  useEffect(() => {
    if (!loading) {
      setIsEmptyImage(false)
    }
  }, [loading])

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 p-5 shadow-md">
      <ForwardInput
        placeholder="First Name"
        errorMessage={errors?.[RegisterFormFieldNames.firstName]?.message}
        {...register(RegisterFormFieldNames.firstName)}
      />

      <ForwardInput
        placeholder="Last name"
        errorMessage={errors?.[RegisterFormFieldNames?.lastName]?.message}
        {...register(RegisterFormFieldNames.lastName)}
      />

      <ForwardInput
        placeholder="Email"
        errorMessage={errors?.[RegisterFormFieldNames?.email]?.message}
        {...register(RegisterFormFieldNames.email)}
      />
      <ForwardInput
        placeholder="Password"
        type="password"
        errorMessage={errors?.[RegisterFormFieldNames.password]?.message}
        {...register(RegisterFormFieldNames.password)}
      />

      <ForwardInput
        placeholder="Repeat Password"
        type="password"
        errorMessage={
          errors?.[RegisterFormFieldNames.confirmPassword]?.message
        }
        {...register(RegisterFormFieldNames.confirmPassword)}
      />

      <ImageInput
        isEmptyImage={isEmptyImage}
        placeholder="Upload profile picture"
        {...register(RegisterFormFieldNames.profilePicture)}

        errorMessage={errors?.[RegisterFormFieldNames.profilePicture]?.message}
      />

      <div className="flex flex-row items-center justify-around w-full">

        <Button type="submit">{loading ? 'Loading...' : 'Register'}</Button>
        <div>
          <span className="mr-2 text-purple-400">Do you have account?</span>
          <Link
            to={RoutePaths.LOGIN}
            className="text-purple-500 underline decoration-1"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  )
}
