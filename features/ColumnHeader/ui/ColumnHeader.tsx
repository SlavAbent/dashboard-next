import React from 'react';
import Ellipse from '@/shared/ui/Ellipse/Ellipse';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { ColumnHeaderType } from '@/features/ColumnHeader/types/column-header.types';
import {
  countCompletedTasksInColumn,
  countIncompleteTasksInColumn,
  getColumnTasksLabel,
} from '@/entities/board/lib/count-column-tasks';

const ColumnHeader = ({ column }: ColumnHeaderType) => {
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
            text={`${columnText}`}
            className="text-neutral-80 !leading-[145%]"
          />
        </div>
      </div>
      <Button
        disabled
        size="lg"
        className="button mb-4 !h-[40] w-full cursor-pointer rounded-sm">
        <PlusIcon size={iconSize(16)} className="text-neutral-80" />
        <TypographySmall text="Create Task" className="text-neutral-80" />
      </Button>
    </>
  );
};

export default ColumnHeader;
