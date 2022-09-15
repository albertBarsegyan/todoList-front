import Button from '../buttons/button'
import { forwardRef, useEffect, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

interface IFileInputProps {
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  labelText?: string
  isEmptyImage?: boolean
  errorMessage: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined

}

export const ImageInput = forwardRef(
  (
    {
      onChange,
      placeholder,
      labelText,
      errorMessage,
      isEmptyImage,
      ...props
    }: IFileInputProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const [imageUrl, setImageUrl] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const uploadedFile = e?.target?.files?.[0]
      const KB_TO_MB = 1_048_576

      if (uploadedFile != null) {
        const fileSizeInMb = Number((uploadedFile?.size / KB_TO_MB).toFixed(2))

        if (fileSizeInMb > 1) {
          onChange(e)
          return
        }

        setImageUrl(URL.createObjectURL(uploadedFile))
        onChange(e)
      }
    }

    const removeImage = () => {
      setImageUrl('')
    }

    useEffect(() => {
      if (isEmptyImage) {
        setImageUrl('')
      }
    }, [isEmptyImage])

    return (
      <div className="flex justify-center my-8">
        <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
          <div className="m-4">
            {labelText
              ? (
                <label className="inline-block mb-2 text-gray-500">
                  {labelText}
                </label>
                )
              : null}
            <div className="flex items-center justify-center w-full">
              {imageUrl !== ''
                ? (
                  <div>
                    <div>
                      <img src={imageUrl} alt="uploaded"/>
                    </div>
                    <div className="flex justify-center mt-4">
                      <Button onClick={removeImage}>Remove image</Button>
                    </div>

                  </div>
                  )
                : (
                  <label
                    className="flex flex-col w-full h-32 duration-75 border-4 border-purple-400 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        {placeholder}
                      </p>
                    </div>
                    <>
                      <div>
                        <input
                          type="file"
                          accept="image/x-png,image/gif,image/jpeg,image/jpg"
                          ref={ref}
                          onChange={handleChange}
                          className="opacity-0"
                          {...props}
                        />
                      </div>
                      <div className="py-2 text-center">
                      <span className="text-sm text-red-400">
                        {errorMessage}
                      </span>
                      </div>
                    </>
                  </label>
                  )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

ImageInput.displayName = 'ImageInput'
