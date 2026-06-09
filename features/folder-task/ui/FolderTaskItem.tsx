'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/shared/components/Checkbox/checkbox';
import { TypographyP } from '@/shared/components/Typography/TypographyP';
import { cn } from '@/shared/lib/cn';
import { useBoardStore } from '@/entities/board/model/use-data.store';
import type { Task } from '@/entities/board/model/types/list-types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/Dropdown/ui/dropdown-menu';
import { DotsMenuIcon } from '@/shared/icons/ui/DotsMenuIcon';
import { iconSize } from '@/shared/icons/iconSize';

type FolderTaskItemProps = {
  task: Task;
  onEdit: () => void;
};

const FolderTaskItem = ({ task, onEdit }: FolderTaskItemProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const toggleTask = useBoardStore((state) => state.toggleTask);
  const removeTask = useBoardStore((state) => state.removeTask);

  const handleOpenEdit = () => {
    onEdit();
    setOpenDropdown(false);
  };

  return (
    <div className="flex items-center gap-3 py-1">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => toggleTask(task.id)}
      />
      <button
        type="button"
        onClick={handleOpenEdit}
        className="min-w-0 flex-1 cursor-pointer text-left">
        <TypographyP
          text={task.text}
          className={cn(
            '!text-sm !leading-[145%]',
            task.completed && 'text-muted-foreground line-through'
          )}
        />
      </button>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger className="shrink-0">
          <div
            role="button"
            className="interactive-hover flex cursor-pointer items-center px-1 py-1">
            <DotsMenuIcon size={iconSize(16)} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleOpenEdit}>
              <TypographyP
                text="Edit"
                className="text-muted-foreground !text-sm !leading-[145%]"
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                removeTask(task.id);
                setOpenDropdown(false);
              }}>
              <TypographyP
                text="Delete"
                className="text-muted-foreground !text-sm !leading-[145%]"
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FolderTaskItem;
