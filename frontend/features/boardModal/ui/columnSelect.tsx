'use client';

import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useBoardStore } from '@/entities/board';
import { FolderValues } from '@/features/boardModal/schema/folderSchema';
import { ErrorField } from '@/shared/components/fields/errorField';
import { AppSelect } from '@/shared/components/select/appSelect';
import { toIdString } from '@/shared/lib/sameId';

type ColumnSelectProps = {
  className?: string;
};

export const ColumnSelect = ({ className }: ColumnSelectProps) => {
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
