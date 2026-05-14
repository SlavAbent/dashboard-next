'use client';

import React from 'react';
import { ArrowIcon } from '@/shared/icons/ui/ArrowIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { cn } from '@/shared/lib/cn';
import Ellipse from '@/shared/ui/Ellipse/Ellipse';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { ColumnCreateType } from '@/widgets/ColumnCreate/types/column-create';
import { useBoardStore } from '@/entities/board/model/useDataStore';

const mockDataToAddTask = {
  id: 12,
  column: 'planning',
  tags: [],
  text: 'Random text',
  completed: false,
};

const ColumnCreate = ({ column, isOpen }: ColumnCreateType) => {
  const isCompletedColumn = column.id === 'completed';
  const columnText = `${column.tasks.length} ${isCompletedColumn ? 'completed' : 'open'} tasks`;

  const toggleFolder = useBoardStore((state) => state.toggleColumn);
  const addTask = useBoardStore((state) => state.addTask);

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
            text={columnText}
            className="text-neutral-80 !leading-[145%]"
          />
        </div>
      </div>
      <Button
        onClick={() => addTask(mockDataToAddTask)}
        size="lg"
        className="button !h-[40] cursor-pointer rounded-sm">
        <PlusIcon size={iconSize(16)} className="text-neutral-80" />
        <TypographySmall text="Create Task" className="text-neutral-80" />
      </Button>
    </div>
  );
};

export default ColumnCreate;
