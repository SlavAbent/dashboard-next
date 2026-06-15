import React from 'react';
import { Input } from '@/shared/components/Input/input';
import { useFormContext } from 'react-hook-form';
import { TaskFormValues } from '@/features/board-modal/schema/task-schema';
import { FormError } from '@/features/board-modal/ui/FormError';

const InputField = () => {
  const { register, formState } = useFormContext<TaskFormValues>();
  const { isSubmitted, errors } = formState;

  return (
    <>
      <Input
        {...register('taskValue')}
        disabled={isSubmitted}
        placeholder="Task name"
        className="!w-full"
        classNameContainer="w-full"
      />

      <FormError error={errors.taskValue} />
    </>
  );
};

export default InputField;
