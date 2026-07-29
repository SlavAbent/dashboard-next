import React from 'react';
import { FormProvider } from 'react-hook-form';

import { CheckboxField } from '@/shared/components/fields/checkboxField';
import { InputField } from '@/shared/components/fields/inputField';
import { SelectField } from '@/shared/components/fields/selectField';
import { SubmitButton } from '@/shared/components/fields/submitButton';
import { useTaskForm } from '@/shared/hooks/tasks/useTaskForm';

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
