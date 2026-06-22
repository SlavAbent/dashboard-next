'use client';

import React from 'react';
import { TypographyH3 } from '@/shared/components/Typography/TypographyH3';
import { TypographyP } from '@/shared/components/Typography/TypographyP';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { ColumnHeaderType } from '@/features/ColumnHeader/types/column-header.types';
import { getColumnTasksLabel } from '@/entities/board/lib/count-column-tasks';
import { useBoardModalStore } from '@/features/board-modal';
import { Ellipse } from '@/shared/components/Ellipse';
import { useCountHook } from '@/shared/hooks/useCountHook';

const ColumnHeader = ({ column }: ColumnHeaderType) => {
  const openCreateFolder = useBoardModalStore(
    (state) => state.openCreateFolder
  );

  const { completed, incomplete } = useCountHook(column);

  const columnText = getColumnTasksLabel(column.id, incomplete, completed);

  return (
    <>
      <div className="mb-5 flex items-center gap-2">
        <Ellipse size={8} color={column.color} />
        <div className="flex items-end gap-2">
          <TypographyH3 text={column.title} />
          <TypographyP
            text={columnText}
            className="text-muted-foreground !leading-[145%]"
          />
        </div>
      </div>
      <div
        role="button"
        onClick={() => openCreateFolder(column.id)}
        className="bg-secondary text-secondary-foreground mb-4 flex max-h-[40px] min-h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-sm">
        <PlusIcon size={iconSize(16)} className="text-muted-foreground" />
        <TypographySmall
          text="Create Folder"
          className="text-muted-foreground"
        />
      </div>
    </>
  );
};

export default ColumnHeader;
