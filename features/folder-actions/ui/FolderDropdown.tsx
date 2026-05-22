'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { DotsMenuIcon } from '@/shared/icons/ui/DotsMenuIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { useBoardStore } from '@/entities/board/model/useDataStore';
import { useBoardModalStore } from '@/features/board-modal';
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
          className="flex cursor-pointer items-center gap-2 px-1 py-1 transition duration-500 hover:bg-[#F2F2F2]">
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
              className="text-neutral-80 !leading-[145%]"
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              removeFolder(folderId);
              setOpenDropdown(false);
            }}>
            <TypographyP
              text="Delete"
              className="text-neutral-80 !leading-[145%]"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FolderDropdown;
