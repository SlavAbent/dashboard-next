'use client';

import React from 'react';
import { ArrowIcon } from '@/shared/icons/ui/ArrowIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { cn } from '@/shared/lib/cn';
import Ellipse from '@/shared/ui/Ellipse/Ellipse';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { ColumnCreateType } from '@/widgets/ColumnCreate/types/column-create';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { useModalStore } from '@/entities/modal/model/modal.store';

const ColumnCreate = ({ column, isOpen }: ColumnCreateType) => {
  const isCompletedColumn = column.id === 'completed';
  const columnText = `${column.folders.length} ${isCompletedColumn ? 'completed' : 'open'} tasks`;

  const toggleFolder = useBoardStore((state) => state.toggleColumn);
  const openModal = useModalStore((state) => state.openModal);

  const handleAddFolder = (id: string) => {
    openModal(id);
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
            text={columnText}
            className="text-neutral-80 !leading-[145%]"
          />
        </div>
      </div>
      <div
        onClick={() => handleAddFolder(column.id)}
        className="flex !h-[40] w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[rgba(114,114,114,0.2)]">
        <PlusIcon size={iconSize(16)} className="text-neutral-80" />
        <TypographySmall text="Create Folder" className="text-neutral-80" />
      </div>
    </div>
  );
};

export default ColumnCreate;
