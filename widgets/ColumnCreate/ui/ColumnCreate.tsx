'use client';

import React, { useMemo } from 'react';
import { ArrowIcon } from '@/shared/icons/ui/ArrowIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { cn } from '@/shared/lib/cn';
import { TypographyH3 } from '@/shared/components/Typography/TypographyH3';
import { TypographyP } from '@/shared/components/Typography/TypographyP';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { ColumnCreateType } from '@/widgets/ColumnCreate/types/column-create';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { useBoardModalStore } from '@/features/board-modal';
import {
  countCompletedTasksInColumn,
  countIncompleteTasksInColumn,
  getColumnTasksLabel,
} from '@/entities/board/lib/count-column-tasks';
import { Ellipse } from '@/shared/components/Ellipse';

const ColumnCreate = ({ column, isOpen }: ColumnCreateType) => {
  const incompleteCount = useMemo(
    () => countIncompleteTasksInColumn(column),
    [column]
  );
  const completedCount = useMemo(
    () => countCompletedTasksInColumn(column),
    [column]
  );
  const columnText = getColumnTasksLabel(
    column.id,
    incompleteCount,
    completedCount
  );

  const toggleFolder = useBoardStore((state) => state.toggleColumn);
  const openCreateFolder = useBoardModalStore(
    (state) => state.openCreateFolder
  );

  return (
    <div className="mb-5 flex flex-col justify-start">
      <div
        className="mb-6 flex cursor-pointer items-center gap-2"
        onClick={() => toggleFolder(column.id)}>
        <div>
          <ArrowIcon
            size={iconSize(16)}
            className={cn(
              'h-4 w-4 cursor-pointer transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </div>
        <Ellipse size={8} color={column.color} />
        <div className="flex items-end gap-2">
          <TypographyH3 text={column.title} />
          <TypographyP
            text={columnText}
            className="text-neutral-80 !leading-[145%]"
          />
        </div>
      </div>
      <div
        onClick={() => openCreateFolder(column.id)}
        className="flex max-h-[40px] min-h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[rgba(114,114,114,0.2)]">
        <PlusIcon size={iconSize(16)} className="text-neutral-80" />
        <TypographySmall text="Create Folder" className="text-neutral-80" />
      </div>
    </div>
  );
};

export default ColumnCreate;
