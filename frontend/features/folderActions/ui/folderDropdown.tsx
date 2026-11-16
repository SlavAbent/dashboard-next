'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dashboard/ui';
import { TypographyP } from '@dashboard/ui';
import { iconSize } from '@dashboard/ui';
import { DotsMenuIcon } from '@dashboard/ui';
import type { EntityId } from '@lib/sameId';
import React, { useState } from 'react';

import { useBoardStore } from '@/entities/board/model/useData.store';
import { useBoardModalStore } from '@/features/boardModal';
import { notifications } from '@/shared/lib/notifications';

type FolderDropdownProps = {
  folderId: EntityId;
  columnId: string;
};

const FolderDropdown = ({ folderId, columnId }: FolderDropdownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const removeFolder = useBoardStore((state) => state.removeFolder);
  const openEditFolder = useBoardModalStore((state) => state.openEditFolder);

  const handleRemoveFolder = async () => {
    setOpenDropdown(false);

    try {
      await notifications.folder.run('delete', () => removeFolder(folderId));
    } catch {
      // The error notification is handled by the notification factory.
    }
  };

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger
        aria-label="Действия с карточкой"
        className="interactive-hover flex cursor-pointer items-center gap-2 px-1 py-1">
        <DotsMenuIcon size={iconSize(20)} />
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
          <DropdownMenuItem onClick={() => void handleRemoveFolder()}>
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
