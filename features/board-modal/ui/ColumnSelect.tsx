'use client';

import React from 'react';
import { useBoardStore } from '@/entities/board';
import { AppSelect } from '@/shared/components/Select/app-select';
import { toIdString } from '@/shared/lib/same-id';
import { Controller, useFormContext } from 'react-hook-form';
import { FolderValues } from '@/features/board-modal/schema/folder-schema';
import { ErrorField } from '@/features/board-modal/ui/fields/ErrorField';

type ColumnSelectProps = {
  className?: string;
};

export const ColumnSelect = ({ className }: ColumnSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FolderValues>();
  const columns = useBoardStore((state) => state.columns);

  const options = columns.map((column) => ({
    value: toIdString(column.id),
    label: column.title,
  }));

  return (
    <div className="flex flex-col gap-1">
      <Controller
        name="columnId"
        control={control}
        render={({ field }) => {
          const value = field.value ? toIdString(field.value) : '';
          return (
            <AppSelect
              value={value}
              onChange={field.onChange}
              options={options}
              placeholder="Select column"
              className={className}
            />
          );
        }}
      />

      <ErrorField error={errors.columnId} />
    </div>
  );
};
