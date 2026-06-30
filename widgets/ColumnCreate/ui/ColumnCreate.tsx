'use client';

import React from 'react';

import { getColumnTasksLabel } from '@/entities/board/lib/count-column-tasks';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import { useBoardModalStore } from '@/features/board-modal';
import { Ellipse } from '@/shared/components/Ellipse';
import { TypographyH3 } from '@/shared/components/Typography/TypographyH3';
import { TypographyP } from '@/shared/components/Typography/TypographyP';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { useCountHook } from '@/shared/hooks/useCountHook';
import { iconSize } from '@/shared/icons/iconSize';
import { ArrowIcon } from '@/shared/icons/ui/ArrowIcon';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { cn } from '@/shared/lib/cn';
import { ColumnCreateType } from '@/widgets/ColumnCreate/types/column-create';

const ColumnCreate = ({ column, isOpen }: ColumnCreateType) => {
  const { completed, incomplete } = useCountHook(column);
  const columnText = getColumnTasksLabel(column.id, incomplete, completed);

  const toggleFolder = useBoardStore((state) => state.toggleColumn);
  const openCreateFolder = useBoardModalStore(
    (state) => state.openCreateFolder
  );

  return (
    <div className="mb-5 flex flex-col justify-start">
      <div
        className="mb-6 flex cursor-pointer items-center gap-2"
        onClick={() => toggleFolder(column.id)}>
        <>
          <ArrowIcon
            size={iconSize(16)}
            className={cn(
              'h-4 w-4 cursor-pointer transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </>
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
        className="bg-secondary text-secondary-foreground flex max-h-[40px] min-h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-sm">
        <PlusIcon size={iconSize(16)} className="text-muted-foreground" />
        <TypographySmall
          text="Create Folder"
          className="text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default ColumnCreate;
