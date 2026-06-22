import React from 'react';
import { Input } from '@/shared/components/Input/input';
import { FieldPath, FieldValues, useFormContext, get } from 'react-hook-form';
import { ErrorField } from '@/features/board-modal/ui/fields/ErrorField';

type InputFieldProps<T extends FieldValues> = {
  value: FieldPath<T>;
  placeholder: string;
};

export function InputField<T extends FieldValues>({
  value,
  placeholder,
}: InputFieldProps<T>) {
  const { register, formState } = useFormContext<T>();
  const { isSubmitted, errors } = formState;

  const error = get(errors, value);

  return (
    <>
      <Input
        {...register(value)}
        disabled={isSubmitted}
        placeholder={placeholder}
        className="!w-full"
        classNameContainer="w-full"
      />

      <ErrorField error={error} />
    </>
  );
}
