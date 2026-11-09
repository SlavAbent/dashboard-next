import { AppSelect } from '@dashboard/ui';
import { ErrorField } from '@dashboard/ui/forms';
import { cn } from '@lib/cn';
import { sameId, toIdString } from '@lib/sameId';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useBoardStore } from '@/entities/board';
import { TaskFormValues } from '@/features/boardModal/schema/taskSchema';

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
      <label className="text-sm font-medium">Folder</label>
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
              ariaLabel="Folder"
              className={cn(
                'bg-background h-9 rounded-sm px-3 text-sm',
                className
              )}
            />
          );
        }}
      />

      <ErrorField error={errors.folderId} />
    </div>
  );
};
