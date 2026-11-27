'use client';

import { NativeSelect } from '@dashboard/ui';
import { ErrorField } from '@dashboard/ui/forms';
import { cn } from '@lib/cn';
import { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { TaskFormValues } from '@/features/boardModal/schema/taskSchema';
import {
  priorities,
  type Priority,
  priorityConfig,
} from '@/shared/model/schedule';

type FormValues = TaskFormValues & { priority: Priority };

export const PriorityField = () => {
  const priorityId = useId();
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={priorityId} className="text-sm font-medium">
        Priority
      </label>
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <div className="relative">
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute top-1/2 left-3 size-2 -translate-y-1/2 rounded-full',
                priorityConfig[field.value].dotClassName
              )}
            />
            <NativeSelect
              {...field}
              id={priorityId}
              containerClassName="w-full"
              className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full cursor-pointer appearance-none rounded-sm border pr-8 pl-8 text-sm transition-colors outline-none focus-visible:ring-1">
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priorityConfig[priority].label}
                </option>
              ))}
            </NativeSelect>
          </div>
        )}
      />
      <ErrorField error={errors.priority} />
    </div>
  );
};
