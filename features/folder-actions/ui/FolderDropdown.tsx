'use client';

import React, { useState } from 'react';

import { useBoardStore } from '@/entities/board/model/use-data.store';
import { useBoardModalStore } from '@/features/board-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/Dropdown/ui/dropdown-menu';
import { TypographyP } from '@/shared/components/Typography/TypographyP';
import { iconSize } from '@/shared/icons/iconSize';
import { DotsMenuIcon } from '@/shared/icons/ui/DotsMenuIcon';
import type { EntityId } from '@/shared/lib/same-id';

type FolderDropdownProps = {
  folderId: EntityId;
  columnId: string;
};

const FolderDropdown = ({ folderId, columnId }: FolderDropdownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const removeFolder = useBoardStore((state) => state.removeFolder);
  const openEditFolder = useBoardModalStore((state) => state.openEditFolder);

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger>
        <div
          role="button"
          className="interactive-hover flex cursor-pointer items-center gap-2 px-1 py-1">
          <DotsMenuIcon size={iconSize(20)} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              openEditFolder(folderId, columnId);
              setOpenDropdown(false);
            }}>
            <TypographyP
              text="Edit"
              className="text-muted-foreground !leading-[145%]"
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              removeFolder(folderId);
              setOpenDropdown(false);
            }}>
            <TypographyP
              text="Delete"
              className="text-muted-foreground !leading-[145%]"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FolderDropdown;
