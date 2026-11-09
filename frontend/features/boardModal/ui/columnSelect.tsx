'use client';

import { ErrorField } from '@dashboard/ui/forms';
import { toIdString } from '@lib/sameId';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useBoardStore } from '@/entities/board';
import { FolderValues } from '@/features/boardModal/schema/folderSchema';

export const ColumnSelect = () => {
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
      <label htmlFor="board-column" className="text-sm font-medium">
        Column
      </label>
      <Controller
        name="columnId"
        control={control}
        render={({ field }) => (
          <div className="relative">
            <select
              {...field}
              id="board-column"
              value={field.value ? toIdString(field.value) : ''}
              className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full cursor-pointer appearance-none rounded-sm border px-3 pr-8 text-sm transition-colors outline-none focus-visible:ring-1">
              <option value="" disabled>
                Select column
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs">
              ▼
            </span>
          </div>
        )}
      />

      <ErrorField error={errors.columnId} />
    </div>
  );
};
