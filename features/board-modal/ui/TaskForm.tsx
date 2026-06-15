import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useTaskForm } from '@/features/board-modal/hooks/use-task-form';
import InputField from '@/features/board-modal/ui/fields/InputField';
import { SelectField } from '@/features/board-modal/ui/fields/SelectField';
import { CheckboxField } from '@/features/board-modal/ui/fields/CheckboxField';
import { SubmitButton } from '@/features/board-modal/ui/fields/SubmitButton';

export const TaskForm = () => {
  const { submit, form, isEditMode } = useTaskForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <InputField />
        <SelectField />

        {isEditMode && <CheckboxField />}

        <SubmitButton />
      </form>
    </FormProvider>
  );
};
