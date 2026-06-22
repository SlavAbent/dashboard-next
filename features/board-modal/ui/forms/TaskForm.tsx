import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useTaskForm } from '@/features/board-modal/hooks/tasks/use-task-form';
import { InputField } from '@/features/board-modal/ui/fields/InputField';
import { SelectField } from '@/features/board-modal/ui/fields/SelectField';
import { CheckboxField } from '@/features/board-modal/ui/fields/CheckboxField';
import { SubmitButton } from '@/features/board-modal/ui/fields/SubmitButton';

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
