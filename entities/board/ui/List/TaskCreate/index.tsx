'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { DotsMenuIcon } from '@/shared/icons/ui/DotsMenuIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { BoardColumn, Task } from '@/widgets/Board/types';
import { updateTask } from '@/shared/_api/board/tasks';

const TaskCreate = ({ column }: { column: BoardColumn }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-5">
      {column.tasks.map((task: Task) => (
        <div
          key={task.id}
          className="flex items-center rounded-sm border px-5 py-[18px]">
          <div className="flex grow items-center gap-4">
            <Checkbox
              checked={task.column === 'completed'}
              onCheckedChange={() => updateTask(task.id, task.column)}
            />
            <TypographyP
              key={task.id}
              text={task.text}
              className={`${task.column === 'completed' ? 'line-through' : 'no-underline'}`}
            />
          </div>
          <DropdownMenu
            open={openId === task.id}
            onOpenChange={(isOpen) => setOpenId(isOpen ? task.id : null)}>
            <DropdownMenuTrigger>
              <div className="flex cursor-pointer items-center gap-2 px-1 py-1 transition duration-500 hover:bg-[#F2F2F2] hover:text-current hover:shadow-none">
                <DotsMenuIcon size={iconSize(20)} className="cursor-pointer" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};

export default TaskCreate;
