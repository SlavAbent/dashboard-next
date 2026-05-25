'use client';

import React from 'react';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { cn } from '@/shared/lib/cn';

type ColumnSelectProps = {
  value: string;
  onChange: (columnId: string) => void;
  className?: string;
};

const ColumnSelect = ({ value, onChange, className }: ColumnSelectProps) => {
  const columns = useBoardStore((state) => state.columns);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'focus-visible:ring-ring/50 mb-4 w-full rounded-sm border border-[#AFAFAF] bg-transparent px-3 py-[7px] text-[14px] outline-none focus-visible:ring-1',
        className
      )}>
      {columns.map((column) => (
        <option key={column.id} value={column.id}>
          {column.title}
        </option>
      ))}
    </select>
  );
};

export default ColumnSelect;
