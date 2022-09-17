import { forwardRef } from 'react';
import { InputVariants } from '../../constants/componentVariants.constants';

function RegularInput({
  placeholder,
  value,
  onKeyDown,
  onChange,
}: {
  placeholder?: string;
  onKeyDown?: (e: any) => void;
  onChange?: (e: any) => void;
  value: string;
}) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type="text"
      className="custom-input"
    />
  );
}

RegularInput.defaultProps = {
  placeholder: '',
  onKeyDown: () => {},
  onChange: () => {},
};

export const ForwardInput = forwardRef<React.LegacyRef<HTMLInputElement>, any>(({ errorMessage, ...props }, ref) => {
  return (
    <div className="flex flex-col items-start justify-start max-w-4xl">
      <input {...props} className="custom-input" ref={ref} />
      <div>
        <span className="mt-1 ml-1 text-xs text-red-400 break-words">{errorMessage}</span>
      </div>
    </div>
  );
});

ForwardInput.displayName = 'ForwardInput';

export default function Input({
  variant = InputVariants.REGULAR,
  errorMessage = '',
  placeholder,
  value,
  onKeyDown,
  onChange,
}: {
  variant: InputVariants;
  errorMessage?: string;
  placeholder?: string;
  onKeyDown?: (e: any) => void;
  onChange?: (e: any) => void;
  value: string;
}) {
  const renderInputVariants = (inputVariant: InputVariants) => {
    const inputElement = (
      <RegularInput onChange={onChange} onKeyDown={onKeyDown} value={value} placeholder={placeholder} />
    );

    switch (inputVariant) {
      case InputVariants.FIELD:
        return (
          <div className="flex flex-col items-center justify-start my-2">
            {inputElement}
            <div>
              <span className="text-sm text-red-600">{errorMessage}</span>
            </div>
          </div>
        );

      case InputVariants.REGULAR:
        return inputElement;

      default:
        throw new Error('Choose input variant');
    }
  };

  return <>{renderInputVariants(variant)}</>;
}

Input.defaultProps = {
  placeholder: '',
  errorMessage: '',
  onKeyDown: () => {},
  onChange: () => {},
};
