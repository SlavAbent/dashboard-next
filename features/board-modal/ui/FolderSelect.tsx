'use client';

import React from 'react';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { cn } from '@/shared/lib/cn';
import { toIdString, type EntityId } from '@/shared/lib/same-id';

type FolderSelectProps = {
  value: EntityId | '';
  onChange: (folderId: EntityId) => void;
  className?: string;
};

const FolderSelect = ({ value, onChange, className }: FolderSelectProps) => {
  const tasksFolder = useBoardStore((state) => state.tasksFolder);
  const columns = useBoardStore((state) => state.columns);

  return (
    <select
      value={toIdString(value)}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full rounded-sm border border-[#AFAFAF] bg-transparent px-3 py-[7px] text-[14px] outline-none focus-visible:ring-1 focus-visible:ring-ring/50',
        className
      )}>
      {tasksFolder.map((folder) => {
        const columnTitle =
          columns.find((column) => column.id === folder.columnId)?.title ??
          folder.columnId;

        return (
          <option key={toIdString(folder.id)} value={toIdString(folder.id)}>
            {folder.title} — {columnTitle}
          </option>
        );
      })}
    </select>
  );
};

export default FolderSelect;
