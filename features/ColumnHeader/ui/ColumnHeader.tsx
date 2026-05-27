'use client';

import React from 'react';
import Ellipse from '@/shared/ui/Ellipse/Ellipse';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { ColumnHeaderType } from '@/features/ColumnHeader/types/column-header.types';
import {
  countCompletedTasksInColumn,
  countIncompleteTasksInColumn,
  getColumnTasksLabel,
} from '@/entities/board/lib/count-column-tasks';
import { useBoardModalStore } from '@/features/board-modal';

const ColumnHeader = ({ column }: ColumnHeaderType) => {
  const openCreateFolder = useBoardModalStore(
    (state) => state.openCreateFolder
  );

  const columnText = getColumnTasksLabel(
    column.id,
    countIncompleteTasksInColumn(column),
    countCompletedTasksInColumn(column)
  );

  return (
    <>
      <div className="mb-5 flex items-center gap-2">
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
        role="button"
        onClick={() => openCreateFolder(column.id)}
        className="mb-4 flex !h-[40] w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[rgba(114,114,114,0.2)]">
        <PlusIcon size={iconSize(16)} className="text-neutral-80" />
        <TypographySmall text="Create Folder" className="text-neutral-80" />
      </div>
    </>
  );
};

export default ColumnHeader;
