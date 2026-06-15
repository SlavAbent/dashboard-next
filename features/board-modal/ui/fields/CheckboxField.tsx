import React from 'react';
import { Checkbox } from '@/shared/components/Checkbox/checkbox';
import { Controller, useFormContext } from 'react-hook-form';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { TaskFormValues } from '@/features/board-modal/schema/task-schema';

export const CheckboxField = () => {
  const { control } = useFormContext<TaskFormValues>();
  return (
    <Controller
      name="completed"
      control={control}
      render={({ field }) => (
        <label className="flex items-center gap-3">
          <Checkbox
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(Boolean(checked))}
          />

          <TypographySmall text="Completed" className="text-sm" />
        </label>
      )}
    />
  );
};
