import React from 'react';
import { FormProvider } from 'react-hook-form';

import { useTaskForm } from '@/entities/board/hooks/tasks/useTaskForm';
import { CheckboxField } from '@/shared/components/fields/checkboxField';
import { InputField } from '@/shared/components/fields/inputField';
import { SelectField } from '@/shared/components/fields/selectField';
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
