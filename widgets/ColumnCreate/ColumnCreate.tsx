'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { ArrowIcon } from '@/shared/icons/ui/ArrowIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { cn } from '@/shared/lib/cn';
import Ellipse from '@/shared/ui/Ellipse/Ellipse';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import type { BoardColumn } from '@/entities/board/model/types';

type ColumnCreateType = {
  column: BoardColumn;
  isOpen: boolean;
  setClosedFolders: Dispatch<SetStateAction<Set<string>>>;
};

const ColumnCreate = ({
  column,
  isOpen,
  setClosedFolders,
}: ColumnCreateType) => {
  const isCompletedColumn = column.id === 'completed';
  const columnText = `${column.tasks.length} ${isCompletedColumn ? 'completed' : 'open'} tasks`;

  const toggleFolder = (columnId: string) => {
    setClosedFolders((prev) => {
      const next = new Set(prev);

      if (next.has(columnId)) {
        next.delete(columnId);
      } else {
        next.add(columnId);
      }

      return next;
    });
  };

  return (
    <div className="mb-5 flex flex-col justify-start">
      <div className="mb-6 flex items-center gap-2">
        <div onClick={() => toggleFolder(column.id)}>
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
            text={`${columnText}`}
            className={'text-neutral-80 !leading-[145%]'}
          />
        </div>
      </div>
      <Button
        disabled
        size="lg"
        className="button !h-[40] cursor-pointer rounded-sm">
        <PlusIcon size={iconSize(16)} className="text-neutral-80" />
        <TypographySmall text="Create Task" className="text-neutral-80" />
      </Button>
    </div>
  );
};

export default ColumnCreate;
