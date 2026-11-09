import { Checkbox } from '@dashboard/ui';
import { TypographySmall } from '@dashboard/ui';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TaskFormValues } from '@/features/boardModal/schema/taskSchema';

export const CheckboxField = () => {
  const { control } = useFormContext<TaskFormValues>();
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium">Status</span>
      <Controller
        name="completed"
        control={control}
        render={({ field }) => (
          <label className="border-input bg-background flex h-9 items-center gap-3 rounded-sm border px-3">
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(Boolean(checked))}
            />

            <TypographySmall text="Completed" className="text-sm" />
          </label>
        )}
      />
    </div>
  );
};
