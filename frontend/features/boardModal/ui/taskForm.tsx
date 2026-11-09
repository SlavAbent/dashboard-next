import { InputField, SubmitButton } from '@dashboard/ui/forms';
import React from 'react';
import { FormProvider } from 'react-hook-form';

import { useTaskForm } from '@/features/boardModal/model/useTaskForm';
import { CheckboxField } from '@/features/boardModal/ui/checkboxField';
import { DateRangeField } from '@/features/boardModal/ui/dateRangeField';
import { PriorityField } from '@/features/boardModal/ui/priorityField';
import { SelectField } from '@/features/boardModal/ui/selectField';

export const TaskForm = () => {
  const { submitTask, taskForm, isEditTaskMode } = useTaskForm();
  const {
    formState: { isSubmitting },
  } = taskForm;

  return (
    <FormProvider {...taskForm}>
      <form onSubmit={submitTask} className="flex flex-col gap-3">
        <InputField
          value="taskValue"
          label="Task name"
          placeholder="Enter task name"
        />
        <SelectField />
        <DateRangeField />
        <PriorityField />

        {isEditTaskMode && <CheckboxField />}

        <SubmitButton isEditMode={isEditTaskMode} isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
};
