'use client';

import { Ellipse } from '@dashboard/ui';
import { TypographyH3 } from '@dashboard/ui';
import { TypographyP } from '@dashboard/ui';
import { TypographySmall } from '@dashboard/ui';
import { iconSize } from '@dashboard/ui';
import { PlusIcon } from '@dashboard/ui';
import React from 'react';

import { getColumnTasksLabel } from '@/entities/column';
import { useBoardModalStore } from '@/features/boardModal';
import { ColumnHeaderType } from '@/features/columnHeader/types/columnHeader.types';
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
