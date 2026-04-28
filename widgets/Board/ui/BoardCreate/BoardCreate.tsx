'use client';

import React, { useState } from 'react';
import { BoardColumn } from '@/widgets/Board/types';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import Ellipse from '@/shared/ui/Ellipse';
import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { Checkbox } from '@/components/ui/checkbox';
import { DotsMenuIcon } from '@/shared/icons/ui/DotsMenuIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ArrowIcon } from '@/shared/icons/ui/ArrowIcon';

const BoardCreate = ({ boardData }: { boardData: BoardColumn[] }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [closedFolders, setClosedFolders] = useState<Set<string>>(new Set());

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
    <>
      {boardData.map((column) => {
        const isOpen = !closedFolders.has(column.id);
        const isCompletedColumn = column.id === 'completed';
        const columnText = `${column.tasks.length} ${isCompletedColumn ? 'completed' : 'open'} tasks`;
        return (
          <div key={column.id} className="mb-8 flex flex-col">
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
                <TypographySmall
                  text="Create Task"
                  className="text-neutral-80"
                />
              </Button>
            </div>

            {isOpen && (
              <div className="flex flex-col gap-5">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center rounded-sm border px-5 py-[18px]">
                    <div className="flex grow items-center gap-4">
                      <Checkbox />
                      <TypographyP key={task.id} text={task.text} />
                    </div>
                    <DropdownMenu
                      open={openId === task.id}
                      onOpenChange={(isOpen) =>
                        setOpenId(isOpen ? task.id : null)
                      }>
                      <DropdownMenuTrigger>
                        <div className="flex cursor-pointer items-center gap-2 px-1 py-1 transition duration-500 hover:bg-[#F2F2F2] hover:text-current hover:shadow-none">
                          <DotsMenuIcon
                            size={iconSize(20)}
                            className="cursor-pointer"
                          />
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
            )}
          </div>
        );
      })}
    </>
  );
};

export default BoardCreate;
