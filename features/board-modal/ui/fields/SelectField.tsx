import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorField } from '@/features/board-modal/ui/fields/ErrorField';
import { TaskFormValues } from '@/features/board-modal/schema/task-schema';
import { useBoardStore } from '@/entities/board';
import { sameId, toIdString } from '@/shared/lib/same-id';
import { AppSelect } from '@/shared/components/Select/app-select';

type SelectFieldProps = {
  className?: string;
};

export const SelectField = ({ className }: SelectFieldProps) => {
  const { control, formState } = useFormContext<TaskFormValues>();
  const { errors } = formState;

  const folders = useBoardStore((state) => state.taskFolders);
  const columns = useBoardStore((state) => state.columns);

  const options = useMemo(() => {
    return folders.map((folder) => ({
      value: toIdString(folder.id),
      label: `${folder.title} — ${
        columns.find((c) => sameId(c.id, folder.columnId))?.title ??
        folder.columnId
      }`,
    }));
  }, [folders, columns]);

  return (
    <div className="flex flex-col gap-1">
      <Controller
        name="folderId"
        control={control}
        render={({ field }) => {
          const value = field.value ? toIdString(field.value) : '';
          return (
            <AppSelect
              value={value}
              onChange={field.onChange}
              options={options}
              placeholder="Select folder"
              className={className}
            />
          );
        }}
      />

      <ErrorField error={errors.folderId} />
    </div>
  );
};
