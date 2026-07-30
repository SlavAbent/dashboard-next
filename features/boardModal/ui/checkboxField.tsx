import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TaskFormValues } from '@/features/boardModal/schema/taskSchema';
import { Checkbox } from '@/shared/components/checkbox/checkbox';
import { TypographySmall } from '@/shared/components/typography/typographySmall';

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
