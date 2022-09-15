import { InputVariants } from '../../constants/componentVariants.constants'
import { forwardRef } from 'react'

const inputStyles =
  'border border-purple-400 placeholder:text-purple-300 text-purple-400 focus:border-green-500  outline-none block w-full px-2 py-1 sm:text-md rounded-sm focus:text-green-500 duration-75'

function RegularInput ({
  placeholder,
  value,
  onKeyDown,
  onChange
}: {
  placeholder?: string
  onKeyDown?: (e: any) => void
  onChange?: (e: any) => void
  value: string

}) {
  return <input
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    type='text'
    className={inputStyles}/>
}

export const ForwardInput = forwardRef<React.LegacyRef<HTMLInputElement>, any>(
  ({ errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col items-start justify-start max-w-4xl">
        <input {...props} className={inputStyles} ref={ref}/>
        <div>
          <span className="mt-1 ml-1 text-xs text-red-400 break-words">
            {errorMessage}
          </span>
        </div>
      </div>
    )
  }
)

ForwardInput.displayName = 'ForwardInput'

export default function Input ({
  variant = InputVariants.REGULAR,
  errorMessage = '',
  placeholder,
  value,
  onKeyDown,
  onChange
}: {
  variant: InputVariants
  errorMessage?: string
  placeholder?: string
  onKeyDown?: (e: any) => void
  onChange?: (e: any) => void
  value: string
}) {
  const renderInputVariants = (inputVariant: InputVariants) => {
    const inputElement = <RegularInput
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      placeholder={placeholder}/>

    switch (inputVariant) {
      case InputVariants.FIELD:
        return (

          <div className="flex flex-col items-center justify-start my-2">
            {inputElement}
            <div>
              <span className="text-sm text-red-600">{errorMessage}</span>
            </div>
          </div>
        )

      case InputVariants.REGULAR:
        return inputElement

      default:
        throw new Error('Choose input variant')
    }
  }

  return <>{renderInputVariants(variant)}</>
}
