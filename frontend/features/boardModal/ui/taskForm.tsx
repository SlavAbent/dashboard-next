import React from 'react';
import { FormProvider } from 'react-hook-form';

import { useTaskForm } from '@/features/boardModal/model/useTaskForm';
import { CheckboxField } from '@/features/boardModal/ui/checkboxField';
import { SelectField } from '@/features/boardModal/ui/selectField';
import { InputField } from '@/shared/components/fields/inputField';
import { SubmitButton } from '@/shared/components/fields/submitButton';

export const TaskForm = () => {
  const { submitTask, taskForm, isEditTaskMode } = useTaskForm();
  const {
    formState: { isSubmitting },
  } = taskForm;

  return (
    <FormProvider {...taskForm}>
      <form onSubmit={submitTask} className="flex flex-col gap-3">
        <InputField value="taskValue" placeholder="Task name" />
        <SelectField />

        {isEditTaskMode && <CheckboxField />}

        <SubmitButton isEditMode={isEditTaskMode} isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
};
