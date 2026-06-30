import cn from 'clsx';
import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/Select/select';

type SelectOptions = {
  value: string;
  label: string;
};

type AppSelectProps = {
  value?: string;
  onChange: (value: string) => void;
  options: SelectOptions[];
  placeholder: string;
  className?: string;
};

export const AppSelect = ({
  value,
  onChange,
  className,
  options,
  placeholder,
}: AppSelectProps) => {
  const safeValue = options.some((o) => o.value === value) ? value : undefined;

  return (
    <Select
      value={safeValue ?? null}
      modal={false}
      onValueChange={(v) => {
        if (v != null) {
          onChange(v);
        }
      }}>
      <SelectTrigger className={cn('w-full', className)}>
        <SelectValue placeholder={placeholder}>
          {(selected) =>
            options.find((o) => o.value === selected)?.label ?? placeholder
          }
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
