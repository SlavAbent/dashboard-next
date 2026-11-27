'use client';

import { NativeSelect } from '@dashboard/ui';
import { ErrorField } from '@dashboard/ui/forms';
import { toIdString } from '@lib/sameId';
import React, { useId, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useBoardStore } from '@/entities/board';
import { FolderValues } from '@/features/boardModal/schema/folderSchema';

export const ColumnSelect = () => {
  const columnId = useId();
  const {
    control,
    formState: { errors },
  } = useFormContext<FolderValues>();
  const columns = useBoardStore((state) => state.columns);

  const options = useMemo(
    () =>
      columns.map((column) => ({
        value: toIdString(column.id),
        label: column.title,
      })),
    [columns]
  );

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={columnId} className="text-sm font-medium">
        Column
      </label>
      <Controller
        name="columnId"
        control={control}
        render={({ field }) => (
          <NativeSelect
            {...field}
            id={columnId}
            value={field.value ? toIdString(field.value) : ''}
            containerClassName="w-full"
            className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full cursor-pointer rounded-sm border px-3 pr-8 text-sm transition-colors outline-none focus-visible:ring-1">
            <option value="" disabled>
              Select column
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect>
        )}
      />

      <ErrorField error={errors.columnId} />
    </div>
  );
};
