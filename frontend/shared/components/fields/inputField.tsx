import {
  FieldError,
  FieldPath,
  FieldValues,
  get,
  useFormContext,
} from 'react-hook-form';

import { ErrorField } from '@/shared/components/fields/errorField';
import { Input } from '@/shared/components/input/input';

type InputFieldProps<T extends FieldValues> = {
  value: FieldPath<T>;
  placeholder: string;
  label?: string;
};

function isFieldError(error: unknown): error is FieldError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    typeof error.type === 'string'
  );
}

export function InputField<T extends FieldValues>({
  value,
  placeholder,
  label,
}: InputFieldProps<T>) {
  const { register, formState } = useFormContext<T>();
  const { isSubmitting, errors } = formState;

  const error = get(errors, value);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={String(value)} className="text-sm font-medium">
          {label}
        </label>
      )}
      <Input
        id={String(value)}
        {...register(value)}
        disabled={isSubmitting}
        placeholder={placeholder}
        className="bg-background h-9 w-full!"
        classNameContainer="w-full"
      />

      <ErrorField error={isFieldError(error) ? error : undefined} />
    </div>
  );
}
