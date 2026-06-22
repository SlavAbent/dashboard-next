import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/Select/select';
import cn from 'clsx';
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
  const safeValue = options.some((o) => o.value === value) ? value : '';
  return (
    <Select
      value={safeValue}
      onValueChange={(v) => {
        if (v !== null) onChange(v);
      }}>
      <SelectTrigger className={cn('w-full', className)}>
        <SelectValue placeholder={placeholder} />
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
