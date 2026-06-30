import React from 'react';
import { FormProvider } from 'react-hook-form';

import { CheckboxField } from '@/shared/components/fields/CheckboxField';
import { InputField } from '@/shared/components/fields/InputField';
import { SelectField } from '@/shared/components/fields/SelectField';
import { SubmitButton } from '@/shared/components/fields/SubmitButton';
import { useTaskForm } from '@/shared/hooks/tasks/use-task-form';

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
