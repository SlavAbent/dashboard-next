import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FolderSelect from '@/features/board-modal/ui/FolderSelect';
import { FormError } from '@/features/board-modal/ui/FormError';
import { TaskFormValues } from '@/features/board-modal/schema/task-schema';

export const SelectField = () => {
  const { control, formState } = useFormContext<TaskFormValues>();
  const { errors } = formState;
  return (
    <div className="flex flex-col gap-1">
      <Controller
        name="folderId"
        control={control}
        render={({ field }) => (
          <FolderSelect value={field.value} onChange={field.onChange} />
        )}
      />

      <FormError error={errors.folderId} />
    </div>
  );
};
